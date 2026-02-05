# HTTP Routing (TypeScript)

## Basic routing

```ts
Bun.serve({
  routes: {
    "/": () => new Response("Home"),
    "/api": () => Response.json({ success: true }),
    "/users": async () => Response.json({ users: [] }),
  },
  fetch() {
    return new Response("Unmatched route");
  },
});
```

## Route precedence

```ts
Bun.serve({
  routes: {
    "/api/users/me": () => new Response("Current user"),
    "/api/users/:id": req => new Response(`User ${req.params.id}`),
    "/api/*": () => new Response("API catch-all"),
    "/*": () => new Response("Global catch-all"),
  },
});
```

## Static responses

```ts
Bun.serve({
  routes: {
    "/health": new Response("OK"),
    "/ready": new Response("Ready", {
      headers: { "X-Ready": "1" },
    }),
    "/blog": Response.redirect("https://bun.com/blog"),
    "/api/config": Response.json({ version: "1.0.0" }),
  },
});
```

## File routes vs static routes

```ts
Bun.serve({
  routes: {
    "/logo.png": new Response(await Bun.file("./logo.png").bytes()),
    "/download.zip": new Response(Bun.file("./download.zip")),
  },
});
```

## Streaming and range

```ts
Bun.serve({
  fetch(req) {
    return new Response(Bun.file("./hello.txt"));
  },
});
```

```ts
Bun.serve({
  fetch(req) {
    const [start = 0, end = Infinity] = req.headers
      .get("Range")
      .split("=")
      .at(-1)
      .split("-")
      .map(Number);

    const bigFile = Bun.file("./big-video.mp4");
    return new Response(bigFile.slice(start, end));
  },
});
```
