import { db } from "@/db";
import { newsletters } from "@/db/schema";

export async function saveNewsletterSubscription(email: string) {
  await db
    .insert(newsletters)
    .values({
      email,
    })
    .onConflictDoNothing();
}
