[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
<a href="https://zenhub.com"><img src="https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png"></a>
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

# create-typescript-package

Create Typescript packages for NPM with zero configuration.

Install the scripts

```bash
$ yarn add --dev type-scripts
```

Then set your build script in the `package.json`:

```json
{
  "scripts": {
    "build": "type-scripts--build"
  }
}
```

Build your project:

```bash
$ yarn build
```
