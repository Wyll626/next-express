const fs = require("fs");
const fse = require ("fs-extra");
const dir = "./tmp/";

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

fse.copySync("tpl", dir);

const files = [{ content: ``, location: "src/components/", fallback() {

} }];

files.forEach((element) => {
  const { content, location, fallback } = element;
  fs.writeFile(dir + location, content, fallback);
});


