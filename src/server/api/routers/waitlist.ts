import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { waitingList } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { getRateLimiter } from "@/utils/rate-limit";
import { getIp } from "@/utils/ip";
import { TRPCError } from "@trpc/server";

export const waitlistRouter = createTRPCRouter({
  joinWaitlist: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const limiter = getRateLimiter("early-access-waitlist");
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

      const userAlreadyInWaitlist = await ctx.db
        .select()
        .from(waitingList)
        .where(eq(waitingList.email, input.email));

      if (userAlreadyInWaitlist[0]) {
        return { message: "You're already on the waitlist!" };
      }

      await ctx.db.insert(waitingList).values({
        email: input.email,
      });

      return { message: "You've been added to the waitlist!" };
    }),
});
