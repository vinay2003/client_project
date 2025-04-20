
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Trash, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, subtotal } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  
  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };
  
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };
  
  const handleApplyPromo = () => {
    if (promoCode.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter a promo code",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Invalid promo code",
      description: "The promo code you entered is invalid or has expired.",
      variant: "destructive",
    });
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-16">
        <Card className="border-larana-brown/20 shadow-sm">
          <CardContent className="pt-6 text-center py-12">
            <div className="mx-auto w-16 h-16 bg-larana-beige rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="text-larana-brown w-8 h-8" />
            </div>
            <CardTitle className="text-2xl font-serif text-larana-brown-dark mb-2">
              Your Cart is Empty
            </CardTitle>
            <CardDescription className="text-lg mb-6">
              Add some beautiful pieces to your cart and start your jewelry journey.
            </CardDescription>
            <Button
              className="bg-larana-brown hover:bg-larana-brown-dark text-white"
              onClick={() => navigate("/shop")}
            >
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container max-w-6xl mx-auto px-4 py-16 animate-fade-in">
      <h1 className="text-3xl font-serif text-larana-brown-dark mb-2">Your Cart</h1>
      <p className="text-larana-brown mb-8">Review your items and proceed to checkout.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="border-larana-brown/20 shadow-sm">
            <CardHeader>
              <CardTitle>Cart Items</CardTitle>
              <CardDescription>
                You have {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-larana-brown/10">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="font-medium text-larana-brown-dark">{item.product.name}</h3>
                        <p className="text-sm text-larana-brown">{item.product.category}</p>
                      </div>
                      
                      <div className="flex items-center border border-larana-brown/20 rounded-md">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-larana-brown"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-larana-brown"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="text-right w-20">
                        <p className="font-medium text-larana-brown-dark">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemoveItem(item.product.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between flex-wrap gap-4 pt-4">
              <Button 
                variant="outline" 
                className="border-larana-brown text-larana-brown hover:bg-larana-beige"
                onClick={() => navigate("/shop")}
              >
                Continue Shopping
              </Button>
              <Button 
                variant="ghost" 
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={() => clearCart()}
              >
                Clear Cart
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="border-larana-brown/20 shadow-sm sticky top-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-larana-brown">Subtotal</span>
                  <span className="font-medium text-larana-brown-dark">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-larana-brown">Shipping</span>
                  <span className="font-medium text-larana-brown-dark">Free</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Input 
                    placeholder="Promo Code" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <Button 
                    variant="outline"
                    className="border-larana-brown text-larana-brown hover:bg-larana-beige whitespace-nowrap"
                    onClick={handleApplyPromo}
                  >
                    Apply
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-medium">
                  <span className="text-larana-brown-dark">Total</span>
                  <span className="text-larana-brown-dark">${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-larana-brown hover:bg-larana-brown-dark text-white"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
