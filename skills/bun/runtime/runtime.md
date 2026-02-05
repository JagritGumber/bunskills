# Bun Runtime

## Overview

Bun is a fast JavaScript runtime built on JavaScriptCore. It starts quickly and runs JavaScript, TypeScript, JSX, and TSX using a native Zig-based transpiler.

## Run a file

```bash
bun run index.js
bun run index.ts
bun run index.jsx
bun run index.tsx
```

The short form behaves the same:

```bash
bun index.js
bun index.tsx
```

## Run package.json scripts

```bash
bun run dev
bun run clean
```

If a built-in Bun command conflicts with a script name, use the explicit form:

```bash
bun run <script>
```

## Run code from stdin

```bash
echo "console.log('Hello')" | bun run -
```

All stdin code is treated as TypeScript with JSX support.

## Watch mode

```bash
bun --watch run index.tsx
```

## Console depth

```bash
bun --console-depth 4 run index.tsx
```

## Smol mode

```bash
bun --smol run index.tsx
```
