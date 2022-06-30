const fs = require("fs");
const dir = "./tmp";

if (fs.existsSync(dir)) {
  fs.rmSync(dir, {
    recursive: true,
    force: true,
  });
}
