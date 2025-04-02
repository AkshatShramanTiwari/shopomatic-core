
import { useState } from "react";
import ProductCard from "./ProductCard";
import { ProductType } from "@/types/product";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductGridProps {
  products: ProductType[];
  title?: string;
  showFilters?: boolean;
}

export function ProductGrid({ products, title, showFilters = false }: ProductGridProps) {
  const [sortOption, setSortOption] = useState("featured");
  const [page, setPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const productsPerPage = 12;
  const totalPages = Math.ceil(products.length / productsPerPage);
  
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    // Default: featured
    return 0;
  });
  
  const currentProducts = sortedProducts.slice(
    (page - 1) * productsPerPage, 
    page * productsPerPage
  );
  
  const categories = Array.from(new Set(products.map(p => p.category)));
  
  const priceRanges = [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 - $500", min: 200, max: 500 },
    { label: "Over $500", min: 500, max: Infinity },
  ];
  
  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}
      
      {showFilters && (
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Mobile Filters Button */}
          <Button 
            variant="outline" 
            onClick={() => setShowMobileFilters(!showMobileFilters)} 
            className="md:hidden flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          
          {/* Filters - Mobile */}
          <div className={`md:hidden ${showMobileFilters ? 'block' : 'hidden'} mb-4 border rounded-lg p-4`}>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="category">
                <AccordionTrigger>Category</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={`mobile-category-${category}`} 
                          className="mr-2"
                        />
                        <label htmlFor={`mobile-category-${category}`}>{category}</label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="price">
                <AccordionTrigger>Price Range</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {priceRanges.map(range => (
                      <div key={range.label} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={`mobile-price-${range.label}`} 
                          className="mr-2"
                        />
                        <label htmlFor={`mobile-price-${range.label}`}>{range.label}</label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="availability">
                <AccordionTrigger>Availability</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="mobile-in-stock" 
                        className="mr-2"
                      />
                      <label htmlFor="mobile-in-stock">In Stock</label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="mobile-out-of-stock" 
                        className="mr-2"
                      />
                      <label htmlFor="mobile-out-of-stock">Out of Stock</label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          {/* Filters - Desktop */}
          <div className="hidden md:block w-1/4 min-w-[200px] border rounded-lg p-4 h-fit">
            <h3 className="font-medium mb-4">Filters</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Category</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`category-${category}`} 
                        className="mr-2"
                      />
                      <label htmlFor={`category-${category}`} className="text-sm">{category}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Price Range</h4>
                <div className="space-y-2">
                  {priceRanges.map(range => (
                    <div key={range.label} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`price-${range.label}`} 
                        className="mr-2"
                      />
                      <label htmlFor={`price-${range.label}`} className="text-sm">{range.label}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Availability</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="in-stock" 
                      className="mr-2"
                    />
                    <label htmlFor="in-stock" className="text-sm">In Stock</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="out-of-stock" 
                      className="mr-2"
                    />
                    <label htmlFor="out-of-stock" className="text-sm">Out of Stock</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`${showFilters ? 'md:w-3/4' : 'w-full'} space-y-6`}>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">
                Showing <span className="font-medium">{currentProducts.length}</span> of{" "}
                <span className="font-medium">{products.length}</span> products
              </p>
              
              <Select
                value={sortOption}
                onValueChange={setSortOption}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentProducts.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Show pages around the current page
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={page === pageNum ? "default" : "outline"}
                        size="icon"
                        onClick={() => setPage(pageNum)}
                        className={`w-8 h-8 ${page === pageNum ? 'bg-shop-primary hover:bg-shop-secondary' : ''}`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {!showFilters && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard key={product.product_id} product={product} variant="compact" />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductGrid;
