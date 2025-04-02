
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, Heart, Share2, Star, Truck, ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/product/ProductGrid";
import { mockProducts } from "@/data/mockProducts";
import { toast } from "@/components/ui/use-toast";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [quantity, setQuantity] = useState(1);
  
  // Find the product by ID
  const product = mockProducts.find(p => p.product_id === Number(productId));
  
  // Get related products in the same category
  const relatedProducts = mockProducts
    .filter(p => p.category === product?.category && p.product_id !== product?.product_id)
    .slice(0, 5);
  
  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product?.name} added to your cart`,
    });
  };
  
  const handleBuyNow = () => {
    toast({
      title: "Proceeding to checkout",
      description: `Preparing ${quantity} × ${product?.name} for checkout`,
    });
  };
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container py-12 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Images */}
            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden bg-white">
                <img 
                  src={product.image_url} 
                  alt={product.name}
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>
            </div>
            
            {/* Product Details */}
            <div className="md:w-1/2 space-y-6">
              <div>
                <p className="text-shop-primary font-medium mb-2">{product.category}</p>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                
                <div className="flex items-center mt-2 space-x-4">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(product.average_rating || 0) 
                            ? 'text-yellow-400 fill-yellow-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {product.average_rating} (120 reviews)
                    </span>
                  </div>
                  
                  <span className="text-sm text-gray-600">
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </div>
              </div>
              
              <div className="text-3xl font-bold text-shop-primary">
                ${product.price.toFixed(2)}
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700">{product.description}</p>
                
                {/* Quantity Selector */}
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={product.stock === 0}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={product.stock === 0 || quantity >= product.stock}
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    onClick={handleAddToCart}
                    className="bg-shop-primary hover:bg-shop-secondary text-white gap-2 flex-1"
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="h-4 w-4" /> Add to Cart
                  </Button>
                  <Button 
                    onClick={handleBuyNow}
                    className="bg-shop-accent hover:bg-shop-accent/90 text-white gap-2 flex-1"
                    disabled={product.stock === 0}
                  >
                    Buy Now
                  </Button>
                </div>
                
                <div className="flex gap-4 pt-2">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Heart className="h-4 w-4" /> Wishlist
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Share2 className="h-4 w-4" /> Share
                  </Button>
                </div>
              </div>
              
              <div className="border-t pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-shop-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Free Shipping</h4>
                    <p className="text-sm text-gray-600">Free standard shipping on orders over $50</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-shop-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Secure Payments</h4>
                    <p className="text-sm text-gray-600">We use encrypted SSL security for your transactions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Product Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="p-6 border rounded-b-md">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="font-medium">{product.category}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600">Brand:</span>
                        <span className="font-medium">ShopDB Premium</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600">Material:</span>
                        <span className="font-medium">High-Quality</span>
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="flex justify-between">
                        <span className="text-gray-600">Warranty:</span>
                        <span className="font-medium">1 Year</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600">Origin:</span>
                        <span className="font-medium">Imported</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600">SKU:</span>
                        <span className="font-medium">SKU-{product.product_id.toString().padStart(6, '0')}</span>
                      </p>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium pt-4">Description</h3>
                  <p className="text-gray-700">{product.description}</p>
                  <p className="text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, 
                    nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt,
                    nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="p-6 border rounded-b-md">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Customer Reviews</h3>
                    <Button>Write a Review</Button>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-5xl font-bold">{product.average_rating}</div>
                      <div className="flex mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < Math.floor(product.average_rating || 0) 
                                ? 'text-yellow-400 fill-yellow-400' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Based on 120 reviews</p>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center gap-2">
                          <div className="text-sm w-2">{rating}</div>
                          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-yellow-400 h-full rounded-full" 
                              style={{ 
                                width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2}%` 
                              }}
                            ></div>
                          </div>
                          <div className="text-sm text-gray-600">
                            {rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-6 pt-4">
                    {/* Sample reviews */}
                    <Card className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">John D.</h4>
                          <div className="flex items-center mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-600">2 days ago</span>
                      </div>
                      <p className="mt-2 text-gray-700">
                        Absolutely love this product! The quality is exceptional and it exceeded my expectations. 
                        Shipping was fast and the packaging was secure. Would definitely recommend!
                      </p>
                    </Card>
                    
                    <Card className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Sarah M.</h4>
                          <div className="flex items-center mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-600">1 week ago</span>
                      </div>
                      <p className="mt-2 text-gray-700">
                        Great product for the price. The material is good quality and it looks exactly like the pictures. 
                        Took off one star because shipping was a bit slow.
                      </p>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="shipping" className="p-6 border rounded-b-md">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Shipping Information</h3>
                    <p className="text-gray-700">
                      We offer various shipping options to meet your needs:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                      <li>Standard Shipping (3-5 business days) - Free on orders over $50</li>
                      <li>Express Shipping (1-2 business days) - $9.99</li>
                      <li>Same Day Delivery (select areas) - $14.99</li>
                    </ul>
                    <p className="mt-2 text-gray-700">
                      All orders are processed within 24 hours during business days.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Return Policy</h3>
                    <p className="text-gray-700">
                      We want you to be completely satisfied with your purchase. If you're not, we offer:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                      <li>30-day return window for most products</li>
                      <li>Free returns with prepaid shipping label</li>
                      <li>Full refund or exchange options</li>
                    </ul>
                    <p className="mt-2 text-gray-700">
                      Items must be returned in original condition with all packaging and tags.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Related Products */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <ProductGrid products={relatedProducts} />
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
