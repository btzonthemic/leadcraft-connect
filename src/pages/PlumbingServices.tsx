import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { ShowerHead, Wrench, Droplet, ArrowRight, CheckCircle } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

const PlumbingServices = () => {
  const services = [
    {
      icon: <ShowerHead className="w-12 h-12 text-secondary" />,
      title: "Bathroom Plumbing",
      description: "Expert installation and repair of all bathroom fixtures",
    },
    {
      icon: <Wrench className="w-12 h-12 text-secondary" />,
      title: "Emergency Repairs",
      description: "24/7 emergency plumbing repair services",
    },
    {
      icon: <Droplet className="w-12 h-12 text-secondary" />,
      title: "Leak Detection",
      description: "Advanced leak detection and repair solutions",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Professional Plumbing Services | 24/7 Emergency Plumbers</title>
        <meta
          name="description"
          content="Expert plumbing services available 24/7. From emergency repairs to bathroom installations, our certified plumbers deliver reliable solutions."
        />
        <meta
          name="keywords"
          content="plumber near me, emergency plumber, plumbing services, bathroom plumbing, leak detection"
        />
      </Helmet>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary/90 to-primary min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] pointer-events-none" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fadeIn">
              Expert Plumbing Services
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fadeIn">
              Available 24/7 for all your plumbing needs
            </p>
            <div className="flex flex-col items-center gap-6 mb-8 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>24/7 Emergency Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Free Estimates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Satisfaction Guaranteed</span>
                </div>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg group"
              onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get Free Quote
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Plumbing Services</h2>
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

export default PlumbingServices;