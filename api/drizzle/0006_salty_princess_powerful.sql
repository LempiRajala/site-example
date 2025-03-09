CREATE TABLE "file" (
	"id" uuid PRIMARY KEY NOT NULL,
	"hash" varchar(256) NOT NULL,
	"mime_type" varchar(256) NOT NULL
);
