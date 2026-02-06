# Watch Mode (TypeScript)

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

```ts
import { serve } from "bun";

console.log("I restarted at:", Date.now());

serve({
  port: 4003,
  fetch(request: Request) {
    return new Response("Sup");
  },
});
```

## Hot mode example

```ts
const state = globalThis as { count?: number };
state.count ??= 0;
state.count++;

Bun.serve({
  fetch(req: Request) {
    return new Response(`Reloaded ${state.count} times`);
  },
  port: 3000,
});
```

Hot reload preserves global state across reloads while re-evaluating modules.
