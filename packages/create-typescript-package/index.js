#! /usr/bin/env node
const chalk = require("chalk")
const commander = require("commander")
const path = require("path")

const packageJson = require(path.resolve(__dirname, "package.json"))
const createPackage = require("./utils/createPackage")

let projectName

const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments("<project-directory>")
  .action(name => {
    projectName = name
  })
  .allowUnknownOption()
  .parse(process.argv)

if (typeof projectName === "undefined") {
  console.error("Please specify the project directory:")
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green("<project-directory>")}`
  )
  console.log()
  console.log("For example:")
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green("my-typescript-package")}`
  )
  process.exit(1)
}

createPackage(projectName)
