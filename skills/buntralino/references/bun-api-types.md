# Bun API (TypeScript)

## Window Management

### create(url, options)
Creates a Neutralino window and returns its name.

```ts
import * as buntralino from 'buntralino';

const name = await buntralino.create('/', {
  name: 'main',
  title: 'My App',
  width: 800,
  height: 600,
  center: true,
  resizable: true
});
```

### show, hide, exit

```ts
await buntralino.show('main');
await buntralino.hide('main');
await buntralino.exit('main');
```

### setAlwaysOnTop

```ts
await buntralino.setAlwaysOnTop('main', true);
```

### Size and Position

```ts
const size = await buntralino.getSize('main');
await buntralino.setSize('main', { width: 900, height: 700 });

const pos = await buntralino.getPosition('main');
await buntralino.move('main', pos.x + 20, pos.y + 20);
```

### Other Window Methods

```ts
await buntralino.center('main');
await buntralino.focus('main');
await buntralino.setTitle('main', 'New Title');
await buntralino.navigate('main', '/settings');
await buntralino.reload('main');
await buntralino.evalJs('main', 'document.title');
```

## Window Options

interface WindowOptions {
  name?: string;
  title?: string;
  icon?: string;
  enableInspector?: boolean;
  alwaysOnTop?: boolean;
  borderless?: boolean;
  exitProcessOnClose?: boolean;
  fullScreen?: boolean;
  hidden?: boolean;
  maximizable?: boolean;
  maximize?: boolean;
  processArgs?: string;
  resizable?: boolean;
  useSavedState?: boolean;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

## Method Registration

### registerMethod
```ts
import * as buntralino from 'buntralino';

type HelloPayload = { name: string };

buntralino.registerMethod('sayHello', async (payload: HelloPayload): Promise<string> => {
  return `Hello, ${payload.name}!`;
});
```

### registerMethodMap
```ts
type AddPayload = { a: number; b: number };

buntralino.registerMethodMap({
  add: (payload: AddPayload) => payload.a + payload.b,
  ping: () => ({ ok: true })
});
```
