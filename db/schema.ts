import { pgTable, varchar, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const accountTypeEnum = ["email", "google", "github"] as const;

const createdAt = timestamp("created_at", { withTimezone: true })
  .notNull()
  .defaultNow();
const updatedAt = timestamp("updated_at", { withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const UserTable = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: varchar("email", { length: 255 }).unique(),
  emailVerified: timestamp("email_verified", { withTimezone: true }),
  createdAt,
  updatedAt,
});

export const AccountTable = pgTable("account", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => UserTable.id, { onDelete: "cascade" })
    .notNull(),
  accountType: text("account_type", { enum: accountTypeEnum }).notNull(),
  githubId: text("github_id").unique(),
  googleId: text("google_id").unique(),
  salt: text("salt"),
});

export const ProfilesTable = pgTable("profile", {
  id: uuid("id").primaryKey().defaultRandom().unique(),
  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  displayName: text("display_name"),
  imageId: text("image_id"),
  imageUrl: text("image_url"),
  bio: text("bio"),
});

export const SessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const TokensTable = pgTable("tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  token: text("token").notNull(),
  hashedToken: text("hashed_token").notNull(),
  tokenExpiresAt: timestamp("token_expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type USER = typeof UserTable.$inferSelect;
export type PROFILE = typeof ProfilesTable.$inferSelect;
