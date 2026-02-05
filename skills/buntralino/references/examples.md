# Buntralino Examples

This directory contains practical examples of Buntralino integration patterns.

## Available Examples

### 1. Basic Integration (`basic-integration.js`)
Simple client-server communication setup showing:
- Connection establishment
- Method calling
- Event handling
- Basic error handling

### 2. File Processing (`file-processing.js`)
File processing application with progress updates:
- Long-running operations
- Progress broadcasting
- Batch processing
- Error recovery

### 3. Real-time Dashboard (`realtime-dashboard.js`)
Real-time monitoring dashboard with:
- Periodic data updates
- Event-driven UI updates
- Background monitoring
- Alert system

### 4. Authentication System (`authentication.js`)
Secure authentication with session management:
- User login/logout
- Session timeout
- Event-based session handling
- Security best practices

## Usage Patterns

### Pattern 1: Explicit Data Fetching
```typescript
// Always fetch data explicitly
async function refreshData() {
  const result = await buntralino.run('getData', {});
  if (result.success) {
    updateUI(result.data);
  }
}
```

### Pattern 2: Event-Driven Updates
```typescript
// Listen for backend events
Neutralino.events.on('dataUpdated', async () => {
  await refreshData(); // Explicit refresh
});
```

### Pattern 3: Error Handling
```typescript
// Always handle errors gracefully
const response = await Promise.race([
  buntralino.run('method', payload),
  new Promise(resolve => setTimeout(() => resolve({ timeout: true }), 30000))
]);

if (response.timeout) {
  handleTimeout();
} else if (response.success) {
  handleSuccess(response.data);
} else {
  handleError(response.error);
}
```

### Pattern 4: Input Validation
```typescript
// Validate inputs on backend
buntralino.registerMethod('process', async (payload) => {
  if (!payload.data || typeof payload.data !== 'string') {
    return { success: false, error: 'Invalid input' };
  }
  
  const result = await processData(payload.data);
  return { success: true, result };
});
```

## Running Examples

1. Copy the example file to your project
2. Install dependencies: `bun install buntralino buntralino-client`
3. Run the backend: `bun run backend.js`
4. Run the frontend: `bun run frontend.js`

## Integration Checklist

- [ ] Backend methods registered
- [ ] Frontend connection established
- [ ] Error handling implemented
- [ ] Events set up (if needed)
- [ ] Input validation added
- [ ] Timeout protection added
- [ ] Security considerations addressed