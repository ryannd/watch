CREATE TYPE "public"."status" AS ENUM('planning', 'watching', 'completed');--> statement-breakpoint
ALTER TABLE "entry" ADD COLUMN "id" integer PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY (sequence name "entry_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1);--> statement-breakpoint
ALTER TABLE "entry" ADD COLUMN "status" "status" DEFAULT 'planning';--> statement-breakpoint
ALTER TABLE "entry" ADD COLUMN "seasonProgress" integer;--> statement-breakpoint
ALTER TABLE "entry" ADD COLUMN "episodeProgress" integer;--> statement-breakpoint
ALTER TABLE "entry" ADD COLUMN "mediaId" integer;