import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { createPostSchema } from "@/types";
import { count, eq } from "drizzle-orm";
import { getRateLimiter } from "@/utils/rate-limit";
import { getIp } from "@/utils/ip";
import { TRPCError } from "@trpc/server";
import { posts, upvotes } from "@/server/db/schema";
import { generate2DigitNumber } from "@/utils/generate-id";

export const postRouter = createTRPCRouter({
  getPost: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      let slug = input.slug;

      const isSlugExists = await ctx.db
        .select()
        .from(posts)
        .where(eq(posts.slug, slug));

      const [post] = await ctx.db
        .select()
        .from(posts)
        .where(eq(posts.slug, slug))
        .limit(1);

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No post found with that slug",
        });
      }

      const [upvoteCount] = await ctx.db
        .select({ count: count() })
        .from(upvotes)
        .where(eq(upvotes.postId, post.id));

      const result = {
        ...post,
        upvotes: upvoteCount?.count,
      };

      return result;
    }),
  createPost: protectedProcedure
    .input(createPostSchema)
    .mutation(async ({ input, ctx }) => {
      const limiter = getRateLimiter("create-post");

      if (limiter) {
        const ip = getIp(ctx.headers);
        const { success } = await limiter.limit(ip);

        if (!success) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: "Too many requests. Please try again later.",
          });
        }
      }

      let slug = input.slug;
      const existingSlug = await ctx.db
        .select()
        .from(posts)
        .where(eq(posts.slug, slug))
        .limit(1);

      if (existingSlug.length > 0) {
        const randomId = generate2DigitNumber();
        slug = `${slug}-${randomId}`;
      }

      const [newPost] = await ctx.db
        .insert(posts)
        .values({
          ...input,
          slug,
          createdById: ctx.session.user.id,
        })
        .returning();

      return { success: true, message: "Post created", data: newPost };
    }),

  // FOR TESTING PURPOSE
  bulkPost: publicProcedure.query(async ({ ctx }) => {
    const allPost = await ctx.db.select().from(posts);

    if (!allPost.length) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No posts found",
      });
    }
    return allPost;
  }),
});
