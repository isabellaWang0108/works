import * as esbuild from "esbuild";
import { cp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

const root = process.cwd();
const devDir = path.join(root, ".dev");
const publicDir = path.join(root, "public");
const port = Number(process.env.PORT || 3000);

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

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".gif", "image/gif"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
  [".ico", "image/x-icon"],
  [".otf", "font/otf"],
  [".ttf", "font/ttf"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"],
]);

const injectAssets = (html) => {
  const assetMarkup = [
    '  <link rel="stylesheet" href="/assets/index.css" />',
    '  <script type="module" src="/assets/index.js"></script>',
  ].join("\n");

  if (html.includes("<!-- APP_ASSETS -->")) {
    return html.replace("<!-- APP_ASSETS -->", assetMarkup);
  }

  return html.replace(
    /\s*<script type="module" src="\/src\/index\.jsx"><\/script>\s*/,
    `\n${assetMarkup}\n`,
  );
};

const prepareFiles = async () => {
  await rm(devDir, { recursive: true, force: true });
  await mkdir(devDir, { recursive: true });
  await cp(publicDir, devDir, { recursive: true, force: true });
  const html = injectAssets(await readFile(path.join(root, "index.html"), "utf8"));
  await writeFile(path.join(devDir, "index.html"), html);
};

const sendFile = async (res, filePath) => {
  const file = await readFile(filePath);
  const contentType = mimeTypes.get(path.extname(filePath)) || "application/octet-stream";
  res.writeHead(200, { "Content-Type": contentType });
  res.end(file);
};

await prepareFiles();

const context = await esbuild.context({
  entryPoints: ["src/index.jsx"],
  bundle: true,
  splitting: true,
  format: "esm",
  target: "es2020",
  outdir: path.join(devDir, "assets"),
  publicPath: "/assets",
  entryNames: "[name]",
  chunkNames: "chunks/[name]-[hash]",
  assetNames: "media/[name]-[hash]",
  loader: loaders,
  define: {
    "process.env.NODE_ENV": "\"development\"",
  },
  sourcemap: true,
  logLevel: "info",
});

await context.rebuild();
await context.watch();

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://localhost:${port}`);
    const safePath = path
      .normalize(decodeURIComponent(url.pathname))
      .replace(/^(\.\.(\/|\\|$))+/, "");
    let filePath = path.join(devDir, safePath === "/" ? "index.html" : safePath);

    try {
      const fileStat = await stat(filePath);
      if (fileStat.isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }
      await sendFile(res, filePath);
      return;
    } catch {
      const hasExtension = Boolean(path.extname(filePath));
      if (!hasExtension) {
        await sendFile(res, path.join(devDir, "index.html"));
        return;
      }
      res.writeHead(404);
      res.end("Not found");
    }
  } catch (error) {
    res.writeHead(500);
    res.end(error instanceof Error ? error.message : "Server error");
  }
});

server.listen(port, () => {
  console.log(`Local server running at http://localhost:${port}`);
});

const shutdown = async () => {
  server.close();
  await context.dispose();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
