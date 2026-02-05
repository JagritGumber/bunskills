# Client API Reference

## buntralino.ready
Wait for connection to Bun backend

```typescript
await buntralino.ready;
```

## buntralino.run(method, payload)
Execute backend method

```typescript
const result = await buntralino.run('getData', { id: 1 });
```

## buntralino.broadcast(event, data)
Send event to all windows

```typescript
buntralino.broadcast('update', { timestamp: Date.now() });
```

## Event Listening
```typescript
Neutralino.events.on('update', (event) => {
  console.log(event.detail);
});
```