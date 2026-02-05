# HTTP Cookies

## Read cookies

```js
Bun.serve({
  routes: {
    "/profile": req => {
      const userId = req.cookies.get("user_id");
      const theme = req.cookies.get("theme") || "light";
      return Response.json({ userId, theme });
    },
  },
});
```

## Set cookies

```js
Bun.serve({
  routes: {
    "/login": req => {
      const cookies = req.cookies;
      cookies.set("user_id", "12345", {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: true,
        path: "/",
      });
      cookies.set("theme", "dark");
      return new Response("Login successful");
    },
  },
});
```

## Delete cookies

```js
Bun.serve({
  routes: {
    "/logout": req => {
      req.cookies.delete("user_id", { path: "/" });
      return new Response("Logged out successfully");
    },
  },
});
```
