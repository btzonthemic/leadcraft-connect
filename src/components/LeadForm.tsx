import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    postcode: "",
    propertyType: "",
    heatingSystem: "",
    service: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send data to your backend
    console.log("Form submitted:", formData);
    toast.success("Thank you! We'll be in touch shortly.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      postcode: "",
      propertyType: "",
      heatingSystem: "",
      service: "",
    });
  };

  return (
    <div id="lead-form" className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Check Your Eligibility</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              <Input
                placeholder="Postcode"
                value={formData.postcode}
                onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                value={formData.propertyType}
                onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="detached">Detached</SelectItem>
                  <SelectItem value="semi-detached">Semi-Detached</SelectItem>
                  <SelectItem value="terraced">Terraced</SelectItem>
                  <SelectItem value="flat">Flat/Apartment</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={formData.heatingSystem}
                onValueChange={(value) => setFormData({ ...formData, heatingSystem: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Current Heating System" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gas">Gas Boiler</SelectItem>
                  <SelectItem value="oil">Oil Boiler</SelectItem>
                  <SelectItem value="electric">Electric Heating</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Select
              value={formData.service}
              onValueChange={(value) => setFormData({ ...formData, service: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Service Needed" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="heat-pump">Heat Pump Installation</SelectItem>
                <SelectItem value="plumbing">Plumbing Services</SelectItem>
                <SelectItem value="electrical">Electrical Services</SelectItem>
                <SelectItem value="heating">General Heating Services</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">
              Check Eligibility Now
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;