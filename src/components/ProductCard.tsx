
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard = ({ product, featured = false }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div 
      className={`group relative overflow-hidden ${
        featured 
          ? "rounded-lg bg-white product-card-shadow" 
          : "bg-transparent"
      } animate-fade-in hover-scale`}
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        
        <div className={`p-4 ${featured ? "bg-white" : "bg-transparent"}`}>
          <h3 className="font-serif text-xl text-larana-brown-dark tracking-wide">{product.name}</h3>
          <p className="text-larana-brown text-sm uppercase tracking-wider mt-1">{product.category}</p>
          <p className="mt-2 font-medium">${product.price.toFixed(2)}</p>
          
          <Button 
            onClick={handleAddToCart}
            variant="outline" 
            size="sm"
            className="mt-3 w-full bg-larana-beige hover:bg-larana-brown hover:text-white border-larana-brown/30 text-larana-brown-dark transition-all duration-300"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
