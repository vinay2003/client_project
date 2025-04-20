
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { 
  productData, 
  getProductsByCategory, 
  getProductsBySearch 
} from "@/data/products";
import ProductCard from "@/components/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Product } from "@/types";

// Get unique categories
const categories = Array.from(
  new Set(productData.map((product) => product.category))
);

// Get unique materials
const allMaterials = productData
  .flatMap((product) => product.materials || [])
  .filter((material): material is string => !!material);
  
const materials = Array.from(new Set(allMaterials));

// Get max price for range filter
const maxPrice = Math.ceil(
  Math.max(...productData.map((product) => product.price))
);

const ShopPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number]>([maxPrice]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("newest");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize products based on search query
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (searchQuery) {
        setProducts(getProductsBySearch(searchQuery));
      } else {
        setProducts(productData);
      }
      setIsLoading(false);
    }, 500); // Simulate loading delay
  }, [searchQuery]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products];

    // Apply category filter
    if (categoryFilter !== "all") {
      result = result.filter(
        (product) => product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Apply price filter
    result = result.filter((product) => product.price <= priceRange[0]);

    // Apply materials filter
    if (selectedMaterials.length > 0) {
      result = result.filter((product) =>
        product.materials?.some((material) =>
          selectedMaterials.includes(material)
        )
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-a-z":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-z-a":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
      default:
        result.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    setFilteredProducts(result);
  }, [products, categoryFilter, priceRange, selectedMaterials, sortOption]);

  const handleMaterialChange = (material: string, checked: boolean) => {
    if (checked) {
      setSelectedMaterials([...selectedMaterials, material]);
    } else {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== material));
    }
  };

  return (
    <div className="bg-larana-beige-light py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-serif text-larana-brown-dark mb-4 text-center">
          Shop All Jewelry
        </h1>
        {searchQuery && (
          <p className="text-center text-larana-brown mb-6">
            Showing results for: "{searchQuery}"
          </p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-12">
          {/* Filters - Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Category</h3>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-white border-larana-brown/30">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Price Range</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[maxPrice]}
                  max={maxPrice}
                  step={10}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number])}
                />
                <div className="mt-2 text-right">
                  Up to ${priceRange[0]}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Materials</h3>
              <div className="space-y-2">
                {materials.map((material) => (
                  <div key={material} className="flex items-center space-x-2">
                    <Checkbox
                      id={`material-${material}`}
                      checked={selectedMaterials.includes(material)}
                      onCheckedChange={(checked) =>
                        handleMaterialChange(material, checked === true)
                      }
                    />
                    <Label
                      htmlFor={`material-${material}`}
                      className="text-sm text-larana-brown cursor-pointer"
                    >
                      {material}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <div className="text-larana-brown">
                {filteredProducts.length} products
              </div>
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px] bg-white border-larana-brown/30">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  <SelectItem value="name-a-z">Name: A to Z</SelectItem>
                  <SelectItem value="name-z-a">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isLoading ? (
              <div className="min-h-[50vh] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-larana-brown border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-larana-brown">Loading products...</p>
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="min-h-[50vh] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-larana-brown-dark text-lg mb-4">No products found.</p>
                  <p className="text-larana-brown">
                    Try adjusting your filters or search criteria.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    featured={true}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
