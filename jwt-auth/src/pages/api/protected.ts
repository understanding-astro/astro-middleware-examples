import type { APIRoute } from "astro";

export const get: APIRoute = (ctx) => {
  return new Response(
    JSON.stringify({
      message: "You're logged in!",
    }),
    { status: 200 }
  );
};
