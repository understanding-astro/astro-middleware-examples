import type { APIRoute } from "astro";
import { TOKEN } from "../../constant";

export const post: APIRoute = async (ctx) => {
  try {
    // unset cookies
    ctx.cookies.set(TOKEN, "", {
      httpOnly: true,
      maxAge: 0,
      path: "/",
    });

    return new Response(
      JSON.stringify({
        message: "You're logged out!",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.debug(error);

    return new Response(
      JSON.stringify({
        message: "Logout failed",
      }),
      {
        status: 500,
      }
    );
  }
};
