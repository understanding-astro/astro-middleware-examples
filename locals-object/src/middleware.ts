import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware((context, next) => {
  // add a string value to the locals object
  context.locals.stringValue = "Hello Middleware";

  // add a method to the locals object
  context.locals.functionValue = () => "This is a function return value";

  return next();
});
