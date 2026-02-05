# Auto Install (TypeScript)

## Overview

If no node_modules directory is found in the working directory or higher, Bun switches to Bun-style resolution and auto-installs imported packages into a global cache.

## Example

```ts
import { foo } from "foo";
foo();
```

## Version resolution

1. Use bun.lock if present.
2. Otherwise use package.json dependencies if found.
3. Otherwise install latest.

You can specify versions directly in imports:

```ts
import { z } from "zod@3.0.0";
import { z as zNext } from "zod@next";
import { z as zRange } from "zod@^3.20.0";
```

## Cache behavior

Cached modules live in a global cache and are reused across runs. latest is revalidated if it was downloaded more than 24 hours ago.

## Limitations

- No TypeScript IntelliSense without node_modules
- No patch-package support
