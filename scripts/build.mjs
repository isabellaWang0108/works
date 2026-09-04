import * as esbuild from "esbuild";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");
const publicDir = path.join(root, "public");
const entryPoint = "src/index.jsx";

const loaders = {
  ".js": "jsx",
  ".jsx": "jsx",
  ".css": "css",
  ".png": "file",
  ".jpg": "file",
  ".jpeg": "file",
  ".gif": "file",
  ".svg": "file",
  ".webp": "file",
  ".mov": "file",
  ".mp4": "file",
  ".otf": "file",
  ".ttf": "file",
  ".woff": "file",
  ".woff2": "file",
};

const htmlTemplate = async () => readFile(path.join(root, "index.html"), "utf8");

const loadEnvFile = async (fileName) => {
  try {
    const content = await readFile(path.join(root, fileName), "utf8");
    content.split(/\r?\n/).forEach((line) => {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (!match || process.env[match[1]]) {
        return;
      }

      process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
    });
  } catch {
    // Local env files are optional.
  }
};

const injectAssets = (html, assets) => {
  const assetMarkup = [
    ...assets.css.map((href) => `  <link rel="stylesheet" href="${href}" />`),
    `  <script type="module" src="${assets.js}"></script>`,
  ].join("\n");

  if (html.includes("<!-- APP_ASSETS -->")) {
    return html.replace("<!-- APP_ASSETS -->", assetMarkup);
  }

  return html.replace(
    /\s*<script type="module" src="\/src\/index\.jsx"><\/script>\s*/,
    `\n${assetMarkup}\n`,
  );
};

const hrefFromOutput = (file) => `/${path.relative(distDir, file).split(path.sep).join("/")}`;

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });
await cp(publicDir, distDir, { recursive: true, force: true });
await loadEnvFile(".env.local");
await loadEnvFile(".env");

const result = await esbuild.build({
  entryPoints: [entryPoint],
  bundle: true,
  splitting: true,
  format: "esm",
  target: "es2020",
  outdir: path.join(distDir, "assets"),
  publicPath: "/assets",
  entryNames: "[name]-[hash]",
  chunkNames: "chunks/[name]-[hash]",
  assetNames: "media/[name]-[hash]",
  loader: loaders,
  define: {
    "process.env.NODE_ENV": "\"production\"",
    "process.env.PUBLIC_GA_MEASUREMENT_ID": JSON.stringify(process.env.PUBLIC_GA_MEASUREMENT_ID || ""),
  },
  minify: true,
  sourcemap: false,
  metafile: true,
  logLevel: "info",
});

const outputs = Object.entries(result.metafile.outputs);
const jsEntry = outputs.find(([, output]) => output.entryPoint === entryPoint && output.bytes > 0 && output.imports);
const cssOutputs = outputs
  .filter(([file]) => file.endsWith(".css"))
  .map(([file]) => hrefFromOutput(path.resolve(root, file)));

if (!jsEntry) {
  throw new Error("Could not find the generated app entry file.");
}

const html = injectAssets(await htmlTemplate(), {
  js: hrefFromOutput(path.resolve(root, jsEntry[0])),
  css: cssOutputs,
});

await writeFile(path.join(distDir, "index.html"), html);
