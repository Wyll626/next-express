const path = require("path");

const idk = {
    getContent(components) {
        console.log(components);
        const htmlString = "";
        for (const id in components)
        {
            const component = components[id];
            if(component.type === "Iframe")
            {

            }
            
        }


        return htmlString;
    },
    generateFiles(components) {
        console.log(idk.getContent(components));
        return;
        const fs = require("fs");
        const fse = require("fs-extra");
        const dir = "./tmp/";
        console.log(path.dirname(dir))

        if (!fs.existsSync(dir)) {
            console.log("got here2")
            fs.mkdirSync(dir);
        }

        fse.copySync("tpl", dir);
        console.log("got here3")

        const files = [{
            content: `export default {
  data: "${idk.getContent(components)}"
}`, location: "src/components/htmlData.js", fallback() {

            }
        }];
        console.log("got here4")
        files.forEach((element) => {
            const { content, location, fallback } = element;
            console.log(content)
            fs.writeFile(dir + location, content, fallback);
        });
    }
}

module.exports = idk;