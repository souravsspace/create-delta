import { subscribeEmail } from "@/lib/newsletter";
import { saveNewsletterSubscription } from "@/others/data-access/newsletters";

export async function subscribeEmailUseCase(email: string) {
  await Promise.all([saveNewsletterSubscription(email), subscribeEmail(email)]);
}
