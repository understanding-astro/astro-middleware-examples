import { defineMiddleware } from "astro/middleware";

export const auth = defineMiddleware((context, next) => {
  console.log("In auth middleware");
  return next();
});
