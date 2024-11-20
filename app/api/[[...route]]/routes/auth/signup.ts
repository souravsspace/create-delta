import { Hono } from "hono";

const app = new Hono().get("/", async (c) => {
  return c.json({ success: "Signup successfully" }, 200);
});

export default app;
