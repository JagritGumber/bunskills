# UDP

Bun.udpSocket provides low-level UDP sockets for datagram communication.

## Bind and Receive
```js
const server = await Bun.udpSocket({
  socket: {
    data(socket, buf, port, addr) {
      console.log(`message from ${addr}:${port}`);
      console.log(buf.toString());
    },
  },
});
```

## Send a Datagram
```js
const client = await Bun.udpSocket({});
client.send("Hello, world!", 41234, "127.0.0.1");
```

## Connected UDP
```js
const server = await Bun.udpSocket({
  socket: {
    data(socket, buf, port, addr) {},
  },
});

const client = await Bun.udpSocket({
  connect: {
    port: server.port,
    hostname: "127.0.0.1",
  },
});

client.send("Hello");
```

## Send Many Packets
```js
const socket = await Bun.udpSocket({});

socket.sendMany(["Hello", 41234, "127.0.0.1", "foo", 53, "1.1.1.1"]);
```

## Backpressure
```js
const socket = await Bun.udpSocket({
  socket: {
    drain(socket) {},
  },
});
```

## Multicast
```js
const socket = await Bun.udpSocket({});

socket.addMembership("224.0.0.1");
socket.setMulticastTTL(2);
socket.setMulticastLoopback(true);
socket.setMulticastInterface("192.168.1.100");
```
