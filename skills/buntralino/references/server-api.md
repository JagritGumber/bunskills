# Server API Reference

## buntralino.registerMethod(name, handler)
Register method callable from frontend

```typescript
buntralino.registerMethod('getData', async (payload) => {
  const data = await fetchData(payload.id);
  return { success: true, data };
});
```

## buntralino.registerMethodMap(methods)
Register multiple methods

```typescript
buntralino.registerMethodMap({
  'user:create': createUser,
  'user:update': updateUser
});
```

## buntralino.broadcast(event, data)
Send event to all windows

```typescript
buntralino.broadcast('update', { timestamp: Date.now() });
```

## Error Handling
```typescript
buntralino.registerMethod('process', async (payload) => {
  try {
    const result = await processData(payload);
    return { success: true, result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
```