import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1).max(256),
  slug: z.string().min(1).max(256),
  tagline: z.string().max(512).optional(),
  productLink: z.string().url().max(512).optional(),
  launchTag: z.string().max(128).optional(),
  opensourceLink: z.string().url().max(512).optional(),
  figmaLink: z.string().url().max(512).optional(),
  p5Js: z.string().url().max(512).optional(),
  firstComment: z.string().optional(),
  media: z.any().optional(),
  coverImage: z.string().url().max(512).optional(),
  status: z.enum(["published", "draft"]).default("published"),
  tag: z.enum(["animation", "ui/ux", "design"]),
  scheduledAt: z.date().optional(),
});
