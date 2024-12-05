import { Hono } from "hono";
import { invalidateSession, validateRequest } from "@/lib/auth";
import { deleteSessionTokenCookie } from "@/lib/session";

const app = new Hono().get("/", async (c) => {
  const { session } = await validateRequest();
  if (!session) {
    return c.json({ error: "Session not found or expired" }, 401);
  }

  await invalidateSession(session.id);
  await deleteSessionTokenCookie();

  return c.redirect("/signed-out", 302);
});

export default app;
