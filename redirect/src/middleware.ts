import { defineMiddleware } from "astro/middleware";

const INDEX_PATH = "/";

export const onRequest = defineMiddleware((context, next) => {
  /**
   * The middleware runs every time a page of endpoint is about to be rendered.
   * Only redirect if this is the home page
   */
  if (context.url.pathname === INDEX_PATH) {
    return Response.redirect(new URL("/redirected", context.url), 302);

    /**
     * You may also redirect using `context.redirect` as shown below:
     * =========================================
     * context.redirect("/redirected", 302);
     * =========================================
     * Note that this only works in SSR mode
     */
  }

  return next();
});
