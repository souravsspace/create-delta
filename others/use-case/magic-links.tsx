import { animals, colors, uniqueNamesGenerator } from "unique-names-generator";

import {
  createMagicUserFromDatabase,
  deleteMagicToken,
  getMagicLinkByToken,
  upsertMagicLink,
} from "@/others/data-access/magic-links";
import { sendEmail } from "@/lib/send-email";
import { MagicLinkEmail } from "@/emails/magic-link";
import { PublicError } from "@/others/use-case/errors";
import { applicationName } from "@/constant/app-config";
import { createProfile } from "@/others/data-access/profiles";
import {
  getUserByEmailFromDatabase,
  setEmailVerifiedFromDatabase,
} from "@/others/data-access/auth";

export async function sendMagicLinkUseCase(email: string) {
  const token = await upsertMagicLink(email);

  await sendEmail(
    email,
    `Your magic login link for ${applicationName}`,
    <MagicLinkEmail token={token} />,
  );
}

export async function loginWithMagicLinkUseCase(token: string) {
  const magicLinkInfo = await getMagicLinkByToken(token);

  if (!magicLinkInfo) {
    throw new PublicError("Invalid or expired magic link");
  }

  if (magicLinkInfo.tokenExpiresAt! < new Date()) {
    throw new PublicError("This magic link has expired");
  }

  const existingUser = await getUserByEmailFromDatabase(magicLinkInfo.email);

  if (existingUser) {
    await setEmailVerifiedFromDatabase(existingUser.id);
    await deleteMagicToken(token);
    return existingUser;
  } else {
    const newUser = await createMagicUserFromDatabase(magicLinkInfo.email);
    const displayName = uniqueNamesGenerator({
      dictionaries: [colors, animals],
      separator: " ",
      style: "capital",
    });
    await createProfile(newUser.id, displayName);
    await deleteMagicToken(token);
    return newUser;
  }
}
