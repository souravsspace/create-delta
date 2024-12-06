import {
  pgTable,
  varchar,
  text,
  timestamp,
  pgEnum,
  index,
  serial,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { schemaTablePrefix as prefix } from "@/constant/app-config";

/**
 * @ENUMS
 *
 * Here you can define drizzle enums which helps improve the type safety
 * in your code.
 */

export const accountTypeEnum = pgEnum(`${prefix}_account_type_enum`, [
  "email",
  "google",
  "github",
]);

/**
 * @TABLES
 *
 * Here you can define drizzle tables which helps improve the type safety
 * in your code.
 */

export const users = pgTable(`${prefix}_users`, {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).unique(),
  emailVerified: timestamp("email_verified", { withTimezone: true }),
});

export const accounts = pgTable(
  `${prefix}_accounts`,
  {
    id: serial("id").primaryKey(),
    userId: serial("user_id")
      .references(() => users.id, { onDelete: "cascade" })
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

export const profiles = pgTable(`${prefix}_profiles`, {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  displayName: text("display_name"),
  imageId: text("image_id"),
  imageUrl: text("image_url"),
  bio: text("bio"),
});

export const sessions = pgTable(`${prefix}_sessions`, {
  id: text("id").primaryKey(),
  userId: serial("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const magicLinks = pgTable(
  `${prefix}_magic_links`,
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

export const userRelations = relations(users, ({ one, many }) => ({
  profiles: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
  accounts: many(accounts),
  sessions: many(sessions),
}));

/**
 * @TYPES
 *
 * You can create and export types from your schema to use in your application.
 * This is useful when you need to know the shape of the data you are working with
 * in a component or function.
 */

export type User = typeof users.$inferSelect;
export type Profile = typeof profiles.$inferSelect;
export type Session = typeof sessions.$inferSelect;
