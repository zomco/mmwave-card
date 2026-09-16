import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";

const dev = process.env.ROLLUP_WATCH === "true";

// Stamp the bundle so the console banner identifies which code is loaded.
// CARD_VERSION never changes, so without this a three-month-old bundle and a
// current one look identical in the browser - which is exactly how a stale card
// went unnoticed while it wrote to entity ids that no longer existed.
//
// The stamp is a digest of the SOURCE, not of git metadata. dist/ is tracked,
// and a stamp derived from the commit is circular: the commit contains the
// bundle, so the bundle can never carry its own commit's hash and every rebuild
// leaves the tree dirty. Keyed to src/, the bundle is a pure function of the
// source - rebuilding the same source is byte-identical, and the stamp still
// changes precisely when the code does.
function sourceDigest() {
  const dir = "src";
  const files = [];
  (function walk(d) {
    for (const e of readdirSync(d, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
      const full = `${d}/${e.name}`;
      if (e.isDirectory()) walk(full);
      else if (/[.](ts|json)$/.test(e.name)) files.push(full);
    }
  })(dir);
  const h = createHash("sha256");
  for (const f of files) {
    h.update(f);
    h.update(readFileSync(f));
  }
  return h.digest("hex").slice(0, 12);
}
const CARD_BUILD = sourceDigest();

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
