# Buntralino Examples (TypeScript)

This directory contains practical examples of Buntralino integration patterns.

## Available Examples

### 1. Basic Integration (basic-integration.js)
Simple client-server communication setup showing:
- Connection establishment
- Method calling
- Event handling
- Basic error handling

### 2. File Processing (file-processing.js)
File processing application with progress updates:
- Long-running operations
- Progress broadcasting
- Batch processing
- Error recovery

### 3. Real-time Dashboard (realtime-dashboard.js)
Real-time monitoring dashboard with:
- Periodic data updates
- Event-driven UI updates
- Background monitoring
- Alert system

### 4. Authentication System (authentication.js)
Secure authentication with session management:
- User login/logout
- Session timeout
- Event-based session handling
- Security best practices

## Usage Patterns

### Pattern 1: Explicit Data Fetching
```ts
type GetDataResponse = { ok: true; data: unknown } | { ok: false; error: string };

async function refreshData() {
  const result = (await buntralino.run('getData', {})) as GetDataResponse;
  if (result.ok) {
    updateUI(result.data);
  }
}
```

### Pattern 2: Event-Driven Updates
```ts
Neutralino.events.on('dataUpdated', async () => {
  await refreshData();
});
```

### Pattern 3: Error Handling
```ts
type MethodResponse =
  | { ok: true; data: unknown }
  | { ok: false; error: string }
  | { timeout: true };

const response = (await Promise.race([
  buntralino.run('method', payload),
  new Promise((resolve) => setTimeout(() => resolve({ timeout: true }), 30000))
])) as MethodResponse;

if ('timeout' in response) {
  handleTimeout();
} else if (response.ok) {
  handleSuccess(response.data);
} else {
  handleError(response.error);
}
```

### Pattern 4: Input Validation
```ts
type ProcessOk = { ok: true; result: string };
type ProcessFail = { ok: false; error: string };
type ProcessResponse = ProcessOk | ProcessFail;

buntralino.registerMethod('process', async (payload): Promise<ProcessResponse> => {
  if (!payload?.data || typeof payload.data !== 'string') {
    return { ok: false, error: 'Invalid input' };
  }

  const result = await processData(payload.data);
  return { ok: true, result };
});
```

## Running Examples

1. Copy the example file to your project
2. Install dependencies: bun install buntralino buntralino-client
3. Run the backend: bun run backend.js
4. Run the frontend: bun run frontend.js

## Integration Checklist

- [ ] Backend methods registered
- [ ] Frontend connection established
- [ ] Error handling implemented
- [ ] Events set up (if needed)
- [ ] Input validation added
- [ ] Timeout protection added
- [ ] Security considerations addressed
