const express = require("express");
const AWS = require("aws-sdk");
const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function redeploy() {
  try {
    const { stdout, stderr } = await exec('yarn deploy:dev');
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }
}

const app = express();
const idk = require("./generate/parseContent.js")

const PORT = 5000;

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
})

app.get("/deploy", async (req, res) => {
  console.log(req.query)
  await exec('yarn cleanup');
  const { id } = req.query;
  AWS.config.update({ region: 'eu-central-1' });
  const dynamo = new AWS.DynamoDB.DocumentClient();
  const body = await dynamo
    .get({
      TableName: "oli-dynamodb-deployment-configs",
      Key: {
        id
      }
    })
    .promise();
  if (!body.hasOwnProperty("Item")) {
    res.json({ message: "Deployment not found" });
    return;
  }
  idk.generateFiles(JSON.parse(body.Item.config).content);
  //await redeploy();
  res.json(JSON.parse(body.Item.config));
  
})

app.listen(PORT, () => {
  console.log("Server Running on PORT", PORT);
})