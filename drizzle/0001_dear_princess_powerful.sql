CREATE TABLE "designhunt_waitlist" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"joined_at" timestamp with time zone DEFAULT now() NOT NULL
);
