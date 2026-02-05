# Bun API

## Window Management

### create(url, options)
Creates a Neutralino window and returns its name.

```js
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

```js
await buntralino.show('main');
await buntralino.hide('main');
await buntralino.exit('main');
```

### setAlwaysOnTop

```js
await buntralino.setAlwaysOnTop('main', true);
```

### Size and Position

```js
const size = await buntralino.getSize('main');
await buntralino.setSize('main', { width: 900, height: 700 });

const pos = await buntralino.getPosition('main');
await buntralino.move('main', pos.x + 20, pos.y + 20);
```

### Other Window Methods

```js
await buntralino.center('main');
await buntralino.focus('main');
await buntralino.setTitle('main', 'New Title');
await buntralino.navigate('main', '/settings');
await buntralino.reload('main');
await buntralino.evalJs('main', 'document.title');
```

## Window Options

- name
- title
- icon
- enableInspector
- alwaysOnTop
- borderless
- exitProcessOnClose
- fullScreen
- hidden
- maximizable
- maximize
- processArgs
- resizable
- useSavedState
- x
- y
- width
- height
- minWidth
- minHeight
- maxWidth
- maxHeight

## Method Registration

### registerMethod
```js
import * as buntralino from 'buntralino';

buntralino.registerMethod('sayHello', async (payload) => {
  const name = payload?.name ?? 'world';
  return `Hello, ${name}!`;
});
```

### registerMethodMap
```js
buntralino.registerMethodMap({
  add: (payload) => payload.a + payload.b,
  ping: () => ({ ok: true })
});
```
