---
name: buntralino
description: Comprehensive Buntralino integration for cross-platform desktop applications using Bun backend and Neutralino frontend. Use when building desktop apps that need native Bun backend capabilities with web-based UI, including method registration, event handling, async communication patterns, and proper state management.
---

# Buntralino Integration Guide

Buntralino enables desktop applications with Bun backend processing power and Neutralino web-based frontend. This skill provides complete integration patterns for client-server communication, method registration, event handling, and state management.

## Quick Start

### Client-Side Setup (Neutralino Frontend)
```typescript
import * as buntralino from 'buntralino-client';

// Wait for connection to Bun backend
await buntralino.ready;

// Call backend methods
const result = await buntralino.run('myMethod', { data: 'hello' });
console.log(result);
```

### Server-Side Setup (Bun Backend)
```typescript
import * as buntralino from 'buntralino';

// Register methods for frontend to call
buntralino.registerMethod('myMethod', async (payload) => {
  console.log('Received:', payload);
  return { success: true, processed: payload.data.toUpperCase() };
});
```

## Core Patterns

### Async Method Communication
```typescript
// Frontend
const response = await buntralino.run('processData', { input: 'data' });
if (response.success) {
  console.log('Processed:', response.result);
}

// Backend
buntralino.registerMethod('processData', async (payload) => {
  try {
    const result = await heavyProcessing(payload.input);
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
```

### Event Broadcasting
```typescript
// Backend broadcasts
buntralino.broadcast('dataUpdated', { timestamp: Date.now() });

// Frontend listens
Neutralino.events.on('dataUpdated', (event) => {
  console.log('Data updated:', event.detail);
  updateUI(event.detail);
});
```

### State Management
```typescript
// Explicit data fetching (recommended)
async function refreshData() {
  const result = await buntralino.run('getCurrentData', {});
  if (result.success) {
    updateUI(result.data);
  }
}

// Call on mount and when needed
useEffect(() => {
  refreshData();
}, []);
```

## Error Handling

```typescript
// Add timeout protection
const TIMEOUT = Symbol('timeout');
const response = await Promise.race([
  buntralino.run('longRunningTask', { data }),
  new Promise(resolve => setTimeout(() => resolve(TIMEOUT), 30000))
]);

if (response === TIMEOUT) {
  console.error('Request timed out');
} else if (response.success) {
  handleSuccess(response.result);
} else {
  handleError(response.error);
}
```

## Security

### Input Validation
```typescript
buntralino.registerMethod('processFile', async (payload) => {
  const { filePath } = payload;
  
  // Validate and sanitize
  if (!filePath || typeof filePath !== 'string') {
    return { success: false, error: 'Invalid file path' };
  }
  
  const sanitizedPath = path.normalize(filePath).replace(/^(\.\.[\/\\])+/, '');
  
  // Process with validated path
  const result = await processFile(sanitizedPath);
  return { success: true, result };
});
```

## References

- [Client API Reference](references/client-api.md) - Complete client-side API documentation
- [Server API Reference](references/server-api.md) - Backend method registration patterns
- [Examples](references/examples.md) - Working implementation examples
- [Error Handling](references/error-handling.md) - Comprehensive error strategies

## Integration Checklist

1. **Backend**: Import buntralino, register methods, add validation
2. **Frontend**: Import buntralino-client, wait for ready, set up listeners
3. **Communication**: Use explicit fetching, implement timeouts, handle events