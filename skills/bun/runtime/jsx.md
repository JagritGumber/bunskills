# JSX

## Overview

Bun supports .jsx and .tsx files out of the box. It reads jsx settings from tsconfig.json or jsconfig.json, or from bunfig.toml.

## JSX configuration

- jsx: react, react-jsx, react-jsxdev
- jsxFactory
- jsxFragmentFactory
- jsxImportSource

## Example

```js
function Component(props) {
  return (
    <body>
      <h1 style={{ color: "red" }}>{props.message}</h1>
    </body>
  );
}

console.log(<Component message="Hello world!" />);
```

## Pragmas

```js
// @jsx h
// @jsxFrag MyFragment
// @jsxImportSource preact
```

## Prop punning

```js
function Div(props) {
  const { className } = props;
  return <div {className} />;
}
```
