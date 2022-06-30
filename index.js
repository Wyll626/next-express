const express = require("express");
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
	res.json({ message: "Hello World"  });
})

app.get("/health-check", async(req, res) => {
	await exec("yarn redeploy:dev");
	res.json({ message: "Server up and running"  });
})

app.listen(PORT, () => {
	console.log("Server Running on PORT", PORT);
})