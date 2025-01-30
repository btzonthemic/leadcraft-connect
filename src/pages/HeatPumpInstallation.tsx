import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Heater, Leaf, Home, ArrowRight, CheckCircle } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

const HeatPumpInstallation = () => {
  const benefits = [
    {
      icon: <Heater className="w-12 h-12 text-secondary" />,
      title: "Energy Efficient",
      description: "Reduce your energy bills with a modern heat pump system",
    },
    {
      icon: <Leaf className="w-12 h-12 text-secondary" />,
      title: "Eco-Friendly",
      description: "Lower your carbon footprint with renewable heating technology",
    },
    {
      icon: <Home className="w-12 h-12 text-secondary" />,
      title: "Home Value",
      description: "Increase your property value with modern heating solutions",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Heat Pump Installation | £7,500 Government Grant Available</title>
        <meta
          name="description"
          content="Professional heat pump installation services with access to £7,500 government grants. Expert installation, energy savings, and eco-friendly heating solutions."
        />
        <meta
          name="keywords"
          content="heat pump installation, heat pump grant, renewable heating, energy efficient heating, government grants heating"
        />
      </Helmet>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary/90 to-primary min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] pointer-events-none" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fadeIn">
              Professional Heat Pump Installation
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fadeIn">
              Access £7,500 in government grants and switch to efficient, eco-friendly heating
            </p>
            <div className="flex flex-col items-center gap-6 mb-8 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>£7,500 Government Grant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>MCS Certified Installation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Free Home Assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Expert Installation Team</span>
                </div>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg group"
              onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Check Your Eligibility
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Heat Pump Installation?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="mb-4 flex justify-center">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-center">{benefit.title}</h3>
                <p className="text-gray-600 text-center">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lead Form Section */}
      <LeadForm />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default HeatPumpInstallation;