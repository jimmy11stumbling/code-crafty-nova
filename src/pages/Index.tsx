
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Code, FileCode, PenTool, Zap, Cpu, Package, ChevronRight } from "lucide-react";

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Build Apps with AI</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            The intelligent code editor that helps you build web applications faster with AI-powered assistance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate("/projects")}
              className="px-8 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              My Projects
            </button>
            <button
              onClick={() => navigate("/editor")}
              className="px-8 py-3 bg-purple-700 text-white font-bold rounded-lg hover:bg-purple-800 transition-colors"
            >
              Start Coding <ChevronRight size={18} className="inline ml-1" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Build smarter, not harder</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <div className="mb-4 text-purple-600">
                <Code size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Code Editor</h3>
              <p className="text-gray-600">
                Feature-rich Monaco editor with syntax highlighting, auto-completion, and error detection.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <div className="mb-4 text-purple-600">
                <Cpu size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Assistance</h3>
              <p className="text-gray-600">
                Get AI-powered suggestions and code generation to speed up your development process.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <div className="mb-4 text-purple-600">
                <FileCode size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Multiple File Support</h3>
              <p className="text-gray-600">
                Manage HTML, CSS, and JavaScript files in one place with our integrated file system.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <div className="mb-4 text-purple-600">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Live Preview</h3>
              <p className="text-gray-600">
                See your changes instantly with real-time preview and console access.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <div className="mb-4 text-purple-600">
                <PenTool size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Project Management</h3>
              <p className="text-gray-600">
                Create, save, and organize your projects with our intuitive project management system.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
              <div className="mb-4 text-purple-600">
                <Package size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Export & Share</h3>
              <p className="text-gray-600">
                Export your projects or share them with others with just a few clicks.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start building?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Jump in and create your first project in minutes.
          </p>
          <button
            onClick={() => navigate("/projects")}
            className="px-8 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
