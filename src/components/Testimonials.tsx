
import { useState, useEffect } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "Sophia Williams",
    role: "Loyal Customer",
    quote: "The craftsmanship of Larana jewelry is exceptional. Each piece I've purchased has become a treasured part of my collection."
  },
  {
    id: 2,
    name: "Emma Johnson",
    role: "Fashion Blogger",
    quote: "Larana's designs strike the perfect balance between classic and contemporary. Their pieces have been featured in several of my fashion editorials."
  },
  {
    id: 3,
    name: "Olivia Davis",
    role: "Stylist",
    quote: "I always recommend Larana to my clients. The quality is outstanding, and the designs are timeless yet distinctive."
  }
];

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonialsData.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-larana-beige">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif text-larana-brown-dark text-center mb-16">
          What Our Customers Say
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="relative min-h-[200px]">
            {testimonialsData.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out ${
                  index === currentTestimonial 
                    ? "opacity-100 translate-x-0" 
                    : "opacity-0 translate-x-8"
                }`}
              >
                <blockquote className="text-center">
                  <p className="text-xl text-larana-brown-dark italic mb-6">
                    "{testimonial.quote}"
                  </p>
                  <footer className="text-larana-brown">
                    <cite className="not-italic">
                      <span className="font-medium">{testimonial.name}</span>
                      <span className="block text-sm mt-1">{testimonial.role}</span>
                    </cite>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12 space-x-2">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonial 
                    ? "bg-larana-brown" 
                    : "bg-larana-brown/20"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
