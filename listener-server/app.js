// Configure environment variables.
require('dotenv').config();

// Imports.
const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const fs = require('fs-extra');

// Application setup.
const app = express();
app.use(express.static('static'));
app.set('view engine', 'ejs');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Parsing out environment variables.
const APPLICATION = process.env.APPLICATION;
const PORT = process.env.PORT;
const SECRET = process.env.SECRET;

// A middleware for validating webhooks from GitHub.
const sigHeaderName = 'X-Hub-Signature';
const verifyPostData = function (req, res, next) {
  const payload = JSON.stringify(req.body);
  if (!payload) {
    return next('Request body empty');
  }
  const sig = req.get(sigHeaderName) || '';
  const hmac = crypto.createHmac('sha1', SECRET);
  const digest = Buffer.from('sha1=' + hmac.update(payload).digest('hex'), 'utf8');
  const checksum = Buffer.from(sig, 'utf8');
  if (checksum.length !== digest.length || !crypto.timingSafeEqual(digest, checksum)) {
    return next(`Request body digest (${digest}) did not match ${sigHeaderName} (${checksum})`);
  }
  return next();
};

const restartProcess = function () {
	const logfile = 'listener-restart.log';
	const out = fs.openSync(logfile, 'a');
	const err = fs.openSync(logfile, 'a');
	spawn(process.argv[0], process.argv.slice(1), {
		detached: true,
		stdio: [ 'ignore', out, err ]
	}).unref();
	process.exit();
};

// A function to support asynchronous execution of OS commands.
const execShellCommand = function (cmd) {
	return new Promise((resolve, reject) => {
		exec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.warn(error);
			}
			resolve(stdout? stdout : stderr);
		});
	});
};

// Detect the pushed webhook for our server repo from GitHub.
app.post('/', verifyPostData, async function (req, res) {
	try {
		let commitId = req.body.after.substring(0, 12);
		console.log(`  >  Detected new commit ${commitId} ...`);

		// Update the repository locally.
		await execShellCommand('git pull');
		console.log(`  >  Pulled most recent files from git ...`);

		// Install any potentially-new dependencies.
		await execShellCommand('npm install');
		console.log(`  >  Updated the listener server ...`);

		// Delete any local upload from the pack.
		await execShellCommand('rm -rf upload/');
		console.log(`  >  Removed old local modpack build files ...`);

		// Build the updated modpack into files for uploading.
		await execShellCommand(`java -jar ../launcher/builder.jar --version "${commitId}" --input ../modpack-files/ --output upload --manifest-dest "upload/rockhopper.json"`);
		console.log(`  >  Built updated modpack ...`);

		// Create a package listing for the updated modpack.
		let packageData = {
	  	minimumVersion: 1,
			packages: [
		    {
		      title: 'Rockhopper Modded Survival',
		      name: 'rockhopper',
		      version: `${commitId}`,
		      location: 'rockhopper.json',
		      priority: 0
		    }
		  ]
		};
		const json = JSON.stringify(packageData, null, 2);
		await fs.writeFile('upload/packages.json', json)
		console.log(`  >  Wrote updated package listing to file ...`);

		// Delete the web-hosted upload files for the pack.
		await execShellCommand('rm -rf /var/www/rockhopper/minecraft/pack/');
		console.log(`  >  Removed old web-hosted modpack build files ...`);

		// Copy our new local build files to the web upload location.
		await execShellCommand('cp upload/ /var/www/rockhopper/minecraft/pack/');
		console.log(`  >  Deployed new modpack build to web for download ...`);

		// All done!
		console.log(`  >  Modpack update complete!`);

	// Catch any errors that might occur in the modpack updating process and log them.
	} catch (error) {
		console.log(`  >  An error occurred when attempting modpack update!`);
		console.error(error);
	}

	// Restart this listening server.
	console.log('');
	restartProcess();

	// Tell GitHub we completed the request.
  res.status(200).send('Request body was signed.');
});

// Use a middleware that allows us to validate incoming webhooks against GitHub.
app.use((err, req, res, next) => {
  if (err) console.error(err);
  res.status(403).send('Request body was not signed or verification failed.');
});

// Launch the application and begin the server listening.
app.listen(PORT, function () {
	console.log(APPLICATION, 'listening on port', PORT);
});
