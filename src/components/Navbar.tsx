
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="bg-larana-beige sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="brand-title text-xl md:text-2xl font-bold animate-fade-in">
            LARANA JEWELRY
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="hover-scale text-larana-brown font-medium">
              Home
            </Link>
            <Link to="/products" className="hover-scale text-larana-brown font-medium">
              Products
            </Link>
            <Link to="/team" className="hover-scale text-larana-brown font-medium">
              Team
            </Link>
            <Link to="/shop" className="hover-scale text-larana-brown font-medium">
              Shop
            </Link>
          </div>

          {/* Search and Cart */}
          <div className="hidden md:flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-3 pr-10 py-2 rounded-md bg-larana-beige-light border border-larana-brown/20 focus:border-larana-brown focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-larana-brown hover:text-larana-gold transition-colors"
              >
                <Search size={18} />
              </button>
            </form>
            <Link to="/cart" className="relative hover:text-larana-gold text-larana-brown-dark">
              <ShoppingBag />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-larana-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative mr-2 hover:text-larana-gold text-larana-brown-dark">
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-larana-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Button
              variant="ghost"
              onClick={toggleMenu}
              className="text-larana-brown focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-scale-in">
            <form onSubmit={handleSearch} className="mb-4 relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-3 pr-10 py-2 rounded-md bg-larana-beige-light border border-larana-brown/20"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-larana-brown"
              >
                <Search size={18} />
              </button>
            </form>
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="hover:bg-larana-beige-light py-2 px-4 rounded-md transition-colors"
              >
                Home
              </Link>
              <Link
                to="/products"
                onClick={() => setIsMenuOpen(false)}
                className="hover:bg-larana-beige-light py-2 px-4 rounded-md transition-colors"
              >
                Products
              </Link>
              <Link
                to="/team"
                onClick={() => setIsMenuOpen(false)}
                className="hover:bg-larana-beige-light py-2 px-4 rounded-md transition-colors"
              >
                Team
              </Link>
              <Link
                to="/shop"
                onClick={() => setIsMenuOpen(false)}
                className="hover:bg-larana-beige-light py-2 px-4 rounded-md transition-colors"
              >
                Shop
              </Link>
              <hr className="border-larana-brown/10" />
              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="hover:bg-larana-beige-light py-2 px-4 rounded-md text-larana-brown/80 transition-colors"
              >
                Admin Panel
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
