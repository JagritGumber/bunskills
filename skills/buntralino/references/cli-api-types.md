# Programmatic CLI Usage (TypeScript)

The buntralino-cli package can be used as an ESM module.

Install:

```bash
bun install --dev buntralino-cli
```

Run:

```ts
import * as buntralino from 'buntralino-cli';

const buntralinoIndex = 'src/bun/index.ts';

await buntralino.run(buntralinoIndex);
await buntralino.run(buntralinoIndex, '--devmode');

await buntralino.build(buntralinoIndex);
await buntralino.build(buntralinoIndex, ['--external', 'original-fs']);
```
