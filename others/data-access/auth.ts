import { eq } from "drizzle-orm";

import { db } from "@/db";
import { UserTable, AccountTable, ProfilesTable } from "@/db/schema";
import { GitHubUser } from "@/app/api/[[...route]]/routes/auth/github";
import { GoogleUser } from "@/app/api/[[...route]]/routes/auth/google";

export async function createUserFromDatabase(email: string) {
  const [user] = await db
    .insert(UserTable)
    .values({
      email,
      emailVerified: new Date(),
    })
    .returning();
  return user;
}

export async function getUserByEmailFromDatabase(email: string) {
  const user = await db.query.UserTable.findFirst({
    where: eq(UserTable.email, email),
  });

  return user;
}

export async function getUserByIdFromDatabase(id: string) {
  const user = await db.query.UserTable.findFirst({
    where: eq(UserTable.id, id),
  });

  return user;
}

export async function getAccountByGoogleIdFromDatabase(googleId: string) {
  return await db.query.AccountTable.findFirst({
    where: eq(AccountTable.googleId, googleId),
  });
}

export async function getAccountByGithubIdFromDatabase(githubId: string) {
  return await db.query.AccountTable.findFirst({
    where: eq(AccountTable.githubId, githubId),
  });
}

export async function createAccountViaGoogleFromDatabase(
  userId: string,
  googleUser: GoogleUser,
) {
  const [account, profile] = await db.batch([
    db
      .insert(AccountTable)
      .values({
        userId,
        googleId: googleUser.sub,
        accountType: "google",
      })
      .onConflictDoNothing()
      .returning(),

    db
      .insert(ProfilesTable)
      .values({
        userId,
        imageId: googleUser.given_name,
        displayName: googleUser.name,
        imageUrl: googleUser.picture,
      })
      .onConflictDoNothing()
      .returning(),
  ]);

  return { account, profile };
}

export async function createAccountViaGithubFromDatabase(
  userId: string,
  gitHubUser: GitHubUser,
) {
  const [account, profile] = await db.batch([
    db
      .insert(AccountTable)
      .values({
        userId,
        accountType: "github",
        githubId: gitHubUser.id,
      })
      .onConflictDoNothing()
      .returning(),

    db
      .insert(ProfilesTable)
      .values({
        userId,
        imageId: gitHubUser.login,
        imageUrl: gitHubUser.avatar_url,
        displayName: gitHubUser.name,
        bio: gitHubUser.bio,
      })
      .onConflictDoNothing()
      .returning(),
  ]);

  return { account, profile };
}
