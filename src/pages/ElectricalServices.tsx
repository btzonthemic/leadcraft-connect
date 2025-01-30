import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Zap, Shield, Clock, PoundSterling, ArrowRight, CheckCircle } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

const ElectricalServices = () => {
  const benefits = [
    {
      icon: <Zap className="w-12 h-12 text-secondary" />,
      title: "Expert Electrical Work",
      description: "Professional electrical services for residential and commercial needs",
    },
    {
      icon: <Shield className="w-12 h-12 text-secondary" />,
      title: "Certified Electricians",
      description: "Fully qualified and certified electrical professionals",
    },
    {
      icon: <Clock className="w-12 h-12 text-secondary" />,
      title: "Emergency Response",
      description: "Quick response for urgent electrical issues",
    },
    {
      icon: <PoundSterling className="w-12 h-12 text-secondary" />,
      title: "Fair Pricing",
      description: "Competitive rates with upfront pricing",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Professional Electrical Services | Certified Electricians</title>
        <meta
          name="description"
          content="Expert electrical services from certified professionals. Emergency response available, competitive pricing, and guaranteed workmanship."
        />
        <meta
          name="keywords"
          content="electrical services, electrician, electrical repair, electrical installation, emergency electrician"
        />
      </Helmet>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary/90 to-primary min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] pointer-events-none" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fadeIn">
              Professional Electrical Services
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fadeIn">
              Expert electrical solutions by certified professionals
            </p>
            <div className="flex flex-col items-center gap-6 mb-8 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Emergency Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Certified Electricians</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Free Estimates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span>Quality Guaranteed</span>
                </div>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg group"
              onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Request Service
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Electrical Services</h2>
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

      {/* Lead Form */}
      <LeadForm />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ElectricalServices;