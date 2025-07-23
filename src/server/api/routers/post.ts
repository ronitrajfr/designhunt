import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { eq } from "drizzle-orm";
import { getRateLimiter } from "@/utils/rate-limit";
import { getIp } from "@/utils/ip";
import { TRPCError } from "@trpc/server";
import { posts, waitingList } from "@/server/db/schema";

export const postRouter = createTRPCRouter({
  getPost: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const slug = input.slug;
      const post = await ctx.db
        .select()
        .from(posts)
        .where(eq(posts.slug, slug))
        .limit(1);

      if (!post.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No post found with that slug",
        });
      }

      return post[0];
    }),
});
