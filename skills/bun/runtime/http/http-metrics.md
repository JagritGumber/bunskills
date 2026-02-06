# HTTP Metrics

## Active requests and websockets

```js
const server = Bun.serve({
  fetch(req, server) {
    return new Response(
      `Active requests: ${server.pendingRequests}\n` +
        `Active WebSockets: ${server.pendingWebSockets}`,
    );
  },
});
```

## Subscriber count

```js
const server = Bun.serve({
  fetch(req, server) {
    const chatUsers = server.subscriberCount("chat");
    return new Response(`${chatUsers} users in chat`);
  },
  websocket: {
    message(ws) {
      ws.subscribe("chat");
    },
  },
});
```
