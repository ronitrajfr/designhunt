"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Here you would typically send the email to your backend
    console.log("Email submitted:", email);

    setIsSubmitting(false);
    setEmail("");
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-12 px-4 text-center bg-background border-2 border-border rounded-full text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-muted hover:bg-muted/80 text-foreground rounded-full font-medium transition-colors"
        >
          {isSubmitting ? "joining..." : "join the waitlist"}
        </Button>
      </form>

      <p className="text-sm text-muted-foreground text-center">
        no spam, just updates on our launch. unsubscribe anytime.
      </p>
    </div>
  );
}
