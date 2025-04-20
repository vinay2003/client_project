
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-larana-brown text-larana-beige-light py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl mb-4">LARANA JEWELRY</h2>
            <p className="text-sm max-w-xs">
              Exquisite luxury jewelry handcrafted with precision and passion. Elevate your style with our timeless pieces.
            </p>
            <div className="pt-4">
              <Link to="/admin" className="text-xs underline hover:text-white">Admin Access</Link>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-white transition-colors">Team</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">Shop All</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">Cart</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>123 Jewelry Lane, Luxury City</li>
              <li>contact@laranajewelry.com</li>
              <li>+1 (234) 567-8901</li>
            </ul>
            <div className="mt-6">
              <h4 className="font-serif text-sm mb-2">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Facebook</a>
                <a href="#" className="hover:text-white transition-colors">Pinterest</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-larana-beige-light/20 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Larana Jewelry. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
