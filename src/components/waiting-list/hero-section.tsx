export function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground leading-tight">
          your design inspiration,{" "}
          <span className="text-primary">supercharged</span>
          <br />
          and curated.
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
          be the first to experience designhunt
        </p>
      </div>
    </div>
  );
}
