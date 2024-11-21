CREATE TYPE "public"."type" AS ENUM('email', 'google', 'github');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "su_accounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"accountType" "type" NOT NULL,
	"github_id" text,
	"google_id" text,
	"salt" text,
	CONSTRAINT "su_accounts_github_id_unique" UNIQUE("github_id"),
	CONSTRAINT "su_accounts_google_id_unique" UNIQUE("google_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "su_magic_links" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"token" text,
	"tokenExpiresAt" timestamp,
	CONSTRAINT "su_magic_links_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "su_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"display_name" text,
	"image_id" text,
	"image_url" text,
	"bio" text,
	CONSTRAINT "su_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "su_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "su_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255),
	"email_verified" timestamp with time zone,
	CONSTRAINT "su_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "su_accounts" ADD CONSTRAINT "su_accounts_user_id_su_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."su_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "su_profiles" ADD CONSTRAINT "su_profiles_user_id_su_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."su_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "su_sessions" ADD CONSTRAINT "su_sessions_user_id_su_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."su_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_account_type_idx" ON "su_accounts" USING btree ("user_id","accountType");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "token_idx" ON "su_magic_links" USING btree ("token");