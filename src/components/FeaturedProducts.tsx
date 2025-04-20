
import { useState, useEffect } from "react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";
import { productData } from "@/data/products";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    const featuredProducts = productData.filter(product => product.featured);
    setProducts(featuredProducts);
  }, []);

  return (
    <section className="py-16 bg-larana-beige-light">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-larana-brown-dark text-center mb-4">
          PRODUCTS
        </h2>
        <p className="text-center text-larana-brown mb-12 max-w-2xl mx-auto">
          Our collection features exquisite pieces that combine traditional craftsmanship with contemporary design
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} featured={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
