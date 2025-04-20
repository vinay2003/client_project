
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-larana-beige-light">
      <div className="max-w-md w-full p-8 text-center">
        <h1 className="text-6xl font-serif text-larana-brown-dark mb-6">404</h1>
        <h2 className="text-2xl font-serif text-larana-brown mb-4">Page Not Found</h2>
        <p className="text-larana-brown-dark/80 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button 
          asChild
          className="bg-larana-brown hover:bg-larana-brown-dark text-white"
        >
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
