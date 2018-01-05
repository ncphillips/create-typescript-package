#! /usr/bin/env node
const path = require("path")
const rollupTypescript = require("rollup-plugin-typescript2")
const rollup = require("rollup")
const resolve = require("rollup-plugin-node-resolve")

const PROJECT = "../../../"
const NODE_MODULES = "../../"

const package = require(path.resolve(__dirname, PROJECT, "package.json"))
const external = Object.keys(package.peerDependencies || {})

const typescript = require(path.resolve(__dirname, NODE_MODULES, "typescript"))

console.log("Creact Typescript Package – Build")
console.log("\tTypescript Version: ", typescript.version)
console.log("\tPackage Name: ", package.name)
console.log("\tExternal Dependencies: ", external)

const inputOptions = {
  input: "src/index.ts",
  external,
  plugins: [
    rollupTypescript({
      tsconfigOverride: { compilerOptions: { declaration: true } },
      typescript,
    }),
    resolve({
      customResolveOptions: {
        moduleDirectory: path.resolve(__dirname, NODE_MODULES),
      },
    }),
  ],
}

const outputOptions = {
  file: `build/${package.name}.js`,
  format: "cjs",
}

async function build() {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions)

  const { code, map } = await bundle.generate(outputOptions)

  // or write the bundle to disk
  await bundle.write(outputOptions)
}

try {
  build()
} catch (e) {
  console.error("Failed to build Typescript project", e)
}
