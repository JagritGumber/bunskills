# Module Resolution

## Overview

Bun resolves relative imports by trying a set of extensions in a fixed order, supports both ES Modules and CommonJS, and follows Node.js package resolution with exports and imports support.

## Extension resolution

For `import "./hello"` Bun checks:

```
./hello.tsx
./hello.jsx
./hello.ts
./hello.mjs
./hello.js
./hello.cjs
./hello.json
./hello/index.tsx
./hello/index.jsx
./hello/index.ts
./hello/index.mjs
./hello/index.js
./hello/index.cjs
./hello/index.json
```

If you import a `.js` or `.jsx` path, Bun also checks for matching `.ts` or `.tsx` files.

## Import and require

```js
import { stuff } from "./my-commonjs.cjs";
const { foo } = require("./foo");
```

require works in both ES Modules and CommonJS. You cannot require a file that uses top-level await.

## Package resolution

Bare specifiers are resolved through node_modules using package.json:

- exports conditions with bun, node, require, import, default
- module then main if exports is missing

## Custom conditions

```bash
bun --conditions="react-server" ./app/route.js
```

## NODE_PATH

```bash
NODE_PATH=./packages;./lib bun run src/index.js
```

## Path remapping

```json
{
  "compilerOptions": {
    "paths": {
      "config": ["./config.ts"],
      "components/*": ["components/*"]
    }
  }
}
```

```json
{
  "imports": {
    "#config": "./config.ts",
    "#components/*": "./components/*"
  }
}
```

## import.meta

```js
import.meta.dir;
import.meta.path;
import.meta.url;
import.meta.main;
import.meta.resolve("zod");
```
