
import React, { useState, useRef, useEffect } from "react";
import { toast } from "@/components/ui/sonner";
import Layout from "@/components/Layout";
import CodePanel from "@/components/CodePanel";
import ChatInterface from "@/components/ChatInterface";
import PreviewPanel from "@/components/PreviewPanel";

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("My Project");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const previewRef = useRef<HTMLIFrameElement>(null);
  
  // Load code from localStorage if available
  useEffect(() => {
    const savedCode = localStorage.getItem("editorCode");
    if (savedCode) {
      setCode(savedCode);
    } else {
      // Default starter code
      setCode(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>
  <style>
    body {
      font-family: sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      color: #333;
    }
  </style>
</head>
<body>
  <h1>Hello World!</h1>
  <p>Edit this code to start building your app.</p>
</body>
</html>`);
    }

    const savedName = localStorage.getItem("projectName");
    if (savedName) {
      setProjectName(savedName);
    }
  }, []);

  // Save code to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("editorCode", code);
  }, [code]);

  // Save project name to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("projectName", projectName);
  }, [projectName]);

  const updateCode = (newCode: string) => {
    setCode(newCode);
    updatePreview(newCode);
  };

  const updatePreview = (content: string) => {
    if (previewRef.current) {
      const iframe = previewRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(content);
        iframeDoc.close();
      }
    }
  };

  const handleAICodeGeneration = async (prompt: string): Promise<string> => {
    setIsProcessing(true);
    
    try {
      // Simulate AI code generation with a delay
      // In a real implementation, this would call an AI API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simple response for demonstration
      let generatedCode = code;
      
      if (prompt.includes("button")) {
        generatedCode = code.replace("</body>", `  <button style="background: #4F46E5; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">Click Me</button>\n</body>`);
      } else if (prompt.includes("header")) {
        generatedCode = code.replace("<body>", `<body>\n  <header style="background: #f0f0f0; padding: 20px; margin-bottom: 20px;">\n    <nav>\n      <a href="#" style="margin-right: 10px;">Home</a>\n      <a href="#" style="margin-right: 10px;">About</a>\n      <a href="#">Contact</a>\n    </nav>\n  </header>`);
      } else if (prompt.includes("footer")) {
        generatedCode = code.replace("</body>", `  <footer style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea; text-align: center;">\n    <p>&copy; 2023 My App. All rights reserved.</p>\n  </footer>\n</body>`);
      } else {
        toast.info("I've processed your request but didn't make changes to your code. Could you be more specific?");
      }
      
      updateCode(generatedCode);
      return "Changes applied successfully!";
    } catch (error) {
      toast.error("Failed to generate code");
      return "Sorry, there was an error processing your request.";
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleProjectNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectName(e.target.value);
  };

  const handleSaveProject = () => {
    // In a real app, this would save to a database
    localStorage.setItem("projectName", projectName);
    localStorage.setItem("editorCode", code);
    toast.success("Project saved successfully!");
  };

  const handleShareProject = () => {
    // In a real app, this would generate a shareable link
    navigator.clipboard.writeText("https://example.com/shared-project");
    toast.success("Share link copied to clipboard!");
  };
  
  const handleExportProject = () => {
    // Create a blob and download it
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${projectName.replace(/\s+/g, "-").toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Project exported successfully!");
  };

  return (
    <Layout>
      <div className="flex flex-col h-screen">
        <div className="border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={projectName}
              onChange={handleProjectNameChange}
              className="text-lg font-medium border-none focus:outline-none focus:ring-0"
              aria-label="Project name"
            />
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={handleSaveProject}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
            <button 
              onClick={handleShareProject}
              className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Share
            </button>
            <button 
              onClick={handleExportProject}
              className="px-3 py-1 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Export
            </button>
          </div>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          <div className="w-2/5 h-full flex flex-col border-r">
            <CodePanel code={code} onChange={updateCode} />
            <ChatInterface 
              onSendMessage={handleAICodeGeneration} 
              isProcessing={isProcessing}
            />
          </div>
          <div className="w-3/5 h-full">
            <PreviewPanel ref={previewRef} initialContent={code} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CodeEditor;
