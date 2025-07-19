export function HeroSection() {
  return (
    <div className="flex flex-col justify-center items-center lg:items-start space-y-4 lg:space-y-8  lg:py-0 text-center lg:text-left max-md:mt-48">
      <div className="space-y-4 lg:space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight">
          showcase your craft,{" "}
          <span className="text-primary">supercharged</span>
          <br />
          and curated.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          showcase for UI and animations
        </p>
      </div>
    </div>
  );
}
