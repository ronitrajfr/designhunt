CREATE TABLE "designhunt_post_tag" (
	"postId" integer NOT NULL,
	"tagId" integer NOT NULL,
	CONSTRAINT "designhunt_post_tag_postId_tagId_pk" PRIMARY KEY("postId","tagId")
);
--> statement-breakpoint
CREATE TABLE "designhunt_tag" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	CONSTRAINT "designhunt_tag_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DROP INDEX "name_idx";--> statement-breakpoint
ALTER TABLE "designhunt_user" ALTER COLUMN "emailVerified" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "designhunt_post" ADD COLUMN "title" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "designhunt_post" ADD COLUMN "slug" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "designhunt_post" ADD COLUMN "tagline" varchar(512);--> statement-breakpoint
ALTER TABLE "designhunt_post" ADD COLUMN "productLink" varchar(512);--> statement-breakpoint
ALTER TABLE "designhunt_post" ADD COLUMN "launchTag" varchar(128);--> statement-breakpoint
ALTER TABLE "designhunt_post" ADD COLUMN "opensourceLink" varchar(512);--> statement-breakpoint
ALTER TABLE "designhunt_post" ADD COLUMN "figmaLink" varchar(512);--> statement-breakpoint
ALTER TABLE "designhunt_post" ADD COLUMN "p5Js" varchar(512);--> statement-breakpoint
ALTER TABLE "designhunt_post" ADD COLUMN "firstComment" text;--> statement-breakpoint
ALTER TABLE "designhunt_post" ADD COLUMN "media" jsonb;--> statement-breakpoint
ALTER TABLE "designhunt_post" ADD COLUMN "youtube" varchar(512);--> statement-breakpoint
ALTER TABLE "designhunt_post" ADD COLUMN "coverImage" varchar(512);--> statement-breakpoint
ALTER TABLE "designhunt_post" ADD COLUMN "status" varchar(16) DEFAULT 'published' NOT NULL;--> statement-breakpoint
ALTER TABLE "designhunt_post" ADD COLUMN "scheduledAt" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "designhunt_post_tag" ADD CONSTRAINT "designhunt_post_tag_postId_designhunt_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."designhunt_post"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "designhunt_post_tag" ADD CONSTRAINT "designhunt_post_tag_tagId_designhunt_tag_id_fk" FOREIGN KEY ("tagId") REFERENCES "public"."designhunt_tag"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "title_idx" ON "designhunt_post" USING btree ("title");--> statement-breakpoint
CREATE INDEX "launch_tag_idx" ON "designhunt_post" USING btree ("launchTag");--> statement-breakpoint
CREATE INDEX "slug_idx" ON "designhunt_post" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "status_idx" ON "designhunt_post" USING btree ("status");--> statement-breakpoint
ALTER TABLE "designhunt_post" DROP COLUMN "name";