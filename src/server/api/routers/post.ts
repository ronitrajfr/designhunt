import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { eq } from "drizzle-orm";
import { getRateLimiter } from "@/utils/rate-limit";
import { getIp } from "@/utils/ip";
import { redis } from "@/utils/rate-limit";
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

      const token = `posts:${slug}`;
      const cachedData: string | null = await redis.get(token);

      if (cachedData) {
        return JSON.parse(cachedData);
      }
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

      await redis.set(token, JSON.stringify(post[0]), { ex: 300 });

      return post[0];
    }),
});
