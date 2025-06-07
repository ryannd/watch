CREATE TYPE "public"."mediaType" AS ENUM('tv', 'movie', 'unknown');--> statement-breakpoint
ALTER TABLE "media" ADD COLUMN "media_type" "mediaType" DEFAULT 'unknown';