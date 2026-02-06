# Fetch

Bun implements the WHATWG fetch standard with server-side extensions, and fetch is generally recommended over node:http for client requests.

## Basic Request
```js
const response = await fetch("https://example.com");
const text = await response.text();
```

## POST Request
```js
const response = await fetch("http://example.com", {
  method: "POST",
  body: "Hello, world!",
});
```

## Request Objects and Headers
```js
const request = new Request("http://example.com", {
  method: "POST",
  body: "Hello, world!",
});

const response = await fetch(request);
```

```js
const response = await fetch("http://example.com", {
  headers: {
    "X-Custom-Header": "value",
  },
});
```

## Proxy Support
```js
const response = await fetch("http://example.com", {
  proxy: "http://proxy.com",
});
```

```js
const response = await fetch("http://example.com", {
  proxy: {
    url: "http://proxy.com",
    headers: {
      "Proxy-Authorization": "Bearer my-token",
      "X-Custom-Proxy-Header": "value",
    },
  },
});
```

## Response Body Helpers

- response.text()
- response.json()
- response.formData()
- response.bytes()
- response.arrayBuffer()
- response.blob()

## Streaming Responses
```js
const response = await fetch("http://example.com");

for await (const chunk of response.body) {
  console.log(chunk);
}
```

## Streaming Requests
```js
const stream = new ReadableStream({
  start(controller) {
    controller.enqueue("Hello");
    controller.enqueue(" ");
    controller.enqueue("World");
    controller.close();
  },
});

const response = await fetch("http://example.com", {
  method: "POST",
  body: stream,
});
```

## Timeouts and Cancelation
```js
const response = await fetch("http://example.com", {
  signal: AbortSignal.timeout(1000),
});
```

```js
const controller = new AbortController();

const response = await fetch("http://example.com", {
  signal: controller.signal,
});

controller.abort();
```

## Unix Sockets and TLS
```js
const response = await fetch("https://hostname/a/path", {
  unix: "/var/run/path/to/unix.sock",
  method: "POST",
  body: JSON.stringify({ message: "Hello from Bun!" }),
  headers: {
    "Content-Type": "application/json",
  },
});
```

```js
await fetch("https://example.com", {
  tls: {
    key: Bun.file("/path/to/key.pem"),
    cert: Bun.file("/path/to/cert.pem"),
  },
});
```
