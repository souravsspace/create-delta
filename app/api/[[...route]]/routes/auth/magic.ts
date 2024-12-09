import { z } from "zod";
import { Hono } from "hono";

import { setSession } from "@/lib/session";
import { rateLimitByIp, rateLimitByKey } from "@/lib/limiter";
import { zValidator } from "@hono/zod-validator";
import {
  loginWithMagicLinkUseCase,
  sendMagicLinkUseCase,
} from "@/others/use-case/magic-links";
import { afterLoginUrl } from "@/constants/app-config";

const app = new Hono()
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        email: z.string().email(),
      }),
    ),
    async (c) => {
      const { email } = c.req.valid("json");
      await rateLimitByKey({ key: "magic-token", limit: 3, window: 30000 });

      await sendMagicLinkUseCase(email);

      return c.json({ email: email }, 200);
    },
  )
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        token: z.string().optional(),
      }),
    ),
    async (c) => {
      try {
        await rateLimitByIp({ key: "magic-token", limit: 3, window: 60000 });
        const { token } = c.req.valid("query");

        if (!token) {
          return c.redirect("/login/magic-error", 302);
        }

        const user = await loginWithMagicLinkUseCase(token);

        await setSession(user.id);

        return c.redirect(afterLoginUrl, 302);
      } catch (err) {
        console.error(err);
        return c.redirect("/login/magic-error", 302);
      }
    },
  );

export default app;
