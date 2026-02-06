# HTTP TLS (TypeScript)

## Basic TLS

```ts
Bun.serve({
  tls: {
    key: Bun.file("./key.pem"),
    cert: Bun.file("./cert.pem"),
  },
});
```

## Key and cert formats

```ts
Bun.serve({
  tls: {
    key: [Bun.file("./key1.pem"), Bun.file("./key2.pem")],
    cert: Bun.file("./cert.pem"),
  },
});
```

## Passphrase

```ts
Bun.serve({
  tls: {
    key: Bun.file("./key.pem"),
    cert: Bun.file("./cert.pem"),
    passphrase: "my-secret-passphrase",
  },
});
```

## CA certificates

```ts
Bun.serve({
  tls: {
    key: Bun.file("./key.pem"),
    cert: Bun.file("./cert.pem"),
    ca: Bun.file("./ca.pem"),
  },
});
```

## SNI

```ts
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
