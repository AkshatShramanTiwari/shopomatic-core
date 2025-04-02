
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative py-12 md:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-none">
          <svg 
            className="h-full" 
            viewBox="0 0 1024 1024" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <g opacity="0.4" filter="url(#filter0_f)">
                <circle cx="512" cy="512" r="256" fill="url(#paint0_linear)" />
              </g>
              <g opacity="0.4" filter="url(#filter1_f)">
                <circle cx="512" cy="512" r="256" fill="url(#paint1_linear)" />
              </g>
              <g opacity="0.4" filter="url(#filter2_f)">
                <circle cx="512" cy="512" r="256" fill="url(#paint2_linear)" />
              </g>
            </g>
            <defs>
              <filter id="filter0_f" filterUnits="userSpaceOnUse">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="128" result="effect1_foregroundBlur" />
              </filter>
              <filter id="filter1_f" filterUnits="userSpaceOnUse">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="128" result="effect1_foregroundBlur" />
              </filter>
              <filter id="filter2_f" filterUnits="userSpaceOnUse">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="128" result="effect1_foregroundBlur" />
              </filter>
              <linearGradient id="paint0_linear" x1="512" y1="256" x2="512" y2="768" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366F1" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient id="paint1_linear" x1="512" y1="256" x2="512" y2="768" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3B82F6" />
                <stop offset="1" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient id="paint2_linear" x1="512" y1="256" x2="512" y2="768" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366F1" />
                <stop offset="1" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
              <span className="block">Discover, Shop, Experience</span>
              <span className="bg-gradient-to-r from-shop-primary to-shop-accent bg-clip-text text-transparent">A New World of Commerce</span>
            </h1>
            <p className="text-xl text-gray-600 md:text-2xl/relaxed lg:text-3xl/relaxed max-w-xl mx-auto">
              The most reliable e-commerce platform backed by advanced database technology.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/products">
              <Button size="lg" className="bg-shop-primary hover:bg-shop-secondary text-white">
                Shop Now
              </Button>
            </Link>
            <Link to="/seller/register">
              <Button size="lg" variant="outline">
                Become a Seller
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-8">
            <div className="flex flex-col items-center space-y-2">
              <div className="text-3xl font-bold text-shop-primary">10k+</div>
              <div className="text-sm text-gray-600">Products</div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="text-3xl font-bold text-shop-primary">5k+</div>
              <div className="text-sm text-gray-600">Sellers</div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="text-3xl font-bold text-shop-primary">15k+</div>
              <div className="text-sm text-gray-600">Customers</div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="text-3xl font-bold text-shop-primary">99%</div>
              <div className="text-sm text-gray-600">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
