import { Helmet } from "react-helmet";
import { Building2, Users, Award, History } from "lucide-react";
import Footer from "@/components/Footer";

const About = () => {
  const features = [
    {
      icon: <Building2 className="w-12 h-12 text-primary" />,
      title: "Established Excellence",
      description: "Over a decade of experience in connecting homeowners with qualified contractors",
    },
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "Trusted Network",
      description: "Network of vetted, MCS-certified contractors across the UK",
    },
    {
      icon: <Award className="w-12 h-12 text-primary" />,
      title: "Quality Assured",
      description: "Rigorous vetting process ensures only the best contractors join our network",
    },
    {
      icon: <History className="w-12 h-12 text-primary" />,
      title: "Proven Track Record",
      description: "Thousands of successful installations and satisfied customers",
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | FindMyContractor.uk</title>
        <meta
          name="description"
          content="Learn about FindMyContractor.uk's mission to connect homeowners with trusted contractors and facilitate access to government grants."
        />
      </Helmet>

      <div className="pt-24 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-bold mb-6">About FindMyContractor.uk</h1>
            <p className="text-lg text-gray-600">
              We're dedicated to making home improvements easier and more accessible by connecting homeowners with trusted contractors and simplifying access to government grants.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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

          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              At FindMyContractor.uk, we believe that transitioning to sustainable home energy solutions should be accessible to everyone. Our platform simplifies the process of finding qualified contractors and accessing government grants, making it easier for homeowners to make environmentally conscious choices.
            </p>
            <p className="text-lg text-gray-600">
              We work exclusively with MCS-certified contractors who meet our strict quality standards, ensuring that every installation is completed to the highest professional standards. Our commitment to excellence has made us a trusted partner for thousands of homeowners across the UK.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;