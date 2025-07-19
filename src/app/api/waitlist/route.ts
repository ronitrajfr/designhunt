import { z } from "zod";
import { Resend } from "resend";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const resend = new Resend(process.env.RESEND_API_KEY);

export const waitlistRouter = createTRPCRouter({
  joinWaitlist: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      try {
        await resend.emails.send({
          from: 'Design Hunt Waitlist <waitlist@resend.dev>',
          to: [`${process.env.EMAIL_RESEND}`],
          subject: `🎉 New Waitlist Signup`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
              <h2>📧 New Waitlist Entry</h2>
              <p><strong>Email:</strong> ${input.email}</p>
            </div>
          `,
        });

        return { message: "Thanks for joining the waitlist!" };
      } catch (err) {
        console.error("Email send failed:", err);
        throw new Error("Failed to send confirmation email.");
      }
    }),
});
