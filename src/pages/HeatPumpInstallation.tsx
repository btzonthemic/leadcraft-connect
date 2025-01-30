import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Leaf, BadgeCheck, PoundSterling } from "lucide-react";
import Footer from "@/components/Footer";

const HeatPumpInstallation = () => {
  const benefits = [
    {
      icon: <PoundSterling className="w-12 h-12 text-secondary" />,
      title: "£7,500 Government Grant",
      description: "Access the Boiler Upgrade Scheme funding for your installation"
    },
    {
      icon: <Leaf className="w-12 h-12 text-secondary" />,
      title: "Eco-Friendly Heating",
      description: "Reduce your carbon footprint with renewable energy"
    },
    {
      icon: <BadgeCheck className="w-12 h-12 text-secondary" />,
      title: "MCS Certified Installers",
      description: "Work with vetted and approved professionals"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Heat Pump Installation - Get Your £7,500 Grant | FindMyContractor</title>
        <meta name="description" content="Access the £7,500 government grant for heat pump installation. Connect with MCS certified installers and switch to energy-efficient heating today." />
        <meta name="keywords" content="heat pump installation, heat pump grant UK, £7,500 heat pump grant, free heat pump installation UK" />
      </Helmet>

      <div className="min-h-screen">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-white">
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
                  <span>Free Eligibility Check</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Expert Installation</span>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg group"
                onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
              >
                Check Your Eligibility Now
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
        <div id="lead-form" className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Check Your Eligibility</h2>
              <p className="text-center text-gray-600 mb-8">
                Find out if you qualify for the £7,500 government grant and get connected with local MCS certified installers.
              </p>
              {/* Reuse the existing LeadForm component */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                {/* Your existing LeadForm component will be rendered here */}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default HeatPumpInstallation;