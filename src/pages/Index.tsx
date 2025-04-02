
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import ProductGrid from "@/components/product/ProductGrid";
import DatabaseSchema from "@/components/database/DatabaseSchema";
import { mockProducts } from "@/data/mockProducts";

const Index = () => {
  // Filter out some products to show as featured
  const featuredProducts = mockProducts
    .filter(p => p.average_rating && p.average_rating >= 4.7)
    .slice(0, 10);

  // Filter out new arrivals
  const newArrivals = [...mockProducts]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        <FeaturedCategories />
        
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <ProductGrid 
              products={featuredProducts} 
              title="Featured Products" 
            />
          </div>
        </section>
        
        <section className="py-12 bg-gray-50">
          <div className="container px-4 md:px-6">
            <ProductGrid 
              products={newArrivals} 
              title="New Arrivals" 
            />
          </div>
        </section>
        
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <DatabaseSchema />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
