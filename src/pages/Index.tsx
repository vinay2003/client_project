
import { useEffect } from "react";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import FindUs from "@/components/FindUs";

const Index = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="animate-fade-in">
      <Hero />
      <FeaturedProducts />
      <AboutSection />
      <Testimonials />
      <FindUs />
    </div>
  );
};

export default Index;
