import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Heater, Flame, Thermometer, ArrowRight, CheckCircle } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

const HeatingServices = () => {
  const services = [
    {
      icon: <Heater className="w-12 h-12 text-secondary" />,
      title: "Boiler Services",
      description: "Expert boiler installation, repair, and maintenance",
    },
    {
      icon: <Flame className="w-12 h-12 text-secondary" />,
      title: "Central Heating",
      description: "Complete central heating system solutions",
    },
    {
      icon: <Thermometer className="w-12 h-12 text-secondary" />,
      title: "System Upgrades",
      description: "Energy-efficient heating system upgrades",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Professional Heating Services | Expert Heating Engineers</title>
        <meta
          name="description"
          content="Comprehensive heating services including boiler repairs, central heating installation, and system upgrades. Available 24/7 for emergencies."
        />
        <meta
          name="keywords"
          content="heating engineer near me, boiler repair, central heating installation, heating services"
        />
      </Helmet>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary/90 to-primary min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] pointer-events-none" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fadeIn">
              Expert Heating Services
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fadeIn">
              Keep your home warm with our professional heating solutions
            </p>
            <div className="flex flex-col items-center gap-6 mb-8 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>24/7 Emergency Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Gas Safe Registered</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Free Estimates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>10-Year Warranty</span>
                </div>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg group"
              onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Book a Heating Engineer
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Heating Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="mb-4 flex justify-center">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-center">{service.title}</h3>
                <p className="text-gray-600 text-center">{service.description}</p>
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

export default HeatingServices;