# HTTP Error Handling

## Development mode

```js
Bun.serve({
  development: true,
  fetch() {
    throw new Error("woops!");
  },
});
```

## Error handler

```js
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
