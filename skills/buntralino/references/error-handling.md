# Error Handling Guide

## Common Error Types

### Connection Errors
```typescript
try {
  await buntralino.ready;
} catch (error) {
  if (error.message.includes('connection')) {
    console.error('Backend connection failed');
  }
}
```

### Method Not Found
```typescript
try {
  const result = await buntralino.run('unknownMethod', {});
} catch (error) {
  if (error.message.includes('not found')) {
    console.error('Method not registered');
  }
}
```

### Timeout Protection
```typescript
const TIMEOUT = Symbol('timeout');
const response = await Promise.race([
  buntralino.run('method', payload),
  new Promise(resolve => setTimeout(() => resolve(TIMEOUT), 30000))
]);

if (response === TIMEOUT) {
  console.error('Request timed out');
}
```

### Backend Error Responses
```typescript
// Backend
buntralino.registerMethod('process', async (payload) => {
  try {
    const result = await processData(payload);
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Frontend
const response = await buntralino.run('process', data);
if (!response.success) {
  console.error('Backend error:', response.error);
}
```