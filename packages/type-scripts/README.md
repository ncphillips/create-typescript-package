[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
<a href="https://zenhub.com"><img src="https://raw.githubusercontent.com/ZenHubIO/support/master/zenhub-badge.png"></a>
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

# type-scripts

Scripts to help develop, test, and build Typescript packages.


## Tutorial

Here's a quick tutorial on how to build a Typescript package with `type-scripts`.

### Step 1: Initialize the Package

```bash
mkdir my-cool-pkg
cd my-cool-pkg

yarn init
```

### Step 2: Setup `types-scripts`

Install `type-scripts`

```bash
yarn add --dev type-scripts
```

And then setup your `build` script in the `package.json`.

**package.json**
```json
{
  "scripts": {
    "build": "type-scripts-build"
  }
}
```

### Step 3: Add the `index.ts`

**src/index.ts**
```Typescript
export default function() {
  console.log("Hello World")
}
```

### Step 4: Build your package

```bash
yarn build
```

You're package will be output to `build/my-cool-pkg.js`