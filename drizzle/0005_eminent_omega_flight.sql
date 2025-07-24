CREATE TABLE "designhunt_comment" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"postId" integer NOT NULL,
	"userId" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "designhunt_reply" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"commentId" varchar(255) NOT NULL,
	"userId" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "designhunt_upvote" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"postId" integer,
	"commentId" varchar(255),
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "designhunt_comment" ADD CONSTRAINT "designhunt_comment_postId_designhunt_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."designhunt_post"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "designhunt_comment" ADD CONSTRAINT "designhunt_comment_userId_designhunt_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."designhunt_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "designhunt_reply" ADD CONSTRAINT "designhunt_reply_commentId_designhunt_comment_id_fk" FOREIGN KEY ("commentId") REFERENCES "public"."designhunt_comment"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "designhunt_reply" ADD CONSTRAINT "designhunt_reply_userId_designhunt_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."designhunt_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "designhunt_upvote" ADD CONSTRAINT "designhunt_upvote_userId_designhunt_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."designhunt_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "designhunt_upvote" ADD CONSTRAINT "designhunt_upvote_postId_designhunt_post_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."designhunt_post"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "comment_post_id_idx" ON "designhunt_comment" USING btree ("postId");--> statement-breakpoint
CREATE INDEX "comment_user_id_idx" ON "designhunt_comment" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "reply_comment_id_idx" ON "designhunt_reply" USING btree ("commentId");--> statement-breakpoint
CREATE INDEX "reply_user_id_idx" ON "designhunt_reply" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "upvote_user_id_idx" ON "designhunt_upvote" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "upvote_post_id_idx" ON "designhunt_upvote" USING btree ("postId");--> statement-breakpoint
CREATE INDEX "upvote_comment_id_idx" ON "designhunt_upvote" USING btree ("commentId");