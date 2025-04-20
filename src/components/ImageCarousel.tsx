'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

const images = [
  {
    src: '/image/img2.png',
    alt: 'Gold rings on beige platform',
  },
  {
    src: '/image/img1.png',
    alt: 'Gold chain necklace with pendant',
  },
  {
    src: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
    alt: 'Gold and silver jewelry collection',
  },
];

const ImageCarousel = () => {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const intervalRef = useRef(null);
  const autoplayDelay = 3000; // 3 seconds
  const resumeAutoplayDelay = 4000; // 4 seconds after user interaction

  const clearExistingInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAutoplay = useCallback(() => {
    clearExistingInterval();
    intervalRef.current = setInterval(() => {
      if (api) {
        api.scrollNext();
      }
    }, autoplayDelay);
  }, [api]);

  const handleUserInteraction = useCallback(() => {
    setAutoPlay(false);
    clearExistingInterval();
    setTimeout(() => {
      setAutoPlay(true);
    }, resumeAutoplayDelay);
  }, []);

  useEffect(() => {
    if (autoPlay) {
      startAutoplay();
    } else {
      clearExistingInterval();
    }

    return () => clearExistingInterval();
  }, [autoPlay, startAutoplay]);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);

    const rootNode = api.rootNode();
    rootNode.addEventListener('pointerdown', handleUserInteraction);
    rootNode.addEventListener('pointerup', handleUserInteraction);

    const prevButton = rootNode.querySelector('[data-carousel-prev]');
    const nextButton = rootNode.querySelector('[data-carousel-next]');

    prevButton?.addEventListener('click', handleUserInteraction);
    nextButton?.addEventListener('click', handleUserInteraction);

    return () => {
      api.off('select', onSelect);
      rootNode.removeEventListener('pointerdown', handleUserInteraction);
      rootNode.removeEventListener('pointerup', handleUserInteraction);
      prevButton?.removeEventListener('click', handleUserInteraction);
      nextButton?.removeEventListener('click', handleUserInteraction);
    };
  }, [api, handleUserInteraction]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="basis-full">
              <Card className="border-0">
                <CardContent className="flex items-center justify-center p-0">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="object-cover w-full h-[60vh] rounded-sm"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Buttons */}
        {/* <div className="absolute bottom-4 right-4 flex items-center space-x-2 z-10">
          <CarouselPrevious data-carousel-prev className="mr-2" />
          <CarouselNext data-carousel-next />
        </div> */}

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-4 flex space-x-2 z-10">
          {images.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index ? 'w-4 bg-white' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
