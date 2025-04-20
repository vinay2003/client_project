
import { useState } from "react";
import { customersData } from "@/data/customers";
import { getOrdersByCustomer } from "@/data/orders";
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
  MoreHorizontal,
  Eye,
  Mail,
  Phone,
  MapPin,
  X,
  Package,
  Calendar
} from "lucide-react";
import { Customer } from "@/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminCustomers = () => {
  const [customers] = useState<Customer[]>(customersData);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const viewCustomerDetails = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    if (customer) {
      setSelectedCustomer(customer);
      setIsDetailsOpen(true);
    }
  };
  
  const sendEmail = (email: string) => {
    // In a real app, this would open an email form or trigger an email API
    toast({
      title: "Email action",
      description: `Preparing to send email to ${email}`
    });
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif text-larana-brown-dark mb-2">Customers</h1>
        <p className="text-larana-brown">
          Manage customer information and activity.
        </p>
      </div>
      
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => {
                  const customerOrders = getOrdersByCustomer(customer.id);
                  
                  return (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">
                        {customer.firstName} {customer.lastName}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-larana-brown" />
                          {customer.email}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-larana-brown" />
                          {customer.phone}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-larana-brown" />
                          {customer.addresses && customer.addresses[0].city}, {customer.addresses && customer.addresses[0].state}
                        </div>
                      </TableCell>
                      <TableCell>{customerOrders.length}</TableCell>
                      <TableCell>
                        {new Date(customer.createdAt).toLocaleDateString()}
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
                              onClick={() => viewCustomerDetails(customer.id)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="flex items-center cursor-pointer"
                              onClick={() => sendEmail(customer.email)}
                            >
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="flex items-center cursor-pointer"
                              onClick={() => viewCustomerDetails(customer.id)}
                            >
                              <MapPin className="mr-2 h-4 w-4" />
                              View Address
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Customer Details Dialog */}
      {selectedCustomer && (
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader className="flex flex-row items-center justify-between">
              <div>
                <DialogTitle className="text-xl">Customer Details</DialogTitle>
                <DialogDescription>
                  Detailed information for {selectedCustomer.firstName} {selectedCustomer.lastName}
                </DialogDescription>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => setIsDetailsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>

            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="address">Address</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">Customer ID</h3>
                    <p className="text-base font-medium">{selectedCustomer.id}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">Customer Since</h3>
                    <p className="text-base font-medium">{formatDate(selectedCustomer.createdAt.toString())}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">Name</h3>
                    <p className="text-base font-medium">
                      {selectedCustomer.firstName} {selectedCustomer.lastName}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="text-base font-medium">{selectedCustomer.email}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                    <p className="text-base font-medium">{selectedCustomer.phone}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                    <p className="text-base font-medium">
                      {getOrdersByCustomer(selectedCustomer.id).length}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button 
                    onClick={() => sendEmail(selectedCustomer.email)}
                    className="bg-larana-brown hover:bg-larana-brown-dark text-white"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="orders" className="space-y-4 mt-4">
                {getOrdersByCustomer(selectedCustomer.id).length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getOrdersByCustomer(selectedCustomer.id).map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{formatDate(order.createdAt.toString())}</TableCell>
                            <TableCell>
                              <span className="capitalize">{order.status}</span>
                            </TableCell>
                            <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-larana-brown text-larana-brown hover:bg-larana-beige hover:text-larana-brown-dark"
                                onClick={() => {
                                  // In a real app, this would download the invoice
                                  const orderDate = new Date(order.createdAt);
                                  const filename = `Invoice_${order.id}_${orderDate.getFullYear()}${String(orderDate.getMonth() + 1).padStart(2, '0')}${String(orderDate.getDate()).padStart(2, '0')}.pdf`;
                                  
                                  toast({
                                    title: "Invoice downloaded",
                                    description: `${filename} has been downloaded.`
                                  });
                                }}
                              >
                                <Package className="h-4 w-4 mr-2" />
                                Download Invoice
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Package className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No orders</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      This customer hasn't placed any orders yet.
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="address" className="space-y-4 mt-4">
                {selectedCustomer.addresses && selectedCustomer.addresses.length > 0 ? (
                  selectedCustomer.addresses.map((address, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <h3 className="font-medium">
                              {address.isDefault && (
                                <span className="bg-larana-beige text-larana-brown text-xs px-2 py-0.5 rounded mr-2">
                                  Default
                                </span>
                              )}
                              {address.firstName} {address.lastName}
                            </h3>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>{address.street}</p>
                            {address.apartment && <p>{address.apartment}</p>}
                            <p>
                              {address.city}, {address.state} {address.zipCode}
                            </p>
                            <p>{address.country}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <MapPin className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No addresses</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      This customer doesn't have any saved addresses.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDetailsOpen(false)}
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

export default AdminCustomers;
