import { eq } from "drizzle-orm";

import { db } from "@/db";
import { UserId } from "@/others/data-access/types";
import { Profile, profiles } from "@/db/schema";

export async function createProfile(
  userId: UserId,
  displayName: string,
  image?: string,
) {
  const [profile] = await db
    .insert(profiles)
    .values({
      userId,
      displayName,
      imageUrl: image,
    })
    .onConflictDoNothing()
    .returning();
  return profile;
}

export async function updateProfile(
  userId: UserId,
  updateProfile: Partial<Profile>,
) {
  await db
    .update(profiles)
    .set(updateProfile)
    .where(eq(profiles.userId, userId));
}

export async function getProfile(userId: UserId) {
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, userId),
  });

  return profile;
}
