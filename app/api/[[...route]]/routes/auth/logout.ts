import { Hono } from "hono";
import { cookies } from "next/headers";
import { lucia, validateRequest } from "@/lib/auth";

type ResponseType = { success: string } | { error: string };

const app = new Hono().get("/", async (c) => {
  const { session } = await validateRequest();
  if (!session) {
    return c.json({ error: "Session not found or expired" }, 401);
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return c.json<ResponseType>({ success: "Logged out successfully" }, 200);
});

export default app;
