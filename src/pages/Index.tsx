
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Product from "@/components/Product";

const Index: React.FC = () => {
  // Smooth scroll to section when URL has hash
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <Layout>
      <Hero />
      <div className="text-center py-8">
        <Link 
          to="/editor" 
          className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          Try Our AI Code Editor
        </Link>
      </div>
      <Features />
      <Product />
    </Layout>
  );
};

export default Index;
