#! /usr/bin/env node
const chalk = require("chalk")
const path = require("path")
const rollupTypescript = require("rollup-plugin-typescript2")
const rollup = require("rollup")
const resolve = require("rollup-plugin-node-resolve")
const commonJs = require("rollup-plugin-commonjs")
const postcss = require("rollup-plugin-postcss")
const autoprefixer = require("autoprefixer")
const less = require("rollup-plugin-less") //support less

const PROJECT = "../../../"
const NODE_MODULES = "../../"

const package = require(path.resolve(__dirname, PROJECT, "package.json"))
const externalKeys = Object.keys(package.peerDependencies || {})
const external = targetId => {
  return !!externalKeys.find(extId => {
    return new RegExp(extId).test(targetId)
  })
}

const typescript = require(path.resolve(__dirname, NODE_MODULES, "typescript"))

console.log("Creact Typescript Package – Build")
console.log("\tTypescript Version: ", typescript.version)
console.log("\tPackage Name: ", package.name)
console.log("\tExternal Dependencies: ", externalKeys)

const inputOptions = {
  input: "src/index.ts",
  external,
  plugins: [
    less(), //support less
    postcss({
      extract: true,
      plugins: [autoprefixer],
    }),
    rollupTypescript({
      typescript,
    }),
    resolve({
      customResolveOptions: {
        moduleDirectory: path.resolve(__dirname, NODE_MODULES),
      },
    }),
    commonJs({
      sourceMap: true,
    }),
  ],
}

const outputOptions = {
  file: package.main,
  name: package.browserName || package.name,
  format: "umd",
}

async function build() {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions)

  const { code, map } = await bundle.generate(outputOptions)

  // or write the bundle to disk
  await bundle.write(outputOptions)
}

build().catch(e => {
  console.log(chalk.red("Build Failed"))
  console.log()
  console.log(
    chalk.red(
      "If you cannot figure out what's causing this failure please create a new issue in Github:"
    )
  )
  console.log()
  console.log(
    `\t${chalk.cyan(
      "https://github.com/ncphillips/create-typescript-package/issues/new"
    )}`
  )
  console.log()
  console.error(e)
})
