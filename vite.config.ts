import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  // Type-aware checking is disabled: the benchmark scripts under `src/*.bench.ts`
  // have pre-existing loose typing and are not production code.
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: false, typeCheck: false },
  },
  fmt: {
    ignorePatterns: ["fixtures"],
  },
});
