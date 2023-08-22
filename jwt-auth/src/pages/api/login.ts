import { nanoid } from "nanoid";
import { SignJWT } from "jose";
import type { APIRoute } from "astro";
import { TOKEN } from "../../constant";

const secret = new TextEncoder().encode(import.meta.env.JWT_SECRET_KEY);

export const post: APIRoute = async (ctx) => {
  try {
    const token = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(secret);

    // set cookies
    ctx.cookies.set(TOKEN, token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 2, // 2 hours in seconds
    });

    return new Response(
      JSON.stringify({
        message: "You're logged in!",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.debug(error);

    return new Response(
      JSON.stringify({
        message: "Login failed",
      }),
      {
        status: 500,
      }
    );
  }
};
