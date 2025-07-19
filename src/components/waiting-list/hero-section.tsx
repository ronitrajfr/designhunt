export function HeroSection() {
  return (
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
  );
}
