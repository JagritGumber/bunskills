# DNS

Bun implements both its own dns module and the node:dns module. Bun includes DNS caching and a prefetch API to reduce lookup latency.

## node:dns Example
```js
import * as dns from "node:dns";

const addrs = await dns.promises.resolve4("bun.com", { ttl: true });
console.log(addrs);
```

## Bun dns.prefetch
```js
import { dns } from "bun";

dns.prefetch("bun.com", 443);
```

## Bun dns.lookup
```js
import { dns } from "bun";

const [{ address }] = await dns.lookup("example.com", { family: 4 });
```

## Cache Stats
```js
import { dns } from "bun";

const stats = dns.getCacheStats();
console.log(stats);
```

## Cache TTL
```bash
BUN_CONFIG_DNS_TIME_TO_LIVE_SECONDS=5 bun run my-script.ts
```
