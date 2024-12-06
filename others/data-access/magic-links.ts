import { eq } from "drizzle-orm";

import { db } from "@/db";
import { TOKEN_LENGTH, TOKEN_TTL } from "@/constant/app-config";
import { generateRandomToken } from "@/others/data-access/utils";
import { accounts, magicLinks, users } from "@/db/schema";

export async function upsertMagicLink(email: string) {
  const token = await generateRandomToken(TOKEN_LENGTH);
  const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL);

  await db
    .insert(magicLinks)
    .values({
      email,
      token,
      tokenExpiresAt,
    })
    .onConflictDoUpdate({
      target: magicLinks.email,
      set: {
        token,
        tokenExpiresAt,
      },
    });

  return token;
}

export async function getMagicLinkByToken(token: string) {
  const existingToken = await db.query.magicLinks.findFirst({
    where: eq(magicLinks.token, token),
  });

  return existingToken;
}

export async function deleteMagicToken(token: string) {
  await db.delete(magicLinks).where(eq(magicLinks.token, token));
}

export async function createMagicUserFromDatabase(email: string) {
  const [user] = await db
    .insert(users)
    .values({
      email,
      emailVerified: new Date(),
    })
    .returning();

  await db
    .insert(accounts)
    .values({
      userId: user.id,
      accountType: "email",
    })
    .returning();

  return user;
}

export async function getMagicUserAccountByEmailFromDatabase(email: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  return user;
}
