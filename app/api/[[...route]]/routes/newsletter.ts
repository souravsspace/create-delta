import { z } from "zod";
import { Hono } from "hono";
import { rateLimitByIp } from "@/lib/limiter";
import { zValidator } from "@hono/zod-validator";
import { subscribeEmailUseCase } from "@/others/use-case/newsletter";

const app = new Hono().post(
  "/",
  zValidator(
    "query",
    z.object({
      email: z.string().email(),
    }),
  ),
  async (c) => {
    const { email } = c.req.valid("query");

    await rateLimitByIp({ key: "newsletter" });
    await subscribeEmailUseCase(email);

    return c.json({ message: "Email subscribed" }, 200);
  },
);

export default app;
