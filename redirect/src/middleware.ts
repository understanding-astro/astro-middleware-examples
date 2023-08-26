import { defineMiddleware } from "astro/middleware";

const INDEX_PATH = "/";

export const onRequest = defineMiddleware((context, next) => {
  if (context.url.pathname === INDEX_PATH) {
    return Response.redirect(new URL("/redirected", context.url), 302);

    // For SSR only: you may use `context.redirect` the following
    // return context.redirect("/redirected", 302);
  }

  return next();
});
