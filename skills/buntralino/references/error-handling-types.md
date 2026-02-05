# Error Handling Guide (TypeScript)

## Connection Errors
```ts
try {
  await buntralino.ready;
} catch (error) {
  const message = String(error);
  if (message.includes('connection')) {
    reportFailure('Backend connection failed');
  }
}
```

## Method Not Found
```ts
try {
  await buntralino.run('unknownMethod', {});
} catch (error) {
  const message = String(error);
  if (message.includes('not found')) {
    reportFailure('Method not registered');
  }
}
```

## Timeout Protection
```ts
const TIMEOUT = Symbol('timeout');
const response = await Promise.race([
  buntralino.run('method', payload),
  new Promise((resolve) => setTimeout(() => resolve(TIMEOUT), 30000))
]);

if (response === TIMEOUT) {
  reportFailure('Request timed out');
}
```

## Backend Error Responses
```ts
type ProcessOk = { ok: true; result: string };
type ProcessFail = { ok: false; error: string };
type ProcessResponse = ProcessOk | ProcessFail;

buntralino.registerMethod('process', async (payload): Promise<ProcessResponse> => {
  try {
    const result = await processData(payload);
    return { ok: true, result };
  } catch (error) {
    return { ok: false, error: String(error) };
  }
});
```

```ts
const response = (await buntralino.run('process', data)) as ProcessResponse;
if (!response.ok) {
  reportFailure(response.error);
}
```
