
import { useState } from "react";
import { ordersData, getOrderById } from "@/data/orders";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal,
  Eye,
  File,
  Send,
  X,
  MapPin,
  CreditCard,
  Package,
  Truck,
  CheckCircle
} from "lucide-react";
import { Order } from "@/types";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { downloadInvoice } from "@/components/InvoiceGenerator";

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>(ordersData);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  
  const filteredOrders = statusFilter === "all" 
    ? orders 
    : orders.filter(order => order.status === statusFilter);
  
  const updateOrderStatus = (orderId: string, newStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled') => {
    // In a real app, this would be an API call
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: newStatus } 
        : order
    ));
    
    toast({
      title: "Order status updated",
      description: `Order ${orderId} has been updated to ${newStatus}.`
    });
  };
  
  const viewOrderDetails = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setIsOrderDetailsOpen(true);
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };
  
  const handleDownloadInvoice = (orderId: string) => {
    const order = getOrderById(orderId);
    if (order) {
      downloadInvoice(order);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <CreditCard className="h-5 w-5 text-orange-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-yellow-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif text-larana-brown-dark mb-2">Orders</h1>
        <p className="text-larana-brown">
          View and manage customer orders.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] bg-white border-larana-brown/30">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="text-larana-brown">
          Showing {filteredOrders.length} of {orders.length} orders
        </div>
      </div>
      
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Order Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      {order.customer.firstName} {order.customer.lastName}
                    </TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={`
                        ${order.status === 'delivered' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
                        ${order.status === 'shipped' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' : ''}
                        ${order.status === 'processing' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' : ''}
                        ${order.status === 'pending' ? 'bg-orange-100 text-orange-700 hover:bg-orange-100' : ''}
                        ${order.status === 'cancelled' ? 'bg-red-100 text-red-700 hover:bg-red-100' : ''}
                      `}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`
                        ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
                        ${order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' : ''}
                        ${order.paymentStatus === 'failed' ? 'bg-red-100 text-red-700 hover:bg-red-100' : ''}
                      `}>
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
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
                            onClick={() => viewOrderDetails(order.id)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="flex items-center cursor-pointer"
                            onClick={() => handleDownloadInvoice(order.id)}
                          >
                            <File className="mr-2 h-4 w-4" />
                            Download Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center cursor-pointer">
                            <Send className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => updateOrderStatus(order.id, 'processing')}
                            className="flex items-center cursor-pointer"
                            disabled={order.status === 'processing'}
                          >
                            Mark as Processing
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => updateOrderStatus(order.id, 'shipped')}
                            className="flex items-center cursor-pointer"
                            disabled={order.status === 'shipped'}
                          >
                            Mark as Shipped
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                            className="flex items-center cursor-pointer"
                            disabled={order.status === 'delivered'}
                          >
                            Mark as Delivered
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => updateOrderStatus(order.id, 'cancelled')}
                            className="flex items-center cursor-pointer text-red-600"
                            disabled={order.status === 'cancelled' || order.status === 'delivered'}
                          >
                            Cancel Order
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

      {/* Order Details Dialog */}
      {selectedOrder && (
        <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader className="flex flex-row items-center justify-between">
              <div>
                <DialogTitle className="text-xl">Order Details</DialogTitle>
                <DialogDescription>
                  Order #{selectedOrder.id} - {formatDate(selectedOrder.createdAt.toString())}
                </DialogDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="border-larana-brown text-larana-brown hover:bg-larana-beige hover:text-larana-brown-dark"
                onClick={() => handleDownloadInvoice(selectedOrder.id)}
              >
                <File className="h-4 w-4 mr-2" />
                Download Invoice
              </Button>
            </DialogHeader>

            <div className="space-y-6">
              {/* Status */}
              <div className="bg-gray-50 p-4 rounded-md flex items-center justify-between">
                <div className="flex items-center">
                  {getStatusIcon(selectedOrder.status)}
                  <span className="ml-2 font-medium capitalize">{selectedOrder.status}</span>
                </div>
                <div>
                  <Select 
                    value={selectedOrder.status}
                    onValueChange={(value: any) => {
                      updateOrderStatus(selectedOrder.id, value);
                      setSelectedOrder({
                        ...selectedOrder,
                        status: value
                      });
                    }}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Change status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Order details */}
              <div className="space-y-4">
                <h3 className="font-medium text-base">Order Items</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-md overflow-hidden mr-3">
                                <img 
                                  src={item.product.images[0]} 
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span>{item.product.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Summary */}
              <div className="flex justify-between border-t pt-4">
                <div>
                  <h3 className="font-medium text-base">Customer</h3>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>{selectedOrder.customer.firstName} {selectedOrder.customer.lastName}</p>
                    <p>{selectedOrder.customer.email}</p>
                    <p>{selectedOrder.customer.phone}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-base">Shipping Address</h3>
                  <div className="mt-2 text-sm text-gray-600">
                    <p>{selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}</p>
                    <p>{selectedOrder.shippingAddress.street}</p>
                    <p>
                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                    </p>
                    <p>{selectedOrder.shippingAddress.country}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-base">Order Summary</h3>
                  <div className="mt-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${selectedOrder.totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between font-medium text-black mt-2">
                      <span>Total:</span>
                      <span>${selectedOrder.totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-xs text-gray-500">Payment Method: {selectedOrder.paymentMethod}</span>
                    </div>
                    <div className="mt-1">
                      <Badge className={`text-xs
                        ${selectedOrder.paymentStatus === 'paid' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}
                        ${selectedOrder.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' : ''}
                        ${selectedOrder.paymentStatus === 'failed' ? 'bg-red-100 text-red-700 hover:bg-red-100' : ''}
                      `}>
                        Payment: {selectedOrder.paymentStatus}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsOrderDetailsOpen(false)}
                className="border-larana-brown text-larana-brown hover:bg-larana-beige hover:text-larana-brown-dark"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminOrders;
