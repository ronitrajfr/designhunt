import { WaitlistForm } from "@/components/waiting-list/waitlist-form";
import { Footer } from "@/components/waiting-list/footer";
import { HeroSection } from "@/components/waiting-list/hero-section";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background relative flex flex-col">
      <div className="flex-1 container mx-auto px-4">
        <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-screen">
          <HeroSection />
          <div className="flex flex-col justify-center items-center py-8 lg:py-0">
            <div className="w-full max-w-md space-y-6">
              <div className="hidden lg:block text-center space-y-2">
                <p className="text-muted-foreground">
                  be the first to experience designhunt
                </p>
              </div>
              <WaitlistForm />
              <p className="text-xs text-center text-muted-foreground px-4">
                no spam, just updates on our launch.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
