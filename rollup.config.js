import rollupTypescript from "rollup-plugin-typescript"

export default {
  input: "src/index.ts",
  output: {
    file: "dist/create-typescript-package.js",
    format: "cjs",
  },
  plugins: [rollupTypescript()],
}
