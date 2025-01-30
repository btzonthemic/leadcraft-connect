import { Check, Shield, Clock, Pound } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Pound className="w-10 h-10 text-secondary" />,
      title: "£7,500 Government Grant",
      description: "Access the Boiler Upgrade Scheme (BUS) funding for your heat pump installation",
    },
    {
      icon: <Shield className="w-10 h-10 text-secondary" />,
      title: "Vetted Professionals",
      description: "All contractors are thoroughly vetted and MCS certified",
    },
    {
      icon: <Check className="w-10 h-10 text-secondary" />,
      title: "Free Eligibility Check",
      description: "Quick and easy process to check if you qualify for the grant",
    },
    {
      icon: <Clock className="w-10 h-10 text-secondary" />,
      title: "Fast Response",
      description: "Get connected with local contractors within 24 hours",
    },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;