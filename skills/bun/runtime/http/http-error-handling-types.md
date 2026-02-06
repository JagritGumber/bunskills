# HTTP Error Handling (TypeScript)

## Development mode

```ts
Bun.serve({
  development: true,
  fetch() {
    throw new Error("woops!");
  },
});
```

## Error handler

```ts
Bun.serve({
  fetch() {
    throw new Error("woops!");
  },
  error(error) {
    return new Response(`<pre>${error}\n${error.stack}</pre>`, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
});
```
