
import { useState, useRef } from "react";
import { productData } from "@/data/products";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  X,
  Upload
} from "lucide-react";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>(productData);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("/lovable-uploads/c3684644-780f-40ad-ae4f-e43a82fc4117.png");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    category: "",
    subcategory: "",
    price: 0,
    description: "",
    images: ["/lovable-uploads/c3684644-780f-40ad-ae4f-e43a82fc4117.png"],
    inStock: true,
    materials: [],
  });
  
  const handleDelete = (id: string) => {
    // In a real app, this would be an API call
    setProducts(products.filter(product => product.id !== id));
    toast({
      title: "Product deleted",
      description: "The product has been successfully deleted."
    });
  };
  
  const handleToggleStock = (id: string) => {
    // In a real app, this would be an API call
    setProducts(products.map(product => 
      product.id === id 
        ? { ...product, inStock: !product.inStock } 
        : product
    ));
    
    const product = products.find(p => p.id === id);
    toast({
      title: `Product ${product?.inStock ? "out of stock" : "in stock"}`,
      description: `${product?.name} is now ${product?.inStock ? "out of stock" : "in stock"}.`
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value
    }));
  };

  const handleSelectChange = (name: string, value: string | boolean) => {
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMaterialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const materials = e.target.value.split(',').map(m => m.trim()).filter(m => m !== "");
    setNewProduct(prev => ({
      ...prev,
      materials
    }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // In a real app, this would upload the image to a server
      // For this demo, we'll just use a sample image from our assets
      const randomImage = [
        "/lovable-uploads/c3684644-780f-40ad-ae4f-e43a82fc4117.png",
        "/lovable-uploads/d1af56b5-0c12-419a-b847-575c1e2571b2.png",
        "/lovable-uploads/1153e8d2-910b-4c93-b132-28385408cbd2.png",
        "/lovable-uploads/86c7d370-4af7-4b10-93cc-5d547d6aeb26.png",
        "/lovable-uploads/a7474309-14f0-4925-a566-78e2c597dcd6.png"
      ][Math.floor(Math.random() * 5)];
      
      setSelectedImage(randomImage);
      
      setNewProduct(prev => ({
        ...prev,
        images: [randomImage]
      }));
      
      toast({
        title: "Image uploaded",
        description: "The image has been successfully uploaded."
      });
    }
  };

  const handleAddProduct = () => {
    // Validation
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      toast({
        title: "Validation error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Generate a new ID (in a real app, this would come from the server)
    const newId = (parseInt(products[products.length - 1].id) + 1).toString();
    
    const productToAdd: Product = {
      id: newId,
      name: newProduct.name || "",
      category: newProduct.category || "",
      subcategory: newProduct.subcategory || "",
      price: newProduct.price || 0,
      description: newProduct.description || "",
      images: newProduct.images || ["/lovable-uploads/c3684644-780f-40ad-ae4f-e43a82fc4117.png"],
      inStock: newProduct.inStock !== undefined ? newProduct.inStock : true,
      materials: newProduct.materials || [],
      createdAt: new Date().toISOString()
    };
    
    // Add to products list (in a real app, this would be an API call)
    setProducts([...products, productToAdd]);
    
    // Reset form and close dialog
    setNewProduct({
      name: "",
      category: "",
      subcategory: "",
      price: 0,
      description: "",
      images: ["/lovable-uploads/c3684644-780f-40ad-ae4f-e43a82fc4117.png"],
      inStock: true,
      materials: [],
    });
    setSelectedImage("/lovable-uploads/c3684644-780f-40ad-ae4f-e43a82fc4117.png");
    setIsAddProductOpen(false);
    
    toast({
      title: "Product added",
      description: "The product has been successfully added."
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-larana-brown-dark mb-2">Products</h1>
          <p className="text-larana-brown">
            Manage your product inventory and details.
          </p>
        </div>
        <Button 
          className="bg-larana-brown hover:bg-larana-brown-dark text-white"
          onClick={() => setIsAddProductOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>
      
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-md overflow-hidden mr-3">
                          <img 
                            src={product.images[0]} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span>{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {product.category}
                      {product.subcategory && (
                        <span className="text-xs text-larana-brown ml-1">
                          ({product.subcategory})
                        </span>
                      )}
                    </TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={product.inStock ? "default" : "secondary"} className={
                        product.inStock 
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-red-100 text-red-700 hover:bg-red-100"
                      }>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            className="flex items-center cursor-pointer"
                            onClick={() => window.open(`/products/${product.id}`, '_blank')}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center cursor-pointer">
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="flex items-center cursor-pointer"
                            onClick={() => handleToggleStock(product.id)}
                          >
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            {product.inStock ? "Mark as Out of Stock" : "Mark as In Stock"}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="flex items-center text-red-600 cursor-pointer"
                            onClick={() => handleDelete(product.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Product Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new product to your inventory.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={newProduct.name} 
                  onChange={handleInputChange} 
                  placeholder="Gold Chain Necklace" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price ($) *</Label>
                <Input 
                  id="price" 
                  name="price" 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  value={newProduct.price || ''} 
                  onChange={handleInputChange} 
                  placeholder="129.99" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange("category", value)}
                  value={newProduct.category}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Necklace">Necklace</SelectItem>
                    <SelectItem value="Bracelet">Bracelet</SelectItem>
                    <SelectItem value="Earring">Earring</SelectItem>
                    <SelectItem value="Ring">Ring</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subcategory">Subcategory</Label>
                <Input 
                  id="subcategory" 
                  name="subcategory" 
                  value={newProduct.subcategory || ''} 
                  onChange={handleInputChange} 
                  placeholder="Chain" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={newProduct.description} 
                onChange={handleInputChange} 
                placeholder="Elegant gold chain necklace..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Product Image</Label>
              <div 
                className="border-2 border-dashed border-larana-brown/20 rounded-md p-4 text-center cursor-pointer hover:bg-larana-beige-light transition-colors"
                onClick={handleImageClick}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageChange}
                />
                
                {selectedImage ? (
                  <div className="relative inline-block">
                    <img 
                      src={selectedImage} 
                      alt="Product" 
                      className="w-32 h-32 object-cover mx-auto rounded-md"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 rounded-md transition-opacity">
                      <Upload className="w-8 h-8 text-white" />
                    </div>
                  </div>
                ) : (
                  <div className="py-4">
                    <Upload className="w-8 h-8 text-larana-brown/50 mx-auto mb-2" />
                    <p className="text-larana-brown">Click to upload an image</p>
                  </div>
                )}
                
                <p className="text-xs text-larana-brown/70 mt-2">
                  Recommended size: 800x800px. Max file size: 5MB.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="materials">Materials (comma separated)</Label>
                <Input 
                  id="materials" 
                  name="materials" 
                  value={newProduct.materials?.join(', ') || ''} 
                  onChange={handleMaterialsChange} 
                  placeholder="18k Gold Plated, Stainless Steel" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inStock">Availability</Label>
                <Select 
                  onValueChange={(value) => handleSelectChange("inStock", value === "true")}
                  value={newProduct.inStock ? "true" : "false"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">In Stock</SelectItem>
                    <SelectItem value="false">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddProductOpen(false)}
              className="border-larana-brown text-larana-brown hover:bg-larana-beige hover:text-larana-brown-dark"
            >
              Cancel
            </Button>
            <Button 
              className="bg-larana-brown hover:bg-larana-brown-dark text-white"
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
