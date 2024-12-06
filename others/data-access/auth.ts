import { eq } from "drizzle-orm";

import { db } from "@/db";
import { UserId } from "@/others/data-access/types";
import { users, accounts, profiles, User } from "@/db/schema";
import { GitHubUser } from "@/app/api/[[...route]]/routes/auth/github";
import { GoogleUser } from "@/app/api/[[...route]]/routes/auth/google";

export async function createUserFromDatabase(email: string) {
  const [user] = await db
    .insert(users)
    .values({
      email,
      emailVerified: new Date(),
    })
    .returning();
  return user;
}

export async function deleteUserFromDatabase(userId: UserId) {
  await db.delete(users).where(eq(users.id, userId));
}

export async function setEmailVerifiedFromDatabase(userId: UserId) {
  await db
    .update(users)
    .set({
      emailVerified: new Date(),
    })
    .where(eq(users.id, userId));
}

export async function updateUserFromDatabase(
  userId: UserId,
  updatedUser: Partial<User>,
) {
  await db.update(users).set(updatedUser).where(eq(users.id, userId));
}

export async function getUserByEmailFromDatabase(email: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  return user;
}

export async function getUserByIdFromDatabase(userId: UserId) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  return user;
}

export async function getAccountByGoogleIdFromDatabase(googleId: string) {
  return await db.query.accounts.findFirst({
    where: eq(accounts.googleId, googleId),
  });
}

export async function getAccountByGithubIdFromDatabase(githubId: string) {
  return await db.query.accounts.findFirst({
    where: eq(accounts.githubId, githubId),
  });
}

export async function createAccountViaGoogleFromDatabase(
  userId: UserId,
  googleUser: GoogleUser,
) {
  const account = await db
    .insert(accounts)
    .values({
      userId,
      googleId: googleUser.sub,
      accountType: "google",
    })
    .onConflictDoNothing()
    .returning();

  const profile = await db
    .insert(profiles)
    .values({
      userId,
      imageId: googleUser.given_name,
      displayName: googleUser.name,
      imageUrl: googleUser.picture,
    })
    .onConflictDoNothing()
    .returning();

  return { account, profile };
}

export async function createAccountViaGithubFromDatabase(
  userId: UserId,
  gitHubUser: GitHubUser,
) {
  const account = await db
    .insert(accounts)
    .values({
      userId,
      accountType: "github",
      githubId: gitHubUser.id,
    })
    .onConflictDoNothing()
    .returning();

  const profile = await db
    .insert(profiles)
    .values({
      userId,
      imageId: gitHubUser.login,
      imageUrl: gitHubUser.avatar_url,
      displayName: gitHubUser.name,
      bio: gitHubUser.bio,
    })
    .onConflictDoNothing()
    .returning();

  return { account, profile };
}
