# WebSockets (TypeScript)

Bun.serve supports server-side WebSockets with handlers declared once per server for efficiency.

## Basic Server
```ts
Bun.serve({
  fetch(req, server) {
    if (server.upgrade(req)) {
      return;
    }
    return new Response("Upgrade failed", { status: 500 });
  },
  websocket: {
    open(ws) {},
    message(ws, message) {
      ws.send(message);
    },
    close(ws, code, message) {},
    drain(ws) {},
  },
});
```

## Custom Upgrade Headers
```ts
Bun.serve({
  fetch(req, server) {
    server.upgrade(req, {
      headers: {
        "Set-Cookie": "SessionId=abc123",
      },
    });
  },
  websocket: {
    message(ws, message) {
      ws.send(message);
    },
  },
});
```

## Contextual Data
```ts
const server = Bun.serve({
  fetch(req, server) {
    server.upgrade(req, {
      data: {
        channelId: new URL(req.url).searchParams.get("channelId"),
        createdAt: Date.now(),
      },
    });
  },
  websocket: {
    open(ws) {
      ws.send(JSON.stringify(ws.data));
    },
    message(ws, message) {
      ws.send(message);
    },
  },
});
```

## Browser Client
```ts
const socket = new WebSocket("ws://localhost:3000/chat");

socket.addEventListener("message", (event) => {
  console.log(event.data);
});
```
