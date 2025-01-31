import { Helmet } from "react-helmet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Footer from "@/components/Footer";

const FAQs = () => {
  const faqs = [
    {
      question: "What is the Boiler Upgrade Scheme?",
      answer: "The Boiler Upgrade Scheme (BUS) is a government grant that provides £7,500 towards the cost of installing a heat pump in your home. It's available for properties in England and Wales, subject to certain eligibility criteria.",
    },
    {
      question: "Who is eligible for the heat pump grant?",
      answer: "To be eligible for the heat pump grant, you must be a homeowner or private landlord in England or Wales. Your property must have an valid EPC with no outstanding recommendations for loft or cavity wall insulation.",
    },
    {
      question: "How long does a heat pump installation take?",
      answer: "A typical heat pump installation takes between 2-4 days, depending on the complexity of the installation and whether any additional work is required. Our contractors will provide a detailed timeline during the initial assessment.",
    },
    {
      question: "Are your contractors certified?",
      answer: "Yes, all our contractors are MCS (Microgeneration Certification Scheme) certified. This is a requirement for accessing government grants and ensures installations meet the highest quality standards.",
    },
    {
      question: "How much can I save with a heat pump?",
      answer: "Savings vary depending on your current heating system and energy usage. Heat pumps are typically 300-400% efficient, meaning for every unit of electricity used, 3-4 units of heat are produced. Your contractor can provide specific savings estimates.",
    },
    {
      question: "What maintenance does a heat pump need?",
      answer: "Heat pumps require minimal maintenance. An annual service check is recommended to ensure optimal performance. The average lifespan of a heat pump is 20-25 years with proper maintenance.",
    },
    {
      question: "Can I get a heat pump if I live in a flat?",
      answer: "Heat pump installation in flats is possible but depends on several factors including available space for the outdoor unit and permission from the building owner. Our contractors can assess your specific situation.",
    },
    {
      question: "How do I apply for the grant?",
      answer: "The grant application process is handled by your chosen MCS-certified installer. They will apply for the grant on your behalf and deduct the amount from your installation cost. We can connect you with qualified installers in your area.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | FindMyContractor.uk</title>
        <meta
          name="description"
          content="Find answers to common questions about heat pump installations, government grants, and our contractor network."
        />
      </Helmet>

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-6">Frequently Asked Questions</h1>
            <p className="text-lg text-gray-600 text-center mb-12">
              Find answers to common questions about heat pumps, grants, and our services
            </p>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FAQs;