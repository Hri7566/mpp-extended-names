const esbuild = require("esbuild");
const fs = require("fs");

esbuild.buildSync({
    bundle: true,
    minify: true,
    entryPoints: ["src/index.ts"],
    outfile: "dist/raw.js"
});

const header = fs.readFileSync("header.user.js");
const raw = fs.readFileSync("dist/raw.js");

fs.writeFileSync(
    "dist/mpp-extended-names.user.js",
    header.toString() + raw.toString()
);
