const { exec } = require("node:child_process");
const fs = require ("fs");
const oli = exec("cd tmp && yarn && yarn build");
oli.stdout.pipe(process.stdout);