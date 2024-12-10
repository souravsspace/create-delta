import { z } from "zod";
import { Hono } from "hono";
import { rateLimitByKey } from "@/lib/limiter";
import { getCurrentUser } from "@/lib/session";
import { zValidator } from "@hono/zod-validator";
import {
  updateProfileImageUseCase,
  updateProfileUseCase,
} from "@/others/use-case/user";
import { PublicError } from "@/others/use-case/errors";

const app = new Hono()
  .post(
    "/name-or-bio",
    zValidator(
      "query",
      z.object({
        name: z.string().optional(),
        bio: z.string().optional(),
      }),
    ),
    async (c) => {
      const user = await getCurrentUser();

      if (!user) {
        return c.json({ error: "User not found" }, 401);
      }

      await rateLimitByKey({
        key: `update-profile-name-or-bio-${user.id}`,
        limit: 3,
        window: 60000,
      });

      const { name, bio } = c.req.valid("query");

      await updateProfileUseCase(user.id, { displayName: name, bio });

      return c.json({ message: "Profile updated successfully!" }, 200);
    },
  )
  .post(
    "/image",
    zValidator(
      "form",
      z.object({
        fileWrapper: z.any(),
      }),
    ),
    async (c) => {
      try {
        const user = await getCurrentUser();

        if (!user) {
          return c.json({ error: "User not found" }, 401);
        }

        await rateLimitByKey({
          key: `update-profile-image-${user.id}`,
          limit: 3,
          window: 60000,
        });

        const formData = await c.req.formData();
        const file = formData.get("fileWrapper") as File;

        if (!file) {
          return c.json({ error: "No file provided" }, 400);
        }

        try {
          await updateProfileImageUseCase(file, user.id);
        } catch (error) {
          if (error instanceof PublicError) {
            return c.json({ error: error.message }, 401);
          }
          return c.json({ error: "Failed to update profile image" }, 500);
        }

        return c.json({ message: "Profile updated successfully!" }, 200);
      } catch (error) {
        return c.json(
          {
            error: "Internal server error",
            details: error instanceof Error ? error.message : String(error),
          },
          500,
        );
      }
    },
  );

export default app;
