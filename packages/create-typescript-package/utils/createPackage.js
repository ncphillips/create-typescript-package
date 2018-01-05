const chalk = require("chalk")
const checkPackageName = require("./checkPackageName")
const isSafeToCreateProjectIn = require("./isSafeToCreateProject")
const path = require("path")
const fs = require("fs-extra")
const spawn = require("cross-spawn")

const { devDependencies } = require("./dependencies.json")

module.exports = function createPackage(name) {
  const root = path.resolve(name)
  const appName = path.basename(root)

  checkPackageName(appName)

  fs.copySync(path.resolve(__dirname, "../template"), appName)

  console.log(`Creating a new Typescript package in ${chalk.green(root)}.`)
  console.log()

  const packageJson = {
    name: appName,
    version: "0.1.0",
    private: true,
    scripts: {
      build: "type-scripts-build",
    },
  }
  fs.writeFileSync(
    path.join(root, "package.json"),
    JSON.stringify(packageJson, null, 2)
  )
  process.chdir(root)

  spawn("npm", ["install", "--save-dev"].concat(devDependencies))
}
