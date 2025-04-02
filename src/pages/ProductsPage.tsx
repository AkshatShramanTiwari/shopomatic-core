
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import { mockProducts } from "@/data/mockProducts";

const ProductsPage = () => {
  // We'll use the mock data for now
  const products = mockProducts;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gray-50 py-6">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold">All Products</h1>
          <p className="text-gray-600">Explore our wide range of products</p>
        </div>
      </div>
      
      <main className="flex-grow py-8">
        <div className="container px-4 md:px-6">
          <ProductGrid products={products} showFilters={true} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
