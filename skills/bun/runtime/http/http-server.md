# HTTP Server

## Basic server

```js
const server = Bun.serve({
  routes: {
    "/api/status": new Response("OK"),
    "/users/:id": req => new Response(`Hello User ${req.params.id}!`),
    "/api/posts": {
      GET: () => new Response("List posts"),
      POST: async req => {
        const body = await req.json();
        return Response.json({ created: true, ...body });
      },
    },
    "/api/*": Response.json({ message: "Not found" }, { status: 404 }),
    "/blog/hello": Response.redirect("/blog/hello/world"),
    "/favicon.ico": Bun.file("./favicon.ico"),
  },
  fetch() {
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server running at ${server.url}`);
```

## Port and hostname

```js
Bun.serve({
  port: 8080,
  hostname: "mydomain.com",
  fetch() {
    return new Response("404!");
  },
});
```

```js
const server = Bun.serve({
  port: 0,
  fetch() {
    return new Response("404!");
  },
});

console.log(server.port);
console.log(server.url);
```

## HTML imports

```js
import app from "./index.html";

Bun.serve({
  routes: {
    "/": app,
  },
});
```

## Server lifecycle

```js
const server = Bun.serve({
  fetch() {
    return new Response("Hello!");
  },
});

await server.stop();
await server.stop(true);
server.unref();
server.ref();
server.reload({
  routes: {
    "/api/version": Response.json({ version: "v2" }),
  },
});
```

## Per-request controls

```js
const server = Bun.serve({
  async fetch(req, server) {
    server.timeout(req, 60);
    await req.text();
    const address = server.requestIP(req);
    if (!address) return new Response("Unknown client");
    return new Response(`Client IP: ${address.address}, Port: ${address.port}`);
  },
});
```
