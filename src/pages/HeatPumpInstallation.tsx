import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Leaf, PoundSterling, ThermometerSun } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

const HeatPumpInstallation = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary/90 to-primary min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] pointer-events-none" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fadeIn">
              Switch to Energy-Efficient Heating with Our Heat Pump Experts
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fadeIn">
              Claim Your £7,500 Government Grant Today!
            </p>
            <div className="flex flex-col items-center gap-6 mb-8 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white text-left">
                <div className="flex items-center gap-2">
                  <PoundSterling className="w-5 h-5 text-accent" />
                  <span>£7,500 Government Grant Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-accent" />
                  <span>Reduce Your Carbon Footprint</span>
                </div>
                <div className="flex items-center gap-2">
                  <ThermometerSun className="w-5 h-5 text-accent" />
                  <span>Energy-Efficient Heating</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>MCS Certified Installers</span>
                </div>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg group"
              onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Check Eligibility Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose a Heat Pump?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Lower Energy Bills</h3>
              <p className="text-gray-600">Save up to 50% on your heating bills compared to traditional systems.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Eco-Friendly</h3>
              <p className="text-gray-600">Reduce your carbon footprint with renewable heating technology.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Government Support</h3>
              <p className="text-gray-600">Access £7,500 in government grants to help with installation costs.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Form */}
      <LeadForm />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HeatPumpInstallation;