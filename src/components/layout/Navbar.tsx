
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3); // Mock cart count
  
  const categories = [
    "Electronics", 
    "Clothing", 
    "Home & Garden", 
    "Sports", 
    "Books"
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-shop-primary to-shop-accent bg-clip-text text-transparent">
              ShopDB
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {category}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <form className="hidden md:flex items-center relative">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-64 pl-8 rounded-full bg-muted"
            />
          </form>

          <div className="flex items-center gap-2">
            <Link to="/account">
              <Button variant="ghost" size="icon" className="relative">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-shop-accent text-white"
                  >
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>

          <div className="hidden md:flex gap-2">
            <Link to="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="bg-shop-primary hover:bg-shop-secondary">Register</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute w-full bg-background border-b transition-all duration-300 ease-in-out overflow-hidden",
        isMenuOpen ? "max-h-screen py-4" : "max-h-0 py-0"
      )}>
        <div className="container space-y-4">
          <form className="flex items-center relative">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full pl-8 bg-muted"
            />
          </form>
          
          <nav className="flex flex-col gap-2">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm font-medium p-2 hover:bg-muted rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {category}
              </Link>
            ))}
          </nav>
          
          <div className="flex gap-2 pt-2 border-t">
            <Link to="/login" className="flex-1">
              <Button variant="outline" className="w-full">Login</Button>
            </Link>
            <Link to="/register" className="flex-1">
              <Button className="w-full bg-shop-primary hover:bg-shop-secondary">Register</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
