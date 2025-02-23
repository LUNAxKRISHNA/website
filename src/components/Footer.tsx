
import { Facebook, Twitter, Instagram, Mail, Clock, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <p className="flex items-center gap-2">
                <MapPin size={18} />
                <span>123 Tech Street, Innovation City, 12345</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={18} />
                <a href="mailto:contact@example.com" className="hover:text-primary transition-colors">
                  contact@example.com
                </a>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Working Hours</h3>
            <div className="space-y-3">
              <p className="flex items-center gap-2">
                <Clock size={18} />
                <span>Monday - Friday: 9:00 AM - 6:00 PM</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock size={18} />
                <span>Saturday: 10:00 AM - 4:00 PM</span>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-primary transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-primary transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-primary transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-primary transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p>&copy; {new Date().getFullYear()} Your Organization. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
