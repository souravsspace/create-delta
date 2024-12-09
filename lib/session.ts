import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";

import {
  createSession,
  validateRequest,
  generateSessionToken,
} from "@/lib/auth";
import { env } from "@/lib/env";
import { UserId } from "@/others/data-access/types";
import { SESSION_COOKIE_NAME } from "@/constants/app-config";
import { AuthenticationError } from "@/lib/errors";

export const setSessionTokenCookie = async (
  token: string,
  expiresAt: Date,
): Promise<void> => {
  const awaitedCookies = await cookies();

  awaitedCookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
};

export const deleteSessionTokenCookie = async (): Promise<void> => {
  const awaitedCookies = await cookies();

  awaitedCookies.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
};

export const getSessionToken = cache(async (): Promise<string | undefined> => {
  const awaitedCookies = await cookies();
  return awaitedCookies.get(SESSION_COOKIE_NAME)?.value;
});

export const getCurrentUser = cache(async () => {
  const { user } = await validateRequest();
  return user ?? undefined;
});

export const assertAuthenticated = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new AuthenticationError();
  }
  return user;
};

export const setSession = async (userId: UserId) => {
  const token = generateSessionToken();
  const session = await createSession(token, userId);
  await setSessionTokenCookie(token, session.expiresAt);
};
