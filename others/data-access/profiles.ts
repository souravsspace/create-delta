import { eq } from "drizzle-orm";

import { db } from "@/db";
import { UserId } from "@/others/data-access/types";
import { PROFILE, ProfilesTable } from "@/db/schema";

export async function createProfile(
  userId: UserId,
  displayName: string,
  image?: string,
) {
  const [profile] = await db
    .insert(ProfilesTable)
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
  updateProfile: Partial<PROFILE>,
) {
  await db
    .update(ProfilesTable)
    .set(updateProfile)
    .where(eq(ProfilesTable.userId, userId));
}

export async function getProfile(userId: UserId) {
  const profile = await db.query.ProfilesTable.findFirst({
    where: eq(ProfilesTable.userId, userId),
  });

  return profile;
}
