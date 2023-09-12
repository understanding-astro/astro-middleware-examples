import { defineMiddleware } from "astro:middleware";

import { PostHog } from "posthog-node";

const HOME_PAGE_PATH = "/";

/**
 * Create the Post hog client and pass your project API key
 * Add POSTHOG_CLIENT to "src/.env"
 */
const client = new PostHog(import.meta.env.POSTHOG_CLIENT);

export const onRequest = defineMiddleware(async (context, next) => {
  /**
   * Early return. We will only check the feature flag with requests
   * to the homepage
   */
  if (context.url.pathname !== HOME_PAGE_PATH) {
    return next();
  }

  try {
    /**
     * Retrieve the feature toggle for your feature flag
     * In this case, "astro-middleware-demo"
     */
    const isEnabled = await client.isFeatureEnabled(
      "astro-middleware-demo",
      "" // Pass a static-user-id
    );

    console.log({ isEnabled });

    if (isEnabled) {
      console.log("Feature is ENABLED!");

      /**
       * When the feature flag is toggled on, redirect users who access the homepage,
       * to the "/post-hog" page
       */
      return Response.redirect(new URL("/post-hog", context.url), 302);

      /**
       * Otherwise, handle the request as usual
       */
      return next();
    }

    /**
     * Feature flag NOT enabled? Handle the request as usual
     */

    console.log("Feature is DISABLED!");
    return next();
  } catch (error) {
    console.error("Failed to load feature flag from PostHog");

    /**
     * Handle the request as usual
     */
    return next();
  }
});
