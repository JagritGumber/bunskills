# HTTP TLS

## Basic TLS

```js
Bun.serve({
  tls: {
    key: Bun.file("./key.pem"),
    cert: Bun.file("./cert.pem"),
  },
});
```

## Key and cert formats

```js
Bun.serve({
  tls: {
    key: [Bun.file("./key1.pem"), Bun.file("./key2.pem")],
    cert: Bun.file("./cert.pem"),
  },
});
```

## Passphrase

```js
Bun.serve({
  tls: {
    key: Bun.file("./key.pem"),
    cert: Bun.file("./cert.pem"),
    passphrase: "my-secret-passphrase",
  },
});
```

## CA certificates

```js
Bun.serve({
  tls: {
    key: Bun.file("./key.pem"),
    cert: Bun.file("./cert.pem"),
    ca: Bun.file("./ca.pem"),
  },
});
```

## SNI

```js
Bun.serve({
  tls: [
    {
      key: Bun.file("./key1.pem"),
      cert: Bun.file("./cert1.pem"),
      serverName: "my-server1.com",
    },
    {
      key: Bun.file("./key2.pem"),
      cert: Bun.file("./cert2.pem"),
      serverName: "my-server2.com",
    },
  ],
});
```
