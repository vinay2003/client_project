
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="py-16 bg-larana-brown">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="/lovable-uploads/86c7d370-4af7-4b10-93cc-5d547d6aeb26.png" 
              alt="Model wearing Larana jewelry" 
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>
          
          <div className="text-larana-beige-light">
            <h2 className="text-5xl font-serif mb-6 animate-fade-in">About us</h2>
            <p className="mb-6 leading-relaxed">
              Larana Jewellery is a brand that specializes in creating unique and beautiful pieces of jewellery that are perfect for any occasion. With a focus on quality and craftsmanship, Larana Jewellery is dedicated to providing its customers with stunning pieces that are designed to last a lifetime.
            </p>
            <p className="mb-8 leading-relaxed">
              Whether you're looking for a statement piece to wear to a special event or a delicate everyday piece to wear to work, Larana Jewellery has something for everyone.
            </p>
            <Button 
              asChild
              variant="outline" 
              className="border-larana-beige-light text-larana-beige-light hover:bg-larana-beige-light hover:text-larana-brown"
            >
              <Link to="/team">
                Meet Our Team
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
