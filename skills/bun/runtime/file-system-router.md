# File System Router

## Overview

Bun.FileSystemRouter resolves routes against a pages directory using Next.js-style routing. It returns the matched file path, params, and query data.

## Example

```js
const router = new Bun.FileSystemRouter({
  style: "nextjs",
  dir: "./pages",
  origin: "https://mydomain.com",
  assetPrefix: "_next/static/",
});

router.match("/blog/my-cool-post");
```

## Match result

```js
{
  filePath: "/path/to/pages/blog/[slug].tsx",
  kind: "dynamic",
  name: "/blog/[slug]",
  pathname: "/blog/my-cool-post",
  src: "https://mydomain.com/_next/static/pages/blog/[slug].tsx",
  params: { slug: "my-cool-post" }
}
```

## Request matching and reload

```js
router.match(new Request("https://example.com/settings?foo=bar"));
router.reload();
```
