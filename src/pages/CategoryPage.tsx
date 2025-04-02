
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import { mockProducts } from "@/data/mockProducts";

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  
  // Convert categoryName from kebab-case to readable format
  const readableCategoryName = categoryName
    ?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // Filter products by category
  const categoryProducts = mockProducts.filter(
    product => product.category.toLowerCase() === readableCategoryName?.toLowerCase()
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gray-50 py-6">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold">{readableCategoryName}</h1>
          <p className="text-gray-600">
            Browse our {readableCategoryName?.toLowerCase()} collection ({categoryProducts.length} products)
          </p>
        </div>
      </div>
      
      <main className="flex-grow py-8">
        <div className="container px-4 md:px-6">
          <ProductGrid products={categoryProducts} showFilters={true} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
