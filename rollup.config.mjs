import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import { execSync } from "node:child_process";

const dev = process.env.ROLLUP_WATCH === "true";

// Stamp the bundle with the commit it was built from. Without this the console
// banner reports CARD_VERSION, which never changes, so a stale bundle is
// indistinguishable from a current one in the browser.
function buildStamp() {
  let describe = "unknown";
  try {
    describe = execSync("git describe --always --dirty --tags", { encoding: "utf8" }).trim();
  } catch {
    // not a git checkout (tarball install) - the timestamp alone still helps
  }
  return `${describe} ${new Date().toISOString().replace(/\.\d+Z$/, "Z")}`;
}
const CARD_BUILD = buildStamp();

export default {
  input: "src/mmwave-card.ts",
  output: {
    file: "dist/mmwave-card.js",
    format: "es",
    sourcemap: dev,
    inlineDynamicImports: true,
  },
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    json(),
    typescript({
      tsconfig: "./tsconfig.json",
      sourceMap: dev,
      inlineSources: dev,
    }),
    {
      name: "card-build-stamp",
      transform(code, id) {
        if (!id.endsWith("const.ts")) return null;
        return { code: code.replaceAll("__CARD_BUILD__", CARD_BUILD), map: null };
      },
    },
    !dev &&
      terser({
        ecma: 2022,
        module: true,
        compress: { drop_console: false },
        format: { comments: false },
      }),
  ].filter(Boolean),
};
