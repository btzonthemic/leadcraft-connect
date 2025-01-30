import Hero from "@/components/Hero";
import LeadForm from "@/components/LeadForm";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <LeadForm />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;