import React from "react";
import { WaitlistForm } from "@/components/waiting-list/waitlist-form";
import { Footer } from "@/components/waiting-list/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <div className="flex flex-col justify-center items-start space-y-8 py-12 lg:py-0">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight">
                your design inspiration,{" "}
                <span className="text-primary">supercharged</span>
                <br />
                and curated.
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground">
                showcase for UI and motions
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center py-12 lg:py-0">
            <div className="w-full max-w-md space-y-6">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">
                  be the first to experience designhunt
                </p>
              </div>

              <WaitlistForm />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
