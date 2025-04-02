
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1593344484962-796055d4a3a4?q=80&w=1974&auto=format&fit=crop",
    count: 432,
  },
  {
    id: 2,
    name: "Clothing",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop",
    count: 612,
  },
  {
    id: 3,
    name: "Home & Garden",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1780&auto=format&fit=crop",
    count: 324,
  },
  {
    id: 4,
    name: "Sports",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop",
    count: 218,
  },
  {
    id: 5,
    name: "Books",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=2070&auto=format&fit=crop",
    count: 519,
  },
];

export function FeaturedCategories() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <h2 className="text-3xl font-bold tracking-tighter">Shop by Category</h2>
          <p className="text-gray-600 max-w-[700px]">
            Explore our wide range of products across different categories
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link key={category.id} to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <Card className="overflow-hidden product-card h-full border-none shadow-sm">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <div className="text-white">
                      <h3 className="font-medium">{category.name}</h3>
                      <p className="text-sm text-gray-200">{category.count} products</p>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCategories;
