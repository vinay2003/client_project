
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { CartProvider } from "@/context/CartContext";

const Layout = () => {
  // Check if current path is admin to avoid showing Navbar and Footer on admin pages
  const isAdmin = window.location.pathname.includes('/admin');
  
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-larana-beige-light">
        {!isAdmin && <Navbar />}
        <main className="flex-grow">
          <Outlet />
        </main>
        {!isAdmin && <Footer />}
      </div>
    </CartProvider>
  );
};

export default Layout;
