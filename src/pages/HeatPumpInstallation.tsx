import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Leaf, PoundSterling, Shield, Timer } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

const HeatPumpInstallation = () => {
  const benefits = [
    {
      icon: <PoundSterling className="w-12 h-12 text-secondary" />,
      title: "£7,500 Government Grant",
      description: "Access the Boiler Upgrade Scheme funding for your heat pump installation",
    },
    {
      icon: <Shield className="w-12 h-12 text-secondary" />,
      title: "MCS Certified Installers",
      description: "All our contractors are thoroughly vetted and certified",
    },
    {
      icon: <Leaf className="w-12 h-12 text-secondary" />,
      title: "Eco-Friendly Solution",
      description: "Reduce your carbon footprint and energy bills",
    },
    {
      icon: <Timer className="w-12 h-12 text-secondary" />,
      title: "Quick Installation",
      description: "Professional installation by experienced contractors",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Heat Pump Installation - £7,500 Government Grant Available | FindMyContractor.uk</title>
        <meta
          name="description"
          content="Get up to £7,500 in government grants for your heat pump installation. Professional MCS certified installers, eco-friendly heating solutions. Check eligibility now!"
        />
        <meta
          name="keywords"
          content="heat pump installation, heat pump grant UK, £7,500 grant, MCS certified installers, eco-friendly heating, energy efficient home"
        />
      </Helmet>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary/90 to-primary min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] pointer-events-none" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fadeIn">
              Get Your £7,500 Heat Pump Grant Today
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fadeIn">
              Switch to energy-efficient heating with our MCS certified installers and access government funding
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white text-left max-w-2xl mx-auto mb-8">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>£7,500 Government Grant Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>MCS Certified Installers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Reduce Energy Bills</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>Expert Installation</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                Learn More About Heat Pumps
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Heat Pump Installation?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
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