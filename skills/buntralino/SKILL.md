---
name: buntralino
description: Comprehensive Buntralino integration for cross-platform desktop apps using Bun main process and Neutralino windows. Use for Buntralino architecture, CLI usage, Bun API window management, client API calls, method registration, event broadcasting, troubleshooting, and Neutralino-focused UI integration with JavaScript and TypeScript references.
---

# Buntralino Integration Guide

Buntralino uses a Bun main process with Neutralino windows for UI, connected through WebSockets. Use this skill when building or diagnosing Buntralino apps that combine Bun backend logic with Neutralino frontend code.

## Quick Start

### Bun Side
```js
import * as buntralino from 'buntralino';

buntralino.registerMethod('sayHello', async (payload) => {
  const name = payload?.name ?? 'world';
  return { message: `Hello, ${name}!` };
});

await buntralino.create('/', {
  name: 'main',
  title: 'My App',
  width: 800,
  height: 600,
  center: true
});
```

### Neutralino Window
```js
import * as buntralino from 'buntralino-client';

await buntralino.ready;
const response = await buntralino.run('sayHello', { name: 'Ada' });
displayMessage(response.message);
```

## Communication Patterns

### Method Calls With Result Contracts
```js
import * as buntralino from 'buntralino';

buntralino.registerMethod('processData', async (payload) => {
  try {
    const result = await heavyProcessing(payload.input);
    return { ok: true, result };
  } catch (error) {
    return { ok: false, error: String(error) };
  }
});
```

```js
import * as buntralino from 'buntralino-client';

await buntralino.ready;
const response = await buntralino.run('processData', { input: 'data' });
if (response.ok) {
  updateUI(response.result);
} else {
  showError(response.error);
}
```

### Event Broadcasting
```js
import * as buntralino from 'buntralino';

buntralino.broadcast('dataUpdated', { timestamp: Date.now() });
```

```js
Neutralino.events.on('dataUpdated', (event) => {
  updateUI(event.detail);
});
```

### Multi-Window Routing
```js
import * as buntralino from 'buntralino';

await buntralino.create('/settings', { name: 'settings', width: 640, height: 480 });
await buntralino.sendEvent('settings', 'settingsLoaded', { ready: true });
```

## Neutralino Integration Notes

- Ensure required Neutralino namespaces and methods are allowlisted in neutralino.config.json for your app.
- If you intentionally create windows with Neutralino.window.create, call buntralino.disableBunCheck in the window after importing buntralino-client.

## References

JavaScript references use the default filenames. TypeScript references use the same names with a -types suffix.

- [Architecture](references/architecture.md)
- [CLI Usage](references/cli.md)
- [Programmatic CLI](references/cli-api.md)
- [Programmatic CLI (TypeScript)](references/cli-api-types.md)
- [Bun API](references/bun-api.md)
- [Bun API (TypeScript)](references/bun-api-types.md)
- [Client API](references/client-api.md)
- [Client API (TypeScript)](references/client-api-types.md)
- [Troubleshooting Linux](references/troubleshoot-linux.md)
- [Examples](references/examples.md)
- [Error Handling](references/error-handling.md)
- [Examples (TypeScript)](references/examples-types.md)
- [Error Handling (TypeScript)](references/error-handling-types.md)
