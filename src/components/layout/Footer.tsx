
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t py-12 mt-16">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-shop-primary to-shop-accent bg-clip-text text-transparent">
                ShopDB
              </span>
            </Link>
            <p className="text-sm text-gray-600 max-w-xs">
              Your one-stop shop for all your needs with a powerful database backbone ensuring seamless shopping experience.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-shop-primary">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-shop-primary">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-shop-primary">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Shop Categories</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/category/electronics" className="text-sm text-gray-600 hover:text-shop-primary">Electronics</Link>
              <Link to="/category/clothing" className="text-sm text-gray-600 hover:text-shop-primary">Clothing</Link>
              <Link to="/category/home-garden" className="text-sm text-gray-600 hover:text-shop-primary">Home & Garden</Link>
              <Link to="/category/sports" className="text-sm text-gray-600 hover:text-shop-primary">Sports</Link>
              <Link to="/category/books" className="text-sm text-gray-600 hover:text-shop-primary">Books</Link>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Customer Service</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/account" className="text-sm text-gray-600 hover:text-shop-primary">My Account</Link>
              <Link to="/orders" className="text-sm text-gray-600 hover:text-shop-primary">Order Tracking</Link>
              <Link to="/faq" className="text-sm text-gray-600 hover:text-shop-primary">FAQ</Link>
              <Link to="/returns" className="text-sm text-gray-600 hover:text-shop-primary">Returns & Refunds</Link>
              <Link to="/contact" className="text-sm text-gray-600 hover:text-shop-primary">Contact Us</Link>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Newsletter</h3>
            <p className="text-sm text-gray-600">Subscribe to receive updates on new arrivals and special offers.</p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Your email" className="h-9" />
              <Button className="h-9 bg-shop-primary hover:bg-shop-secondary">Subscribe</Button>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (234) 567-8901</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@shopdb.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Commerce St, Market City</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">© 2023 ShopDB. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-gray-600 hover:text-shop-primary">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-gray-600 hover:text-shop-primary">Terms of Service</Link>
            <Link to="/cookies" className="text-sm text-gray-600 hover:text-shop-primary">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
