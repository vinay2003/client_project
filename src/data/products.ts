
import { Product } from "@/types";

export const productData: Product[] = [
  {
    id: "1",
    name: "Gold Chain Necklace",
    category: "Necklace",
    subcategory: "Chain",
    price: 129.99,
    description: "Elegant gold chain necklace with pendant disc, perfect for everyday wear.",
    details: [
      "18k gold plated",
      "Pendant: 15mm diameter",
      "Chain length: 18 inches",
      "Lobster clasp closure"
    ],
    images: [
      "/image/img1.png",
      "/image/img2.png",
    ],
    featured: true,
    inStock: true,
    materials: ["18k Gold Plated", "Stainless Steel"],
    createdAt: "2023-05-15T10:30:00.000Z"
  },
  {
    id: "2",
    name: "Layered Chain Necklace",
    category: "Necklace",
    subcategory: "Layered",
    price: 159.99,
    description: "Stunning layered chain necklace with pendant discs, adds elegance to any outfit.",
    details: [
      "18k gold plated",
      "Multiple pendants on different chains",
      "Chain lengths: 16, 18 and 20 inches",
      "Lobster clasp closure"
    ],
    images: [
     "/image/img3.png",
      "/image/img4.png",
    ],
    featured: true,
    inStock: true,
    materials: ["18k Gold Plated", "Brass"],
    createdAt: "2023-05-20T14:45:00.000Z"
  },
  {
    id: "3",
    name: "Twisted Gold Bracelet",
    category: "Bracelet",
    subcategory: "Bangle",
    price: 99.99,
    description: "Sophisticated twisted gold bracelet that adds a touch of luxury to your wrist.",
    details: [
      "18k gold plated",
      "Inner diameter: 2.5 inches",
      "Width: 6mm",
      "Toggle clasp"
    ],
    images: [
      "/image/img2.png",
      "/image/img4.png",
    ],
    featured: true,
    inStock: true,
    materials: ["18k Gold Plated", "Brass", "Cubic Zirconia"],
    createdAt: "2023-06-01T09:15:00.000Z"
  },
  {
    id: "4",
    name: "Curved Hoop Earrings",
    category: "Earring",
    subcategory: "Hoop",
    price: 79.99,
    description: "Modern curved hoop earrings that make a bold statement with any look.",
    details: [
      "18k gold plated",
      "Diameter: 30mm",
      "Post back closure",
      "Nickel-free"
    ],
    images: [
      "/image/img1.png",
      "/image/img3.png",
    ],
    featured: true,
    inStock: true,
    materials: ["18k Gold Plated", "Stainless Steel"],
    createdAt: "2023-06-15T11:30:00.000Z"
  },
  {
    id: "5",
    name: "Pearl Statement Necklace",
    category: "Necklace",
    subcategory: "Statement",
    price: 199.99,
    description: "Luxurious pearl statement necklace that brings timeless elegance to special occasions.",
    details: [
      "Freshwater pearls",
      "18k gold plated chain",
      "Length: 16 inches with 2-inch extender",
      "Lobster clasp closure"
    ],
    images: [
      "/image/img3.png",
      "/image/img2.png",
    ],
    featured: false,
    inStock: true,
    materials: ["Freshwater Pearls", "18k Gold Plated"],
    createdAt: "2023-07-01T15:00:00.000Z"
  },
  {
    id: "6",
    name: "Stacking Gold Rings Set",
    category: "Ring",
    subcategory: "Stacking",
    price: 149.99,
    description: "Set of three stacking gold rings, perfect for mixing and matching.",
    details: [
      "18k gold plated",
      "Available sizes: 5-9",
      "Band width: 2mm each",
      "Sold as a set of 3"
    ],
    images: [
      "/image/img3.png",
      "/image/img4.png",
    ],
    featured: false,
    inStock: true,
    materials: ["18k Gold Plated", "Brass"],
    createdAt: "2023-07-15T10:30:00.000Z"
  },
  {
    id: "7",
    name: "Crystal Tennis Bracelet",
    category: "Bracelet",
    subcategory: "Tennis",
    price: 189.99,
    description: "Dazzling crystal tennis bracelet that adds sparkle to any occasion.",
    details: [
      "18k gold plated",
      "Length: 7 inches with 1-inch extender",
      "Cubic zirconia crystals",
      "Box clasp with safety latch"
    ],
    images: [
      "/image/img3.png",
      "/image/img4.png",
    ],
    featured: false,
    inStock: true,
    materials: ["18k Gold Plated", "Cubic Zirconia"],
    createdAt: "2023-08-01T09:45:00.000Z"
  },
  {
    id: "8",
    name: "Sapphire Drop Earrings",
    category: "Earring",
    subcategory: "Drop",
    price: 229.99,
    description: "Elegant sapphire drop earrings that add a touch of color to your ensemble.",
    details: [
      "18k gold plated",
      "Length: 1.5 inches",
      "Lab-created sapphires",
      "French wire hooks"
    ],
    images: [
      "/image/img3.png",
      "/image/img4.png",
    ],
    featured: false,
    inStock: true,
    materials: ["18k Gold Plated", "Lab-created Sapphires"],
    createdAt: "2023-08-15T14:15:00.000Z"
  },
  {
    id: "9",
    name: "Minimalist Bar Necklace",
    category: "Necklace",
    subcategory: "Pendant",
    price: 89.99,
    description: "Simple yet elegant minimalist bar necklace, perfect for layering.",
    details: [
      "18k gold plated",
      "Bar length: 1.5 inches",
      "Chain length: 18 inches with 2-inch extender",
      "Spring ring clasp"
    ],
    images: [
      "/image/img3.png",
      "/image/img4.png",
    ],
    featured: false,
    inStock: true,
    materials: ["18k Gold Plated", "Stainless Steel"],
    createdAt: "2023-09-01T11:00:00.000Z"
  },
  {
    id: "10",
    name: "Rose Gold Heart Ring",
    category: "Ring",
    subcategory: "Statement",
    price: 119.99,
    description: "Charming rose gold heart ring that symbolizes love and affection.",
    details: [
      "Rose gold plated",
      "Available sizes: A-Z",
      "Heart dimensions: 10mm x 10mm",
      "Band width: 2mm"
    ],
    images: [
      "/image/img3.png",
      "/image/img4.png",
    ],
    featured: false,
    inStock: true,
    materials: ["Rose Gold Plated", "Brass", "Cubic Zirconia"],
    createdAt: "2023-09-15T15:30:00.000Z"
  },
  {
    id: "11",
    name: "Diamond Stud Earrings",
    category: "Earring",
    subcategory: "Stud",
    price: 299.99,
    description: "Classic diamond stud earrings that never go out of style.",
    details: [
      "14k solid gold",
      "0.25 carat lab-grown diamonds",
      "4-prong setting",
      "Push back closure"
    ],
    images: [
      "/image/img3.png",
      "/image/img4.png",
    ],
    featured: false,
    inStock: true,
    materials: ["14k Solid Gold", "Lab-grown Diamonds"],
    createdAt: "2023-10-01T10:00:00.000Z"
  },
  {
    id: "12",
    name: "Infinity Charm Bracelet",
    category: "Bracelet",
    subcategory: "Charm",
    price: 109.99,
    description: "Meaningful infinity charm bracelet that represents endless love and possibilities.",
    details: [
      "18k gold plated",
      "Length: 7 inches with 1.5-inch extender",
      "Infinity charm: 15mm x 8mm",
      "Lobster clasp closure"
    ],
    images: [
      "/image/img3.png",
      "/image/img4.png",
    ],
    featured: false,
    inStock: true,
    materials: ["18k Gold Plated", "Stainless Steel"],
    createdAt: "2023-10-15T13:45:00.000Z"
  }
];

export const getProductById = (id: string): Product | undefined => {
  return productData.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return productData.filter(product => product.category.toLowerCase() === category.toLowerCase());
};

export const getProductsBySearch = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return productData.filter(product => 
    product.name.toLowerCase().includes(searchTerm) || 
    product.category.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm)
  );
};

export const getRelatedProducts = (productId: string, limit = 4): Product[] => {
  const currentProduct = getProductById(productId);
  if (!currentProduct) return [];
  
  return productData
    .filter(product => 
      product.id !== productId && 
      product.category === currentProduct.category
    )
    .slice(0, limit);
};
