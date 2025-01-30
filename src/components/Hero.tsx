import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-b from-primary/90 to-primary min-h-[600px] flex items-center">
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] pointer-events-none" />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fadeIn">
            Get Your £7,500 Heat Pump Grant
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fadeIn">
            Connect with trusted local contractors and access government funding for your heat pump installation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg"
              onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Check Grant Eligibility
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20"
            >
              Find Local Contractors
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;