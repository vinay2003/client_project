
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { getOrderById } from "@/data/orders";
import { Order } from "@/types";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  
  useEffect(() => {
    // Get order ID from location state
    const orderId = location.state?.orderId;
    
    if (orderId) {
      const foundOrder = getOrderById(orderId);
      if (foundOrder) {
        setOrder(foundOrder);
      }
    }
  }, [location]);
  
  // If no order was found, navigate back to shop
  if (!order) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-16">
        <Card className="border-larana-brown/20 shadow-sm">
          <CardContent className="pt-6 text-center py-12">
            <CardTitle className="text-2xl font-serif text-larana-brown-dark mb-4">
              Order Not Found
            </CardTitle>
            <CardDescription className="text-lg mb-6">
              We couldn't find the order you're looking for.
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
    <div className="container max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      <Card className="border-larana-brown/20 shadow-sm">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="text-green-600 w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-serif text-larana-brown-dark">
            Thank You for Your Order!
          </CardTitle>
          <CardDescription className="text-lg">
            Your order has been received and is being processed.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-serif text-lg text-larana-brown-dark mb-2">Order Information</h3>
              <div className="space-y-1 text-larana-brown">
                <p><span className="font-medium">Order ID:</span> {order.id}</p>
                <p><span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><span className="font-medium">Payment Method:</span> {order.paymentMethod}</p>
                <p><span className="font-medium">Payment Status:</span> <span className="capitalize">{order.paymentStatus}</span></p>
              </div>
            </div>
            
            <div>
              <h3 className="font-serif text-lg text-larana-brown-dark mb-2">Shipping Information</h3>
              <div className="space-y-1 text-larana-brown">
                <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                <p>{order.shippingAddress.street}{order.shippingAddress.apartment ? `, ${order.shippingAddress.apartment}` : ''}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-serif text-lg text-larana-brown-dark mb-4">Order Summary</h3>
            <div className="border border-larana-brown/10 rounded-md overflow-hidden">
              <div className="bg-larana-beige p-4">
                <div className="grid grid-cols-3 text-larana-brown-dark font-medium">
                  <div className="col-span-2">Product</div>
                  <div className="text-right">Total</div>
                </div>
              </div>
              <div className="divide-y divide-larana-brown/10">
                {order.items.map((item, index) => (
                  <div key={index} className="p-4">
                    <div className="grid grid-cols-3">
                      <div className="col-span-2">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                            <img 
                              src={item.product.images[0]} 
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-larana-brown-dark">{item.product.name}</p>
                            <p className="text-sm text-larana-brown">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right font-medium text-larana-brown-dark">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-larana-beige p-4">
                <div className="grid grid-cols-3 text-larana-brown-dark font-bold">
                  <div className="col-span-2">Total</div>
                  <div className="text-right">${order.totalAmount.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-larana-beige-light p-6 rounded-md text-center space-y-4">
            <ShoppingBag className="w-8 h-8 text-larana-brown mx-auto" />
            <p className="text-larana-brown">
              We'll send you shipping confirmation when your order ships. Please allow 1-2 business days for processing.
            </p>
            <p className="text-larana-brown font-medium">
              Thank you for shopping with Larana Jewelry!
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            className="border-larana-brown text-larana-brown hover:bg-larana-beige hover:text-larana-brown-dark"
            onClick={() => navigate("/shop")}
          >
            Continue Shopping
          </Button>
          <Button
            className="bg-larana-brown hover:bg-larana-brown-dark text-white"
            onClick={() => window.print()}
          >
            Print Receipt
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrderConfirmation;
