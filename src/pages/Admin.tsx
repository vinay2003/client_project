
import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  PackageOpen,
  LogOut,
  ChevronLeft,
  Menu,
  X,
  Settings,
  Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ordersData } from "@/data/orders"; 

const AdminPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [notifications, setNotifications] = useState(ordersData.length); // Using actual order count
  const [notificationItems, setNotificationItems] = useState(
    ordersData.map(order => ({
      id: order.id,
      title: `New order #${order.id}`,
      description: `From ${order.customer.firstName} ${order.customer.lastName}`,
      time: new Date(order.createdAt).toLocaleString(),
      read: false
    }))
  );
  
  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out."
    });
    navigate('/admin/login');
  };
  
  const markAllAsRead = () => {
    setNotificationItems(prev => prev.map(item => ({ ...item, read: true })));
    setNotifications(0);
    toast({
      title: "Notifications cleared",
      description: "All notifications have been marked as read."
    });
  };
  
  const viewOrder = (orderId: string) => {
    navigate(`/admin/orders?id=${orderId}`);
    
    // Mark this notification as read
    setNotificationItems(prev => 
      prev.map(item => 
        item.id === orderId ? { ...item, read: true } : item
      )
    );
    
    // Update notification count
    const unreadCount = notificationItems.filter(item => 
      item.id !== orderId && !item.read
    ).length;
    setNotifications(unreadCount);
  };
  
  return (
    <div className="bg-larana-beige-light min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={`bg-larana-brown text-white fixed inset-y-0 z-50 transition-all duration-300 ${
            isSidebarOpen ? "left-0" : "-left-64"
          } w-64 shadow-lg`}
        >
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-8">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-serif">Larana Admin</h2>
            </div>
            
            <nav className="space-y-1">
              <Link 
                to="/admin" 
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive("/admin") 
                    ? "bg-white/20" 
                    : "hover:bg-white/10"
                }`}
              >
                <LayoutDashboard className="w-5 h-5 mr-3" />
                Dashboard
              </Link>
              
              <Link 
                to="/admin/products" 
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive("/admin/products") 
                    ? "bg-white/20" 
                    : "hover:bg-white/10"
                }`}
              >
                <ShoppingBag className="w-5 h-5 mr-3" />
                Products
              </Link>
              
              <Link 
                to="/admin/orders" 
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive("/admin/orders") 
                    ? "bg-white/20" 
                    : "hover:bg-white/10"
                }`}
              >
                <PackageOpen className="w-5 h-5 mr-3" />
                Orders
              </Link>
              
              <Link 
                to="/admin/customers" 
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive("/admin/customers") 
                    ? "bg-white/20" 
                    : "hover:bg-white/10"
                }`}
              >
                <Users className="w-5 h-5 mr-3" />
                Customers
              </Link>

              <Link 
                to="/admin/settings" 
                className={`flex items-center px-4 py-3 rounded-md transition-colors hover:bg-white/10`}
              >
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </Link>
            </nav>
          </div>
          
          <div className="absolute bottom-0 w-full p-6 border-t border-white/10">
            <Link 
              to="/" 
              className="flex items-center text-white/80 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Return to Store
            </Link>
          </div>
        </aside>
        
        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}>
          {/* Top bar */}
          <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="text-larana-brown-dark mr-4"
              >
                {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              
              <h2 className="text-larana-brown-dark font-medium hidden md:block">
                {location.pathname === '/admin' && 'Dashboard'}
                {location.pathname === '/admin/products' && 'Products Management'}
                {location.pathname === '/admin/orders' && 'Orders Management'}
                {location.pathname === '/admin/customers' && 'Customer Management'}
              </h2>
            </div>
            
            <div className="flex items-center space-x-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-larana-brown relative">
                    <Bell className="w-5 h-5" />
                    {notifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500">
                        {notifications}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel className="flex justify-between items-center">
                    <span>Notifications</span>
                    {notifications > 0 && (
                      <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 text-xs">
                        Mark all as read
                      </Button>
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-80 overflow-y-auto">
                    {notificationItems.length > 0 ? (
                      <DropdownMenuGroup>
                        {notificationItems.map((notification) => (
                          <DropdownMenuItem 
                            key={notification.id}
                            className={`p-3 cursor-pointer ${notification.read ? 'opacity-60' : ''}`}
                            onClick={() => viewOrder(notification.id)}
                          >
                            <div className="flex items-start gap-2">
                              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${notification.read ? 'bg-gray-300' : 'bg-red-500'}`} />
                              <div className="space-y-1">
                                <p className="font-medium text-sm">{notification.title}</p>
                                <p className="text-xs text-gray-500">{notification.description}</p>
                                <p className="text-xs text-gray-400">{notification.time}</p>
                              </div>
                            </div>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    ) : (
                      <div className="py-4 text-center text-sm text-gray-500">
                        No notifications
                      </div>
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <div className="flex items-center">
                <div className="w-8 h-8 bg-larana-beige rounded-full mr-2 flex items-center justify-center text-larana-brown-dark">
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <span className="text-larana-brown-dark hidden md:block">{user?.name || 'Admin User'}</span>
              </div>
              
              <button 
                className="text-larana-brown hover:text-larana-brown-dark flex items-center"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 md:mr-2" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </header>
          
          {/* Content */}
          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
