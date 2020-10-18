// Configure environment variables.
require('dotenv').config();

// Imports.
const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
const exec = require('child_process').exec;
const spawn = require('child_process').spawn;

// Application setup.
const app = express();
app.use(express.static('static'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

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
	spawn(process.argv[1], process.argv.slice(2), {
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
	let commitId = req.body.after.substring(0, 12);
	console.log(commitId);
	console.log(1);

	// Update the repository locally.
	await execShellCommand('git pull');

	// Restart this listening server.
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
