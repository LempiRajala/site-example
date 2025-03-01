CREATE TABLE "article" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "article_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"content" text NOT NULL,
	"meta_description" varchar(256) NOT NULL,
	"meta_keywords" varchar(256) NOT NULL
);
