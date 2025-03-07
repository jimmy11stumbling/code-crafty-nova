
import React, { useEffect, useRef } from "react";

const Hero: React.FC = () => {
  const shapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple parallax effect for the background shape
    const handleMouseMove = (e: MouseEvent) => {
      if (!shapeRef.current) return;
      
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * 0.01;
      const moveY = (clientY - window.innerHeight / 2) * 0.01;
      
      shapeRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background elements */}
      <div
        ref={shapeRef}
        className="absolute inset-0 flex items-center justify-center -z-10 opacity-30"
      >
        <div className="w-[800px] h-[800px] rounded-full bg-gray-100"></div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full z-10">
        <div className="text-center">
          <div className="inline-block mb-6 animate-fade-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
            <span className="chip bg-secondary text-secondary-foreground">
              New Release
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto text-balance animate-fade-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            Beautiful design, thoughtfully crafted
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 text-balance animate-fade-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
            Design is not just what it looks like. Design is how it works. We create products that deliver meaningful experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
            <button className="min-w-[160px] rounded-full px-6 py-3 font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
              Get Started
            </button>
            <button className="min-w-[160px] rounded-full px-6 py-3 font-medium border border-gray-200 text-foreground hover:bg-secondary transition-all duration-300 hover:shadow-sm transform hover:-translate-y-1">
              Learn More
            </button>
          </div>
        </div>
        
        {/* Product image */}
        <div className="mt-20 md:mt-24 lg:mt-28 relative animate-fade-up opacity-0" style={{ animationDelay: '500ms', animationFillMode: 'forwards' }}>
          <div className="relative rounded-xl overflow-hidden shadow-2xl animate-float">
            <div className="aspect-[16/9] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center">
              <span className="text-gray-300 text-xl">Product Showcase</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-6 h-12 w-12 rounded-full bg-blue-500 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -top-6 -left-6 h-12 w-12 rounded-full bg-teal-500 animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
