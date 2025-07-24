import { relations, sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  primaryKey,
  timestamp,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";

export const createTable = pgTableCreator((name) => `designhunt_${name}`);

export const users = createTable("user", (d) => ({
  id: d
    .varchar({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: d.varchar({ length: 255 }),
  email: d.varchar({ length: 255 }).notNull(),
  emailVerified: d.timestamp({ mode: "date", withTimezone: true }),
  image: d.varchar({ length: 255 }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  posts: many(posts),
}));

export const posts = createTable(
  "post",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    title: d.varchar({ length: 256 }).notNull(),
    slug: d.varchar({ length: 256 }).notNull(),
    tagline: d.varchar({ length: 512 }),
    productLink: d.varchar({ length: 512 }),
    launchTag: d.varchar({ length: 128 }),
    opensourceLink: d.varchar({ length: 512 }),
    figmaLink: d.varchar({ length: 512 }),
    p5Js: d.varchar({ length: 512 }),
    firstComment: d.text(),
    media: d.jsonb(),
    youtube: d.varchar({ length: 512 }),
    coverImage: d.varchar({ length: 512 }),
    status: d.varchar().notNull().default("published"),
    tag: d.varchar().notNull(),
    scheduledAt: d.timestamp({ withTimezone: true }),
    createdById: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("created_by_idx").on(t.createdById),
    index("title_idx").on(t.title),
    index("launch_tag_idx").on(t.launchTag),
    index("slug_idx").on(t.slug),
    index("status_idx").on(t.status),
    index("tag_idx").on(t.tag),
  ]
);

export const postsRelations = relations(posts, ({ one }) => ({
  createdBy: one(users, {
    fields: [posts.createdById],
    references: [users.id],
  }),
}));

export const accounts = createTable(
  "account",
  (d) => ({
    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id),
    type: d.varchar({ length: 255 }).$type<AdapterAccount["type"]>().notNull(),
    provider: d.varchar({ length: 255 }).notNull(),
    providerAccountId: d.varchar({ length: 255 }).notNull(),
    refresh_token: d.text(),
    access_token: d.text(),
    expires_at: d.integer(),
    token_type: d.varchar({ length: 255 }),
    scope: d.varchar({ length: 255 }),
    id_token: d.text(),
    session_state: d.varchar({ length: 255 }),
  }),
  (t) => [
    primaryKey({ columns: [t.provider, t.providerAccountId] }),
    index("account_user_id_idx").on(t.userId),
  ]
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  (d) => ({
    sessionToken: d.varchar({ length: 255 }).notNull().primaryKey(),
    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id),
    expires: d.timestamp({ mode: "date", withTimezone: true }).notNull(),
  }),
  (t) => [index("t_user_id_idx").on(t.userId)]
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  (d) => ({
    identifier: d.varchar({ length: 255 }).notNull(),
    token: d.varchar({ length: 255 }).notNull(),
    expires: d.timestamp({ mode: "date", withTimezone: true }).notNull(),
  }),
  (t) => [primaryKey({ columns: [t.identifier, t.token] })]
);

export const waitingList = createTable("waitlist", (d) => ({
  id: d
    .varchar({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: d.varchar({ length: 255 }).notNull(),
  joinedAt: timestamp("joined_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
  unsubToken: d
    .varchar({ length: 255 })
    .notNull()
    .$defaultFn(() => crypto.randomUUID()),
}));

export const upvotes = createTable(
  "upvote",
  (d) => ({
    id: d
      .varchar({ length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id),
    postId: d.integer().references(() => posts.id),
    commentId: d.varchar({ length: 255 }),
    createdAt: d.timestamp({ withTimezone: true }).defaultNow().notNull(),
  }),
  (t) => [
    index("upvote_user_id_idx").on(t.userId),
    index("upvote_post_id_idx").on(t.postId),
    index("upvote_comment_id_idx").on(t.commentId),
  ]
);

export const comments = createTable(
  "comment",
  (d) => ({
    id: d
      .varchar({ length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    postId: d
      .integer()
      .notNull()
      .references(() => posts.id),
    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id),
    content: d.text().notNull(),
    createdAt: d.timestamp({ withTimezone: true }).defaultNow().notNull(),
  }),
  (t) => [
    index("comment_post_id_idx").on(t.postId),
    index("comment_user_id_idx").on(t.userId),
  ]
);

export const replies = createTable(
  "reply",
  (d) => ({
    id: d
      .varchar({ length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    commentId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => comments.id),
    userId: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => users.id),
    content: d.text().notNull(),
    createdAt: d.timestamp({ withTimezone: true }).defaultNow().notNull(),
  }),
  (t) => [
    index("reply_comment_id_idx").on(t.commentId),
    index("reply_user_id_idx").on(t.userId),
  ]
);

export const commentsRelations = relations(comments, ({ one, many }) => ({
  user: one(users, { fields: [comments.userId], references: [users.id] }),
  post: one(posts, { fields: [comments.postId], references: [posts.id] }),
  replies: many(replies),
}));

export const repliesRelations = relations(replies, ({ one }) => ({
  comment: one(comments, {
    fields: [replies.commentId],
    references: [comments.id],
  }),
  user: one(users, { fields: [replies.userId], references: [users.id] }),
}));

export const upvotesRelations = relations(upvotes, ({ one }) => ({
  user: one(users, { fields: [upvotes.userId], references: [users.id] }),
  post: one(posts, { fields: [upvotes.postId], references: [posts.id] }),
}));
