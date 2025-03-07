
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Product", href: "#product" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out py-4 px-4 sm:px-6 lg:px-8",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <a
              href="#"
              className="flex items-center gap-2 text-xl font-semibold tracking-tight"
            >
              <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center">
                <span className="text-white font-medium">M</span>
              </div>
              <span className="animate-fade-in">Minimalist</span>
            </a>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm text-foreground hover:text-primary/80 transition-colors highlight-link"
              >
                {item.name}
              </a>
            ))}
            <button className="rounded-full px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform duration-300"
              style={{ transform: isMobileMenuOpen ? "rotate(90deg)" : "none" }}
            >
              {isMobileMenuOpen ? (
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d="M4 6H20M4 12H20M4 18H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden fixed inset-0 bg-white z-40 pt-20 px-4 space-y-4 transform transition-transform duration-300 ease-in-out",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="block py-3 text-foreground hover:text-primary/80 transition-colors border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <div className="pt-4">
            <button className="w-full rounded-full py-3 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
