import { Hono } from "hono";
import { handle } from "hono/vercel";

import magic from "./routes/auth/magic";
import google from "./routes/auth/google";
import github from "./routes/auth/github";
import logout from "./routes/auth/logout";
import newsletter from "./routes/newsletter";
import profile from "./routes/profile";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  /**
   * @PUBLIC_ROUTES
   *
   * Here you can define public routes that don't require authentication.
   */
  .route("/auth/login/magic", magic)
  .route("/auth/login/google", google)
  .route("/auth/login/github", github)
  /**
   * @PRIVATE_ROUTES
   *
   * Here you can define private routes that require authentication.
   */
  .route("/auth/logout", logout)
  .route("/newsletter", newsletter)
  .route("/profile", profile);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
