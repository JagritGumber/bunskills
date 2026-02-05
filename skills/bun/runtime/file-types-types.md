# File Types (TypeScript)

## Overview

Bun supports the same set of file types in the runtime and bundler. The file extension selects a built-in loader, and you can override it with an import attribute.

## Common loaders

- js, jsx, ts, tsx
- json, jsonc, json5
- toml, yaml, yml
- text, css, html
- wasm, node
- file for unrecognized extensions

## Import attribute

```ts
import config from "./bunfig.toml" with { type: "toml" };
const { default: data } = await import("./data.txt", { with: { type: "yaml" } });
```

## JSON, TOML, YAML

```ts
import pkg from "./package.json";
import config from "./config.toml";
import settings from "./settings.yaml";
```

## Text and HTML

```ts
import contents from "./file.txt";
import html from "./index.html" with { type: "text" };
```

## File loader

```ts
import logo from "./logo.svg";
console.log(logo);
```

## SQLite import

```ts
import db from "./my.db" with { type: "sqlite" };
import embedded from "./my.db" with { type: "sqlite", embed: "true" };
```
