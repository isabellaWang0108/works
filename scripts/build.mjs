import * as esbuild from "esbuild";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { SHARED_KEYWORDS, absoluteUrl, buildPageSchema, personSchema, projectItemListSchema, routeSeo } from "../src/data/recruiterSeo.mjs";

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

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("\"", "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const safeJsonScript = (value) => JSON.stringify(value).replaceAll("</script", "<\\/script");

const replaceHeadTag = (html, pattern, replacement) => {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement);
  }

  return html.replace("</head>", `${replacement}\n</head>`);
};

const applyRouteSeo = (html, route, seo) => {
  const safeTitle = escapeHtml(seo.title);
  const safeDescription = escapeHtml(seo.description);
  const safeKeywords = escapeHtml([...SHARED_KEYWORDS, ...seo.keywords].join(", "));
  const safeUrl = escapeHtml(absoluteUrl(route));
  const pageSchema = safeJsonScript(buildPageSchema({ pathname: route, ...seo }));
  const safePersonSchema = safeJsonScript(personSchema);
  const safeProjectSchema = safeJsonScript(projectItemListSchema);

  return [
    [/<title>.*?<\/title>/s, `<title>${safeTitle}</title>`],
    [/<meta name="description"\s+content="[^"]*"\s*\/?>/s, `<meta name="description" content="${safeDescription}" />`],
    [/<meta name="keywords"\s+content="[^"]*"\s*\/?>/s, `<meta name="keywords" content="${safeKeywords}" />`],
    [/<link rel="canonical" href="[^"]*"\s*\/?>/s, `<link rel="canonical" href="${safeUrl}" />`],
    [/<meta property="og:title" content="[^"]*"\s*\/?>/s, `<meta property="og:title" content="${safeTitle}" />`],
    [/<meta property="og:description"\s+content="[^"]*"\s*\/?>/s, `<meta property="og:description" content="${safeDescription}" />`],
    [/<meta property="og:url" content="[^"]*"\s*\/?>/s, `<meta property="og:url" content="${safeUrl}" />`],
    [/<meta name="twitter:title" content="[^"]*"\s*\/?>/s, `<meta name="twitter:title" content="${safeTitle}" />`],
    [/<meta name="twitter:description"\s+content="[^"]*"\s*\/?>/s, `<meta name="twitter:description" content="${safeDescription}" />`],
    [/<script type="application\/ld\+json" id="person-json-ld">.*?<\/script>/s, `<script type="application/ld+json" id="person-json-ld">${safePersonSchema}</script>`],
    [/<script type="application\/ld\+json" id="page-json-ld">.*?<\/script>/s, `<script type="application/ld+json" id="page-json-ld">${pageSchema}</script>`],
    [/<script type="application\/ld\+json" id="project-list-json-ld">.*?<\/script>/s, `<script type="application/ld+json" id="project-list-json-ld">${safeProjectSchema}</script>`],
  ].reduce((updatedHtml, [pattern, replacement]) => replaceHeadTag(updatedHtml, pattern, replacement), html);
};

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

const baseHtml = injectAssets(await htmlTemplate(), {
  js: hrefFromOutput(path.resolve(root, jsEntry[0])),
  css: cssOutputs,
});
const html = applyRouteSeo(baseHtml, "/", routeSeo["/"]);

await writeFile(path.join(distDir, "index.html"), html);

await Promise.all(Object.entries(routeSeo).filter(([route]) => route !== "/").map(async ([route, seo]) => {
  const routeDir = path.join(distDir, route.slice(1));
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), applyRouteSeo(html, route, seo));
}));
