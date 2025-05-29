CREATE TYPE "public"."status" AS ENUM('planning', 'watching', 'completed');--> statement-breakpoint
CREATE TABLE "media" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "media_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"poster" varchar(255),
	"description" varchar(255),
	"release_date" varchar(255),
	"source" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "season" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "season_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"season_number" integer NOT NULL,
	"episode_count" integer NOT NULL,
	"description" varchar(255) NOT NULL,
	"air_date" varchar(255),
	"media_id" integer
);
--> statement-breakpoint
CREATE TABLE "entry" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "entry_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"status" "status" DEFAULT 'planning',
	"season_progress" integer,
	"episode_progress" integer,
	"media_id" integer
);
