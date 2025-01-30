import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">FindMyContractor.uk</h3>
            <p className="text-gray-400">
              Connecting homeowners with trusted contractors and government grants
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  For Contractors
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Heat Pump Grants
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Heat Pump Installation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Plumbing Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Electrical Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Heating Services
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FindMyContractor.uk. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;