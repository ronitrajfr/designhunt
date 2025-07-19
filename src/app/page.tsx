import React from "react";
import { WaitlistForm } from "@/components/waiting-list/waitlist-form";
import { Footer } from "@/components/waiting-list/footer";
import { HeroSection } from "@/components/waiting-list/hero-section";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <HeroSection />

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
