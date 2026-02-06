# Plugins (TypeScript)

## Overview

Bun provides a universal plugin API for both the runtime and bundler. Plugins intercept imports to implement custom loading or transforms.

## Plugin shape

```ts
import type { BunPlugin } from "bun";

const myPlugin: BunPlugin = {
  name: "Custom loader",
  setup(build) {
    build.onResolve({ filter: /\.yaml$/ }, args => {
      return { path: args.path, namespace: "yaml" };
    });
    build.onLoad({ filter: /\.yaml$/, namespace: "yaml" }, args => {
      return { contents: "export default {}", loader: "js" };
    });
  },
};
```

## Usage

```ts
await Bun.build({
  entrypoints: ["./app.ts"],
  outdir: "./out",
  plugins: [myPlugin],
});
```

## Lifecycle hooks

- onStart
- onResolve
- onLoad
- onBeforeParse

## Loader names

js, jsx, ts, tsx, json, jsonc, toml, yaml, file, napi, wasm, text, css, html

## Namespaces

Namespaces prefix the resolved import. The default namespace is file. Other common namespaces include bun and node.
