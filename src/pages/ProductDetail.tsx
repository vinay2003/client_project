
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Product } from "@/types";
import { getProductById, getRelatedProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import { ShoppingBag, ChevronLeft, Minus, Plus } from "lucide-react";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const { addToCart } = useCart();
  
  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedImage(foundProduct.images[0]);
        setRelatedProducts(getRelatedProducts(id));
      }
    }
    
    // Reset quantity when product changes
    setQuantity(1);
    
    // Scroll to top when navigating to a new product
    window.scrollTo(0, 0);
  }, [id]);
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-larana-brown border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-larana-brown">Loading product...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-larana-beige-light py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link to="/products" className="flex items-center text-larana-brown hover:text-larana-brown-dark transition-colors">
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back to Products
          </Link>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover animate-fade-in"
              />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`w-24 h-24 rounded-md overflow-hidden border-2 transition-all ${
                    selectedImage === image
                      ? "border-larana-brown scale-105"
                      : "border-transparent hover:border-larana-brown/50"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl text-larana-brown-dark">{product.name}</h1>
              <p className="text-larana-brown mt-2 text-lg uppercase tracking-wider">{product.category}</p>
            </div>
            
            <div className="text-2xl font-medium">${product.price.toFixed(2)}</div>
            
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-larana-brown-dark/80">{product.description}</p>
            </div>
            
            {product.details && (
              <div>
                <h3 className="font-medium mb-2">Details</h3>
                <ul className="list-disc list-inside text-larana-brown-dark/80 space-y-1">
                  {product.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {product.materials && (
              <div>
                <h3 className="font-medium mb-2">Materials</h3>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((material, idx) => (
                    <span 
                      key={idx}
                      className="inline-block px-3 py-1 rounded-full bg-larana-beige text-larana-brown-dark text-sm"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="pt-4">
              <div className="flex items-center mb-6">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 flex items-center justify-center rounded-l-md bg-larana-beige border border-larana-brown/30 text-larana-brown-dark hover:bg-larana-brown hover:text-white transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <div className="w-16 h-10 flex items-center justify-center border-y border-larana-brown/30 bg-white">
                  {quantity}
                </div>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 flex items-center justify-center rounded-r-md bg-larana-beige border border-larana-brown/30 text-larana-brown-dark hover:bg-larana-brown hover:text-white transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <Button
                onClick={handleAddToCart}
                className="w-full bg-larana-brown hover:bg-larana-brown-dark text-white py-6 text-lg"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="font-serif text-2xl md:text-3xl text-larana-brown-dark mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} featured={true} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
