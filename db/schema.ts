import {
  pgTable,
  varchar,
  text,
  timestamp,
  pgEnum,
  index,
  serial,
} from "drizzle-orm/pg-core";

export const accountTypeEnum = pgEnum("account_type_enum", [
  "email",
  "google",
  "github",
]);

export const UsersTable = pgTable("su_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).unique(),
  emailVerified: timestamp("email_verified", { withTimezone: true }),
});

export const AccountsTable = pgTable(
  "su_accounts",
  {
    id: serial("id").primaryKey(),
    userId: serial("user_id")
      .references(() => UsersTable.id, { onDelete: "cascade" })
      .notNull(),
    accountType: accountTypeEnum("accountType").notNull(),
    githubId: text("github_id").unique(),
    googleId: text("google_id").unique(),
    salt: text("salt"),
  },
  (table) => ({
    userIdAccountTypeIdx: index("user_id_account_type_idx").on(
      table.userId,
      table.accountType,
    ),
  }),
);

export const ProfilesTable = pgTable("su_profiles", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .notNull()
    .unique()
    .references(() => UsersTable.id, { onDelete: "cascade" }),
  displayName: text("display_name"),
  imageId: text("image_id"),
  imageUrl: text("image_url"),
  bio: text("bio"),
});

export const SessionsTable = pgTable("su_sessions", {
  id: text("id").primaryKey(),
  userId: serial("user_id")
    .notNull()
    .references(() => UsersTable.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const MagicLinksTable = pgTable(
  "su_magic_links",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    token: text("token"),
    tokenExpiresAt: timestamp("tokenExpiresAt", { mode: "date" }),
  },
  (table) => ({
    tokenIdx: index("token_idx").on(table.token),
  }),
);

/**
 * @RELATIONSHIPS
 *
 * Here you can define drizzle relationships between table which helps improve the type safety
 * in your code.
 */

// TODO: Define relationships between tables

/**
 * @TYPES
 *
 * You can create and export types from your schema to use in your application.
 * This is useful when you need to know the shape of the data you are working with
 * in a component or function.
 */

export type USER = typeof UsersTable.$inferSelect;
export type PROFILE = typeof ProfilesTable.$inferSelect;
export type SESSION = typeof SessionsTable.$inferSelect;
