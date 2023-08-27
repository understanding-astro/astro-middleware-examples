import { defineMiddleware } from "astro/middleware";

export const validate = defineMiddleware((context, next) => {
  console.log("In validate middleware");
  return next();
});
