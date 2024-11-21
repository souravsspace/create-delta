import { eq } from "drizzle-orm";

import { db } from "@/db";
import { UserId } from "@/others/data-access/types";
import { UsersTable, AccountsTable, ProfilesTable, USER } from "@/db/schema";
import { GitHubUser } from "@/app/api/[[...route]]/routes/auth/github";
import { GoogleUser } from "@/app/api/[[...route]]/routes/auth/google";

export async function createUserFromDatabase(email: string) {
  const [user] = await db
    .insert(UsersTable)
    .values({
      email,
      emailVerified: new Date(),
    })
    .returning();
  return user;
}

export async function deleteUserFromDatabase(userId: UserId) {
  await db.delete(UsersTable).where(eq(UsersTable.id, userId));
}

export async function setEmailVerifiedFromDatabase(userId: UserId) {
  await db
    .update(UsersTable)
    .set({
      emailVerified: new Date(),
    })
    .where(eq(UsersTable.id, userId));
}

export async function updateUserFromDatabase(
  userId: UserId,
  updatedUser: Partial<USER>,
) {
  await db.update(UsersTable).set(updatedUser).where(eq(UsersTable.id, userId));
}

export async function getUserByEmailFromDatabase(email: string) {
  const user = await db.query.UsersTable.findFirst({
    where: eq(UsersTable.email, email),
  });

  return user;
}

export async function getUserByIdFromDatabase(userId: UserId) {
  const user = await db.query.UsersTable.findFirst({
    where: eq(UsersTable.id, userId),
  });

  return user;
}

export async function getAccountByGoogleIdFromDatabase(googleId: string) {
  return await db.query.AccountsTable.findFirst({
    where: eq(AccountsTable.googleId, googleId),
  });
}

export async function getAccountByGithubIdFromDatabase(githubId: string) {
  return await db.query.AccountsTable.findFirst({
    where: eq(AccountsTable.githubId, githubId),
  });
}

export async function createAccountViaGoogleFromDatabase(
  userId: UserId,
  googleUser: GoogleUser,
) {
  const [account, profile] = await db.batch([
    db
      .insert(AccountsTable)
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
  userId: UserId,
  gitHubUser: GitHubUser,
) {
  const [account, profile] = await db.batch([
    db
      .insert(AccountsTable)
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
