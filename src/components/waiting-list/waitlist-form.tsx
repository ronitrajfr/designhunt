"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const joined = localStorage.getItem("waitlist-joined") === "true";
    if (joined) {
      setIsJoined(true);
      setMessage("You’ve already joined the waitlist!");
    }
  }, []);

  const joinWaitlist = api.waitlist.joinWaitlist.useMutation({
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: (data) => {
      setMessage(data.message);
      setEmail("");
      setIsJoined(true);
      localStorage.setItem("waitlist-joined", "true");
    },
    onError: (error) => {
      setMessage(error.message);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    joinWaitlist.mutate({ email });
  };

  if (isJoined) {
    return (
      <div className="w-full max-w-md mx-auto space-y-4">
        <p className="text-center text-base text-foreground font-medium">
          🎉 {message}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="enter your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setMessage("");
          }}
          required
          className="h-12 px-4 bg-background border-2 border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-accent border-2 border-border hover:bg-accent-foreground hover:text-primary-foreground text-accent-foreground rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
        >
          {isSubmitting ? "joining..." : "join the waitlist"}
        </Button>

        {message && (
          <p className="text-sm text-center text-muted-foreground">{message}</p>
        )}
      </form>
    </div>
  );
}
