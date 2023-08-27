import { sequence } from "astro/middleware";

import { auth } from "./auth";
import { validate } from "./validate";

export const onRequest = sequence(auth, validate);
