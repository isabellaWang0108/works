import * as esbuild from "esbuild";
import { mkdir, rm } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, ".tmp-tests");
const outfile = path.join(outDir, "app-test.mjs");

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

await esbuild.build({
  entryPoints: ["src/App.test.jsx"],
  bundle: true,
  packages: "external",
  platform: "node",
  format: "esm",
  target: "node20",
  define: {
    "process.env.PUBLIC_GA_MEASUREMENT_ID": "\"\"",
  },
  outfile,
  loader: {
    ".js": "jsx",
    ".jsx": "jsx",
    ".css": "empty",
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
  },
  assetNames: "assets/[name]-[hash]",
  plugins: [
    {
      name: "jquery-test-shim",
      setup(build) {
        build.onResolve({ filter: /^jquery$/ }, () => ({
          path: "jquery",
          namespace: "jquery-test-shim",
        }));
        build.onLoad({ filter: /.*/, namespace: "jquery-test-shim" }, () => ({
          loader: "js",
          contents: `
            const chain = {
              0: { getBoundingClientRect: () => ({ top: 0 }) },
              length: 1,
              animate: () => chain,
              css: () => chain,
              scrollTop: () => 0,
            };
            export default function $() {
              return chain;
            }
          `,
        }));
      },
    },
  ],
  logLevel: "silent",
});

const testProcess = spawn(process.execPath, ["--test", outfile], {
  stdio: "inherit",
});

testProcess.on("exit", (code) => {
  process.exit(code ?? 1);
});
