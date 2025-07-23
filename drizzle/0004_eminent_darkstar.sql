ALTER TABLE "designhunt_post_tag" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "designhunt_tag" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "designhunt_post_tag" CASCADE;--> statement-breakpoint
DROP TABLE "designhunt_tag" CASCADE;--> statement-breakpoint
ALTER TABLE "designhunt_post" ALTER COLUMN "status" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "designhunt_post" ADD COLUMN "tag" varchar NOT NULL;--> statement-breakpoint
CREATE INDEX "tag_idx" ON "designhunt_post" USING btree ("tag");