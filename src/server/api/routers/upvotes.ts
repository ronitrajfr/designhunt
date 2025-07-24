import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { createPostSchema } from "@/types";
import { eq } from "drizzle-orm";
import { getRateLimiter } from "@/utils/rate-limit";
import { getIp } from "@/utils/ip";
import { redis } from "@/utils/rate-limit";
import { TRPCError } from "@trpc/server";
import { posts } from "@/server/db/schema";

export const upvoteRouter = createTRPCRouter({});
