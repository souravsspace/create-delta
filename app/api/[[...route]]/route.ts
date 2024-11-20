import { Hono } from "hono";
import { handle } from "hono/vercel";

import signup from "./routes/auth/signup";
import google from "./routes/auth/google";
import github from "./routes/auth/github";
import logout from "./routes/auth/logout";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/auth/signup", signup)
  .route("/auth/login/google", google)
  .route("/auth/login/github", github)
  .route("/auth/logout", logout);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
