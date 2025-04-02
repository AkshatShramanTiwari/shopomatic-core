
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { ProductType } from "@/types/product";

interface ProductCardProps {
  product: ProductType;
  variant?: "default" | "compact";
}

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const { product_id, name, price, image_url, category, stock } = product;
  
  if (variant === "compact") {
    return (
      <Link to={`/product/${product_id}`}>
        <Card className="h-full overflow-hidden product-card border-none shadow-sm">
          <div className="aspect-square relative overflow-hidden rounded-t-lg">
            <img 
              src={image_url} 
              alt={name}
              className="w-full h-full object-cover product-image transition-transform hover:scale-105"
            />
            {stock < 10 && stock > 0 && (
              <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                Low Stock: {stock}
              </span>
            )}
            {stock === 0 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-medium">Out of Stock</span>
              </div>
            )}
          </div>
          <CardContent className="p-3">
            <h3 className="font-medium text-sm line-clamp-1">{name}</h3>
            <p className="text-sm font-bold mt-1 text-shop-primary">${price.toFixed(2)}</p>
          </CardContent>
        </Card>
      </Link>
    );
  }
  
  return (
    <Card className="h-full overflow-hidden product-card">
      <Link to={`/product/${product_id}`}>
        <div className="aspect-square relative overflow-hidden rounded-t-lg">
          <img 
            src={image_url} 
            alt={name}
            className="w-full h-full object-cover product-image transition-transform hover:scale-105"
          />
          {stock < 10 && stock > 0 && (
            <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
              Low Stock: {stock}
            </span>
          )}
          {stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-medium">Out of Stock</span>
            </div>
          )}
          <Button 
            size="icon" 
            variant="ghost" 
            className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white text-gray-600 hover:text-shop-primary rounded-full"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">{category}</p>
          <Link to={`/product/${product_id}`}>
            <h3 className="font-medium hover:underline line-clamp-1">{name}</h3>
          </Link>
          <p className="font-bold text-lg text-shop-primary">${price.toFixed(2)}</p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-shop-primary hover:bg-shop-secondary gap-2 text-white"
          disabled={stock === 0}
        >
          <ShoppingCart className="h-4 w-4" /> 
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
