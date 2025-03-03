CREATE TYPE "public"."values_keys" AS ENUM('HEADER_LINKS', 'MOBILE_MENU_LINKS');--> statement-breakpoint
CREATE TABLE "value" (
	"key" "values_keys" PRIMARY KEY NOT NULL,
	"value" jsonb NOT NULL
);
