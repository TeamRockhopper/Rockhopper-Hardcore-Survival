// Configure environment variables.
require('dotenv').config();

// Imports.
const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const fs = require('fs-extra');
const Rcon = require('rcon-client').Rcon;

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
const RCON_PASSWORD = process.env.RCON_PASSWORD;

// A helper function to sleep asynchronously.
const sleep = function (ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
};

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

// A function to restart this listener server process automatically.
// Currently unused.
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
		exec(cmd, { maxBuffer: 2 * 1024 * 1024 * 1000 }, (error, stdout, stderr) => {
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

		// Forcefully update the repository locally.
		await execShellCommand('git reset --hard origin/master');
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
		await execShellCommand('cp -r upload/ /var/www/rockhopper/minecraft/pack/');
		console.log(`  >  Deployed new modpack build to web for download ...`);

		// Delete any local server uploads from the pack.
		await execShellCommand('rm -rf server-upload/');
		console.log(`  >  Removed old local modpack server build files ...`);

		// Build the updated modpack into server files.
		await execShellCommand(`java -cp ../launcher/builder.jar com.skcraft.launcher.builder.ServerCopyExport --source ../modpack-files/src --dest server-upload`);
		console.log(`  >  Built updated server files ...`);

		// Count-down, save, and stop the Minecraft server.
		const rcon = await Rcon.connect({
			host: 'localhost', port: 4000, password: `${RCON_PASSWORD}`
		});
		await rcon.send('say There has been a modpack update.');
		await sleep(500);
		await rcon.send('say Please update your modpack client using the launcher.');
		await sleep(500);
		await rcon.send('say The server will restart in 30 seconds.');
		await sleep(5000);
		await rcon.send('say The server will restart in 25 seconds.');
		await sleep(5000);
		await rcon.send('say The server will restart in 20 seconds.');
		await sleep(5000);
		await rcon.send('say The server will restart in 15 seconds.');
		await sleep(5000);
		await rcon.send('say The server will restart in 10 seconds.');
		await sleep(5000);
		await rcon.send('say The server will restart in 5 seconds.');
		await sleep(5000);
		await rcon.send('say The server is restarting now!');
		await sleep(500);
		await rcon.send('save-all');
		await rcon.end();
		console.log(`  >  Stopped the Minecraft server ...`);

		// Delete the mods and configuration files that are present on the server.
		// await execShellCommand('rm -rf ~/mc-rockhopper-survival/mods/');
		// await execShellCommand('rm -rf ~/mc-rockhopper-survival/config/');
		console.log(`  >  Removed mods and configuration files from the server ...`);

		// Copy the newly-packaged server content into the server.
		// await execShellCommand('cp -r server-upload/ ~/mc-rockhopper-survival');
		console.log(`  >  Copied new server content to the server ...`);

		// Restart the server.
		await execShellCommand('~/mc-rockhopper-survival/start_server.sh');
		console.log(`  >  Restarted the Minecraft server ...`);

		// All done!
		console.log(`  >  Modpack update complete!`);

	// Catch any errors that might occur in the modpack updating process and log them.
	} catch (error) {
		console.log(`  >  An error occurred when attempting modpack update!`);
		console.error(error);
	}

	// Restart this listening server.
	console.log('');

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
