# JSX (TypeScript)

## Overview

Bun supports .tsx files out of the box. It reads jsx settings from tsconfig.json or jsconfig.json, or from bunfig.toml.

## JSX configuration

- jsx: react, react-jsx, react-jsxdev
- jsxFactory
- jsxFragmentFactory
- jsxImportSource

## Example

```ts
type Props = { message: string };

function Component(props: Props) {
  return (
    <body>
      <h1 style={{ color: "red" }}>{props.message}</h1>
    </body>
  );
}

console.log(<Component message="Hello world!" />);
```

## Pragmas

```ts
// @jsx h
// @jsxFrag MyFragment
// @jsxImportSource preact
```

## Prop punning

```ts
function Div(props: { className: string }) {
  const { className } = props;
  return <div {className} />;
}
```
