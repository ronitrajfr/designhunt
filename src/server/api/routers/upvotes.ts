import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { upvotes } from "@/server/db/schema";

export const upvoteRouter = createTRPCRouter({
  createUpvote: protectedProcedure
    .input(
      z
        .object({
          postId: z.string().optional(),
          commentId: z.string().optional(),
        })
        .refine((data) => data.postId || data.commentId, {
          message: "Either postId or commentId is required",
        })
        .refine((data) => !(data.postId && data.commentId), {
          message: "Only one of postId or commentId can be provided",
        })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.session.user.id;

      const conditions = [
        eq(upvotes.userId, userId),
        ...(input.postId ? [eq(upvotes.postId, Number(input.postId))] : []),
        ...(input.commentId ? [eq(upvotes.commentId, input.commentId)] : []),
      ];

      const existing = await ctx.db
        .select()
        .from(upvotes)
        .where(and(...conditions))
        .limit(1);

      if (existing.length > 0) {
        await ctx.db.delete(upvotes).where(and(...conditions));

        return {
          status: "removed",
          message: "Upvote removed",
        };
      } else {
        await ctx.db.insert(upvotes).values({
          userId,
          postId: input.postId ? Number(input.postId) : undefined,
          commentId: input.commentId,
        });

        return {
          status: "added",
          message: "Upvote added",
        };
      }
    }),
});
