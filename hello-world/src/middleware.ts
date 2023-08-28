import { defineMiddleware } from "astro/middleware";

export const onRequest = defineMiddleware((context, next) => {
  console.log("MIDDLEWARE");

  return new Response(
    JSON.stringify({
      message: "Hello world",
    }),
    {
      status: 200,
    }
  );
});
