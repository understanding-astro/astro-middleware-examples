import { defineMiddleware } from "astro:middleware";

import { PostHog } from "posthog-node";

const client = new PostHog(import.meta.env.POSTHOG_CLIENT);

export const onRequest = defineMiddleware(async (context, next) => {
  console.log("IN MIDDLEWARE");

  try {
    const isEnabled = await client.isFeatureEnabled(
      "astro-middleware-demo",
      "static-user-id"
    );

    console.log({ isEnabled });

    if (isEnabled) {
      console.log("Feature is ENABLED!");
      return next();
      // Redirect this user to a new page
      //   return context.redirect("/growth-book", 304);
    }
  } catch (error) {
    console.error("Failed to load feature flag from PostHog");
  }

  console.log("Feature is DISAAABLED!");
  return next();
});
