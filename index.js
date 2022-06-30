const express = require("express");
const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function redeploy() {
  try {
    const { stdout, stderr } = await exec('yarn redeploy:dev');
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }
}

const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
	res.json({ message: "Hello World"  });
})

app.get("/deploy", async(req, res) => {
	await redeploy();
	res.json({ message: "Deployment is done"  });
})

app.listen(PORT, () => {
	console.log("Server Running on PORT", PORT);
})