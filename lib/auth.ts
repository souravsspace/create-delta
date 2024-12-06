import {
  encodeHexLowerCase,
  encodeBase32LowerCaseNoPadding,
} from "@oslojs/encoding";
import { GitHub, Google } from "arctic";
import { sha256 } from "@oslojs/crypto/sha2";

import {
  User,
  Session,
  users as Users,
  sessions as Sessions,
} from "@/db/schema";
import { db } from "@/db";
import { env } from "@/lib/env";
import { eq } from "drizzle-orm";
import { getSessionToken } from "@/lib/session";
import { UserId } from "@/others/data-access/types";

const SESSION_REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 24 * 15;
const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 2;

export const github = new GitHub(
  env.GITHUB_CLIENT_ID,
  env.GITHUB_CLIENT_SECRET,
  `${env.APP_URL}/api/auth/login/github/callback`,
);

export const google = new Google(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  `${env.APP_URL}/api/auth/login/google/callback`,
);

export const generateSessionToken = (): string => {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
};

export const createSession = async (
  token: string,
  userId: UserId,
): Promise<Session> => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    userId,
    id: sessionId,
    expiresAt: new Date(Date.now() + SESSION_MAX_DURATION_MS),
  };
  await db.insert(Sessions).values(session);
  return session;
};

export const validateRequest = async (): Promise<SESSION_VALIDATION_RESULT> => {
  const sessionToken = await getSessionToken();
  if (!sessionToken) {
    return { session: null, user: null };
  }
  return await validateSessionToken(sessionToken);
};

export const validateSessionToken = async (
  token: string,
): Promise<SESSION_VALIDATION_RESULT> => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const sessionInDb = await db.query.sessions.findFirst({
    where: eq(Sessions.id, sessionId),
  });

  if (!sessionInDb) {
    return { session: null, user: null };
  }

  if (Date.now() >= sessionInDb.expiresAt.getTime()) {
    await invalidateSession(sessionInDb.id);
    return { session: null, user: null };
  }

  const userSessionInDb = await db.query.users.findFirst({
    where: eq(Users.id, sessionInDb.userId),
  });

  if (!userSessionInDb) {
    await invalidateSession(sessionInDb.id);
    return { session: null, user: null };
  }

  if (
    Date.now() >=
    sessionInDb.expiresAt.getTime() - SESSION_REFRESH_INTERVAL_MS
  ) {
    sessionInDb.expiresAt = new Date(Date.now() + SESSION_MAX_DURATION_MS);
    await db
      .update(Sessions)
      .set({
        expiresAt: sessionInDb.expiresAt,
      })
      .where(eq(Sessions.id, sessionInDb.id));
  }
  return { session: sessionInDb, user: userSessionInDb };
};

export const invalidateSession = async (sessionId: string): Promise<void> => {
  await db.delete(Sessions).where(eq(Sessions.id, sessionId));
};

export const invalidateUserSessions = async (userId: UserId): Promise<void> => {
  await db.delete(Sessions).where(eq(Users.id, userId));
};

export type SESSION_VALIDATION_RESULT =
  | { session: Session; user: User }
  | { session: null; user: null };
