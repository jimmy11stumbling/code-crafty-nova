
import React, { useEffect } from "react";
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
      <Features />
      <Product />
    </Layout>
  );
};

export default Index;
