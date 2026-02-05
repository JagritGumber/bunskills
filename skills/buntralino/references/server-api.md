# Bun API Reference

The Bun side manages windows and exposes methods for Neutralino windows.

## Window Creation
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

## Window Options

- name: custom identifier used by other methods
- title: window title
- icon: path to icon relative to Neutralino resources
- enableInspector: enable devtools
- alwaysOnTop: keep window above others
- borderless: no titlebar or OS frame
- exitProcessOnClose: exit Neutralino process on close
- fullScreen: start fullscreen
- hidden: start hidden
- maximizable: allow maximize
- maximize: start maximized
- processArgs: additional process arguments
- resizable: allow resize
- useSavedState: persist position
- x, y: initial position
- width, height: initial size
- minWidth, minHeight: minimum size
- maxWidth, maxHeight: maximum size

## Window Management

- show(target)
- hide(target)
- exit(target) or close(target)
- setAlwaysOnTop(target, onTop)
- getSize(target)
- setSize(target, options)
- getPosition(target)
- move(target, x, y)
- center(target)
- focus(target)
- getTitle(target)
- setTitle(target, title)
- navigate(target, url)
- reload(target)
- evalJs(target, js)

## Method Registration
```js
import * as buntralino from 'buntralino';

buntralino.registerMethod('sayHello', async (payload) => {
  const name = payload?.name ?? 'world';
  return `Hello, ${name}!`;
});

buntralino.registerMethodMap({
  add: (payload) => payload.a + payload.b,
  ping: () => ({ ok: true })
});
```
