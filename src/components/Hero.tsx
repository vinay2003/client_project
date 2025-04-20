import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import ImageCarousel from './ImageCarousel';

const Hero = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (textRef.current) {
      gsap.to(textRef.current, {
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        opacity: 0,
        y: -50,
        ease: 'power2.out',
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="relative grid grid-cols-1 md:grid-cols-2 h-screen w-full overflow-hidden">
      {/* Left Image Section */}
      <div className="relative w-full h-full">
        <img
          src="/image/img1.png"
          alt="Gold chain necklace with pendant"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right Carousel Section */}
      <div className="bg-[#bf8f71] p-6 md:p-10 lg:p-16 flex items-center justify-center h-full">
        <ImageCarousel />
      </div>

      {/* Overlay Content */}
      <div
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20 pointer-events-none"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white drop-shadow-md mb-4">
          Larana Jewellery
        </h1>
        <p className="text-lg md:text-xl uppercase tracking-widest text-white drop-shadow-sm mb-8">
          Girl's Favorite
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto">
          <Button
            asChild
            className="bg-white/20 hover:bg-white/40 text-white border border-white/50 backdrop-blur-sm"
            size="lg"
          >
            <Link to="/shop">Shop Collection</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="bg-white/20 hover:bg-white/40 text-white border border-white/50 backdrop-blur-sm"
          >
            <Link to="/products">Explore Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
