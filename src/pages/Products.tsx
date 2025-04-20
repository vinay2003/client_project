
import { useState, useEffect } from "react";
import { Product } from "@/types";
import { productData } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categoryCounts = productData.reduce((acc, product) => {
  const category = product.category.toLowerCase();
  acc[category] = (acc[category] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const categories = Object.keys(categoryCounts).map(category => ({
  name: category.charAt(0).toUpperCase() + category.slice(1),
  count: categoryCounts[category]
}));

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    if (selectedCategory === "all") {
      setProducts(productData);
    } else {
      setProducts(productData.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      ));
    }
  }, [selectedCategory]);

  return (
    <div className="bg-larana-beige-light py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-serif text-larana-brown-dark mb-16 text-center">
          PRODUCTS
        </h1>
        
        {/* Category filter */}
        <Tabs defaultValue="all" onValueChange={setSelectedCategory} className="mb-12">
          <div className="flex justify-center">
            <TabsList className="bg-larana-beige">
              <TabsTrigger value="all" className="text-larana-brown data-[state=active]:bg-larana-brown data-[state=active]:text-white">
                All ({productData.length})
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.name} 
                  value={category.name.toLowerCase()}
                  className="text-larana-brown data-[state=active]:bg-larana-brown data-[state=active]:text-white"
                >
                  {category.name} ({category.count})
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} featured={true} />
              ))}
            </div>
          </TabsContent>
          
          {categories.map((category) => (
            <TabsContent key={category.name} value={category.name.toLowerCase()} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} featured={true} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ProductsPage;
