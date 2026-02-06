# Debugger

## Overview

Bun supports the WebKit Inspector Protocol, so you can debug with a browser-based inspector or VS Code.

## Start a debugging session

```bash
bun --inspect server.ts
```

Use these variants when needed:

```bash
bun --inspect-brk server.ts
bun --inspect-wait server.ts
```

You can specify a port or URL prefix:

```bash
bun --inspect=4000 server.ts
bun --inspect=localhost:4000 server.ts
bun --inspect=localhost:4000/prefix server.ts
```

## Example server

```js
Bun.serve({
  fetch(req) {
    console.log(req.url);
    return new Response("Hello, world!");
  },
});
```

## Browser inspector

Open the debug URL printed by Bun, or use https://debug.bun.sh with the provided host and token to set breakpoints and inspect state.

## Log fetch requests

```js
process.env.BUN_CONFIG_VERBOSE_FETCH = "curl";

await fetch("https://example.com", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ foo: "bar" }),
});
```
