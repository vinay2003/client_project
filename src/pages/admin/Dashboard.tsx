
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productData } from "@/data/products";
import { ordersData, getRecentOrders } from "@/data/orders";
import { getRecentCustomers } from "@/data/customers";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  ShoppingBag, 
  Users, 
  DollarSign, 
  Package,
  ArrowUpRight,
  TrendingUp
} from "lucide-react";
import { Order, Customer } from "@/types";

const AdminDashboard = () => {
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [recentCustomers, setRecentCustomers] = useState<Customer[]>([]);
  
  useEffect(() => {
    // In a real app, these would be API calls
    setRecentOrders(getRecentOrders(5));
    setRecentCustomers(getRecentCustomers(5));
  }, []);
  
  const totalRevenue = ordersData.reduce((sum, order) => sum + order.totalAmount, 0);
  const averageOrderValue = totalRevenue / ordersData.length;
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif text-larana-brown-dark mb-2">Dashboard</h1>
        <p className="text-larana-brown">
          Overview of your store's performance and recent activity.
        </p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-larana-brown text-sm">Total Revenue</p>
                <h3 className="text-2xl font-medium mt-1">${totalRevenue.toFixed(2)}</h3>
              </div>
              <div className="w-12 h-12 bg-larana-beige rounded-full flex items-center justify-center text-larana-brown">
                <DollarSign />
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-600 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>12% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-larana-brown text-sm">Total Orders</p>
                <h3 className="text-2xl font-medium mt-1">{ordersData.length}</h3>
              </div>
              <div className="w-12 h-12 bg-larana-beige rounded-full flex items-center justify-center text-larana-brown">
                <Package />
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-600 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>8% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-larana-brown text-sm">Products</p>
                <h3 className="text-2xl font-medium mt-1">{productData.length}</h3>
              </div>
              <div className="w-12 h-12 bg-larana-beige rounded-full flex items-center justify-center text-larana-brown">
                <ShoppingBag />
              </div>
            </div>
            <div className="mt-4 text-larana-brown text-sm">
              {productData.filter(p => p.inStock).length} in stock
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-sm">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-larana-brown text-sm">Customers</p>
                <h3 className="text-2xl font-medium mt-1">{recentCustomers.length}</h3>
              </div>
              <div className="w-12 h-12 bg-larana-beige rounded-full flex items-center justify-center text-larana-brown">
                <Users />
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-600 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>24% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Orders */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest transactions from your store.</CardDescription>
            </div>
            <Link 
              to="/admin/orders" 
              className="text-larana-brown hover:text-larana-brown-dark text-sm flex items-center"
            >
              View All
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-larana-beige">
                  <th className="text-left p-3 text-larana-brown font-medium text-sm">Order ID</th>
                  <th className="text-left p-3 text-larana-brown font-medium text-sm">Customer</th>
                  <th className="text-left p-3 text-larana-brown font-medium text-sm">Date</th>
                  <th className="text-left p-3 text-larana-brown font-medium text-sm">Status</th>
                  <th className="text-left p-3 text-larana-brown font-medium text-sm">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-larana-beige hover:bg-larana-beige-light/30">
                    <td className="p-3">
                      <div className="font-medium">{order.id}</div>
                    </td>
                    <td className="p-3">
                      {order.customer.firstName} {order.customer.lastName}
                    </td>
                    <td className="p-3">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        order.status === 'delivered' 
                          ? 'bg-green-100 text-green-700' 
                          : order.status === 'shipped' 
                          ? 'bg-blue-100 text-blue-700' 
                          : order.status === 'processing' 
                          ? 'bg-yellow-100 text-yellow-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-3">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Recent Customers */}
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Customers</CardTitle>
              <CardDescription>Newly registered customers.</CardDescription>
            </div>
            <Link 
              to="/admin/customers" 
              className="text-larana-brown hover:text-larana-brown-dark text-sm flex items-center"
            >
              View All
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentCustomers.map((customer) => (
              <div 
                key={customer.id} 
                className="p-4 border border-larana-beige rounded-lg flex items-center hover:bg-larana-beige-light/30"
              >
                <div className="w-10 h-10 rounded-full bg-larana-beige flex items-center justify-center text-larana-brown-dark mr-4">
                  {customer.firstName.charAt(0)}{customer.lastName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium">{customer.firstName} {customer.lastName}</h4>
                  <p className="text-larana-brown text-sm">{customer.email}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
