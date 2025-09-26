import { readFile, writeFile } from "node:fs/promises";

const bundle = await readFile("dist/index.js", "utf8");
const pkg = JSON.parse(await readFile("package.json", "utf8"));

const banner = `/**
* ${pkg.name} v${pkg.version}
* (c) 2025-present David Adamson
* @license MIT https://github.com/adamsondavid/esmf/blob/main/LICENSE
**/`;

writeFile("dist/index.js", banner + "\n\n" + bundle, "utf8");
