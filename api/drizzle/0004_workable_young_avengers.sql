ALTER TABLE "article" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "article" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;