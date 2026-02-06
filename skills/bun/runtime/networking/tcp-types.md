# TCP (TypeScript)

Bun.listen and Bun.connect provide low-level TCP servers and clients with shared handler objects.

## Server
```ts
const server = Bun.listen({
  hostname: "localhost",
  port: 8080,
  socket: {
    open(socket) {},
    data(socket, data) {},
    drain(socket) {},
    close(socket, error) {},
    error(socket, error) {},
  },
});
```

## TLS Server
```ts
const secureServer = Bun.listen({
  hostname: "localhost",
  port: 8080,
  socket: {
    data(socket, data) {},
  },
  tls: {
    key: Bun.file("./key.pem"),
    cert: Bun.file("./cert.pem"),
  },
});
```

## Client
```ts
const socket = await Bun.connect({
  hostname: "localhost",
  port: 8080,
  socket: {
    open(socket) {},
    data(socket, data) {},
    drain(socket) {},
    close(socket, error) {},
    error(socket, error) {},
    connectError(socket, error) {},
    end(socket) {},
    timeout(socket) {},
  },
});
```

## Buffering With ArrayBufferSink
```ts
import { ArrayBufferSink } from "bun";

const sink = new ArrayBufferSink();
sink.start({ stream: true, highWaterMark: 1024 });

sink.write("h");
sink.write("e");
sink.write("l");
sink.write("l");
sink.write("o");

queueMicrotask(() => {
  const data = sink.flush();
  const wrote = socket.write(data);
  if (wrote < data.byteLength) {
    sink.write(data.subarray(wrote));
  }
});
```
