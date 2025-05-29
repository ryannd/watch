CREATE TABLE "media" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "media_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"poster" varchar(255),
	"description" varchar(255),
	"releaseDate" varchar(255),
	"source" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "season" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "season_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"seasonNumber" integer NOT NULL,
	"episodeCount" integer NOT NULL,
	"description" varchar(255) NOT NULL,
	"airDate" varchar(255),
	"mediaId" integer
);
--> statement-breakpoint
CREATE TABLE "entry" (

);
