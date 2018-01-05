const chalk = require("chalk")
const fs = require("fs-extra")
module.exports = function isSafeToCreateProjectIn(root, name) {
  const validFiles = [
    ".DS_Store",
    "Thumbs.db",
    ".git",
    ".gitignore",
    ".idea",
    "README.md",
    "LICENSE",
    "web.iml",
    ".hg",
    ".hgignore",
    ".hgcheck",
  ]
  console.log()

  const conflicts = fs
    .readdirSync(root)
    .filter(file => !validFiles.includes(file))
  if (conflicts.length < 1) {
    return true
  }

  console.log(
    `The directory ${chalk.green(name)} contains files that could conflict:`
  )
  console.log()
  for (const file of conflicts) {
    console.log(`  ${file}`)
  }
  console.log()
  console.log(
    "Either try using a new directory name, or remove the files listed above."
  )

  return false
}
