# DNS (TypeScript)

Bun implements both its own dns module and the node:dns module. Bun includes DNS caching and a prefetch API to reduce lookup latency.

## node:dns Example
```ts
import * as dns from "node:dns";

const addrs = await dns.promises.resolve4("bun.com", { ttl: true });
console.log(addrs);
```

## Bun dns.prefetch
```ts
import { dns } from "bun";

dns.prefetch("bun.com", 443);
```

## Bun dns.lookup
```ts
import { dns } from "bun";

const [{ address }] = await dns.lookup("example.com", { family: 4 });
```

## Cache Stats
```ts
import { dns } from "bun";

const stats = dns.getCacheStats();
console.log(stats);
```

## Cache TTL
```bash
BUN_CONFIG_DNS_TIME_TO_LIVE_SECONDS=5 bun run my-script.ts
```
