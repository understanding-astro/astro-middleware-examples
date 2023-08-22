import { errors, jwtVerify } from "jose";
import { defineMiddleware } from "astro/middleware";
import { TOKEN, PUBLIC_ROUTES } from "./constant";

const secret = new TextEncoder().encode(import.meta.env.JWT_SECRET_KEY);

const verifyAuth = async (token?: string) => {
  if (!token) {
    return {
      status: "unauthorized",
      msg: "please pass a request token",
    } as const;
  }

  try {
    const jwtVerifyResult = await jwtVerify(token, secret);

    return {
      status: "authorized",
      payload: jwtVerifyResult.payload,
      msg: "successfully verified auth token",
    } as const;
  } catch (err) {
    if (err instanceof errors.JOSEError) {
      return { status: "error", msg: err.message } as const;
    }

    console.debug(err);
    return { status: "error", msg: "could not validate auth token" } as const;
  }
};

export const onRequest = defineMiddleware(async (context, next) => {
  // Ignore auth validation for public routes
  if (PUBLIC_ROUTES.includes(context.url.pathname)) {
    return next();
  }

  const token = context.cookies.get(TOKEN).value;
  const validationResult = await verifyAuth(token);

  console.log(validationResult);

  switch (validationResult.status) {
    case "authorized":
      return next();

    case "error":
    case "unauthorized":
      if (context.url.pathname.startsWith("/api/")) {
        return new Response(JSON.stringify({ message: validationResult.msg }), {
          status: 401,
        });
      }
      // otherwise, redirect to the root page for the user to login
      else {
        return Response.redirect(new URL("/", context.url));
      }

    default:
      return Response.redirect(new URL("/", context.url));
  }
});
