import { eq } from "drizzle-orm";

import { db } from "@/db";
import { TOKEN_LENGTH, TOKEN_TTL } from "@/constant/app-config";
import { generateRandomToken } from "@/others/data-access/utils";
import { AccountsTable, MagicLinksTable, UsersTable } from "@/db/schema";

export async function upsertMagicLink(email: string) {
  const token = await generateRandomToken(TOKEN_LENGTH);
  const tokenExpiresAt = new Date(Date.now() + TOKEN_TTL);

  await db
    .insert(MagicLinksTable)
    .values({
      email,
      token,
      tokenExpiresAt,
    })
    .onConflictDoUpdate({
      target: MagicLinksTable.email,
      set: {
        token,
        tokenExpiresAt,
      },
    });

  return token;
}

export async function getMagicLinkByToken(token: string) {
  const existingToken = await db.query.MagicLinksTable.findFirst({
    where: eq(MagicLinksTable.token, token),
  });

  return existingToken;
}

export async function deleteMagicToken(token: string) {
  await db.delete(MagicLinksTable).where(eq(MagicLinksTable.token, token));
}

export async function createMagicUserFromDatabase(email: string) {
  const [user] = await db
    .insert(UsersTable)
    .values({
      email,
      emailVerified: new Date(),
    })
    .returning();

  await db
    .insert(AccountsTable)
    .values({
      userId: user.id,
      accountType: "email",
    })
    .returning();

  return user;
}

export async function getMagicUserAccountByEmailFromDatabase(email: string) {
  const user = await db.query.UsersTable.findFirst({
    where: eq(UsersTable.email, email),
  });

  return user;
}
