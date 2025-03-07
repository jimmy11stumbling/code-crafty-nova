
import React, { useRef, useEffect, useState } from "react";

const Product: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="product" className="section relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full blur-3xl opacity-30 transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-teal-50 to-teal-100 rounded-full blur-3xl opacity-30 transform -translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="chip bg-teal-100 text-teal-800">Product</span>
          </div>
          <h2 className="section-title">Elegance in Simplicity</h2>
          <p className="section-subtitle">
            Our product is designed with precision and care, focusing on what matters most.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className={`lg:w-1/2 ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
            <div className="relative">
              <div className="aspect-square max-w-lg rounded-2xl overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <span className="text-gray-300 text-2xl">Product Image</span>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-blue-500 opacity-20"></div>
              <div className="absolute -top-6 -left-6 h-12 w-12 rounded-full bg-teal-500 opacity-20"></div>
            </div>
          </div>
          
          <div className={`lg:w-1/2 ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "300ms" }}>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Meticulously Crafted</h3>
                <p className="text-muted-foreground">
                  Every detail has been carefully considered to create a product that is both beautiful and functional.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-2">Thoughtfully Designed</h3>
                <p className="text-muted-foreground">
                  Our design philosophy ensures that every element serves a purpose and enhances the user experience.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold mb-2">Precision Engineering</h3>
                <p className="text-muted-foreground">
                  Built with precision and attention to detail, our product stands out for its quality and durability.
                </p>
              </div>
              
              <button className="rounded-full px-6 py-3 mt-4 font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                Explore Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
