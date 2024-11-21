import { Hono } from "hono";
import { invalidateSession, validateRequest } from "@/lib/auth";

const app = new Hono().get("/", async (c) => {
  const { session } = await validateRequest();
  if (!session) {
    return c.json({ error: "Session not found or expired" }, 401);
  }

  await invalidateSession(session.id);

  return c.redirect("/signed-out", 302);
});

export default app;
