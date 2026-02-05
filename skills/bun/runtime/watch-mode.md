# Watch Mode

## Overview

Bun supports two reload modes:

- --watch restarts the process when imported files change.
- --hot reloads modules without restarting the process.

## Run a file in watch mode

```bash
bun --watch index.tsx
```

## Run tests in watch mode

```bash
bun --watch test
```

## Watch mode example

```js
import { serve } from "bun";

console.log("I restarted at:", Date.now());

serve({
  port: 4003,
  fetch(request) {
    return new Response("Sup");
  },
});
```

## Hot mode example

```js
globalThis.count ??= 0;
globalThis.count++;

Bun.serve({
  fetch(req) {
    return new Response(`Reloaded ${globalThis.count} times`);
  },
  port: 3000,
});
```

Hot reload preserves global state across reloads while re-evaluating modules.
