
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
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <Link 
            to="/editor" 
            className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Try Our AI Code Editor
          </Link>
          <Link 
            to="/projects" 
            className="inline-block px-6 py-3 rounded-lg bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition-colors"
          >
            View My Projects
          </Link>
        </div>
      </div>
      <Features />
      <Product />
    </Layout>
  );
};

export default Index;
