# Client API Reference (TypeScript)

Import buntralino-client once per window to connect to the Bun process.

```ts
import * as buntralino from 'buntralino-client';
```

## buntralino.ready
Wait for the WebSocket connection to the Bun process.

```ts
await buntralino.ready;
```

## buntralino.run(method, payload)
Invoke a Bun-side method registered with buntralino.registerMethod or registerMethodMap.

```ts
type GetDataResponse = { id: number; name: string };
const result = (await buntralino.run('getData', { id: 1 })) as GetDataResponse;
```

## buntralino.broadcast(eventName, eventDetails)
Send an event to all Neutralino windows.

```ts
buntralino.broadcast('update', { timestamp: Date.now() });
```

## buntralino.sendEvent(windowName, eventName, eventDetails)
Send an event to a specific named window.

```ts
buntralino.sendEvent('main', 'loginSuccessful', { username: 'Doofus3000' });
```

## buntralino.shutdown()
Request the Bun process to exit the application.

```ts
buntralino.shutdown();
```

## buntralino.disableBunCheck()
Allow Neutralino.window.create in packaged apps.

```ts
buntralino.disableBunCheck();
```

## Event Listening
Events are received through Neutralino events.

```ts
type UpdateEvent = { timestamp: number };

Neutralino.events.on('update', (event: Neutralino.CustomEvent<UpdateEvent>) => {
  handleUpdate(event.detail);
});
```
