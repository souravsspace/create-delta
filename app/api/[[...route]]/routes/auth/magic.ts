import { Hono } from "hono";
import { rateLimitByIp } from "@/lib/limiter";
import { setSession } from "@/lib/session";
import { afterLoginUrl } from "@/constant/app-config";
import { loginWithMagicLinkUseCase } from "@/others/use-case/magic-links";

const app = new Hono().get("/", async (c) => {
  try {
    await rateLimitByIp({ key: "magic-token", limit: 5, window: 60000 });
    const url = new URL(c.res.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/sign-in",
        },
      });
    }

    const user = await loginWithMagicLinkUseCase(token);

    await setSession(user.id);

    return c.redirect(afterLoginUrl, 302);
  } catch (err) {
    console.error(err);
    return c.redirect("/sign-in/magic/error", 302);
  }
});

export default app;
