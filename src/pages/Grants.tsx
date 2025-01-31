import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { ArrowRight, PoundSterling, Home, Leaf, Calendar } from "lucide-react";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

const Grants = () => {
  const grants = [
    {
      title: "Boiler Upgrade Scheme (BUS)",
      amount: "£7,500",
      description: "Available for air source heat pump installations in England and Wales",
      icon: <PoundSterling className="w-12 h-12 text-primary" />,
    },
    {
      title: "ECO4 Scheme",
      amount: "Variable",
      description: "Support for low-income households to improve energy efficiency",
      icon: <Home className="w-12 h-12 text-primary" />,
    },
    {
      title: "Green Homes Grant Local Authority Delivery",
      amount: "Up to £10,000",
      description: "Local council support for energy-efficient home improvements",
      icon: <Leaf className="w-12 h-12 text-primary" />,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Available Grants | FindMyContractor.uk</title>
        <meta
          name="description"
          content="Discover available government grants for heat pump installations and energy-efficient home improvements in the UK."
        />
      </Helmet>

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold mb-6">Available Government Grants</h1>
            <p className="text-lg text-gray-600">
              Find out about the latest government grants and funding schemes available for heat pump installations and energy-efficient home improvements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {grants.map((grant, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="mb-6">{grant.icon}</div>
                <h3 className="text-2xl font-semibold mb-2">{grant.title}</h3>
                <p className="text-xl font-bold text-primary mb-4">{grant.amount}</p>
                <p className="text-gray-600 mb-6">{grant.description}</p>
                <Button
                  className="w-full group"
                  onClick={() => document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Check Eligibility
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-gray-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-6">Important Dates</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Calendar className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">Boiler Upgrade Scheme</h3>
                    <p className="text-gray-600">Available until April 2025</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Calendar className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">ECO4 Scheme</h3>
                    <p className="text-gray-600">Running until March 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <LeadForm />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Grants;