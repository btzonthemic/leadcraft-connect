import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-b from-primary/90 to-primary min-h-[600px] flex items-center">
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] pointer-events-none" />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fadeIn">
            Get Your £7,500 Heat Pump Grant Today
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fadeIn">
            Connect with MCS certified local contractors and access government funding for your heat pump installation
          </p>
          <div className="flex flex-col items-center gap-6 mb-8 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white text-left">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>£7,500 Government Grant Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>MCS Certified Contractors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Free Eligibility Check</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Trusted Local Professionals</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg group"
              onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Check Grant Eligibility
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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