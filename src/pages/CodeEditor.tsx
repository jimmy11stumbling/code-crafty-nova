
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import CodePanel from "@/components/CodePanel";
import ChatInterface from "@/components/ChatInterface";
import PreviewPanel from "@/components/PreviewPanel";
import { FileItem } from "@/components/FileExplorer";
import { Save, Share, FileDown, ArrowLeft } from "lucide-react";

const CodeEditor: React.FC = () => {
  // Get project ID from query params if available
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const projectId = params.get("project");
  
  const [code, setCode] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("My Project");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const previewRef = useRef<HTMLIFrameElement>(null);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  
  // Initialize files or load from local storage
  useEffect(() => {
    // Load project data if projectId is available
    if (projectId) {
      const savedProjects = localStorage.getItem("projects");
      if (savedProjects) {
        try {
          const projects = JSON.parse(savedProjects);
          const project = projects.find((p: any) => p.id === projectId);
          if (project) {
            setProjectName(project.name);
            
            // Load files if they exist
            if (project.files && Array.isArray(project.files)) {
              setFiles(project.files);
              
              // Select the first file if available
              if (project.files.length > 0) {
                setSelectedFileId(project.files[0].id);
                setSelectedFile(project.files[0]);
                setCode(project.files[0].content);
              }
            }
            return;
          }
        } catch (error) {
          console.error("Failed to parse saved project data", error);
        }
      }
    }
    
    // Initialize with a default HTML file if no project loaded
    const defaultFile: FileItem = {
      id: "index.html",
      name: "index.html",
      type: "file",
      content: `<!DOCTYPE html>
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
</html>`
    };
    
    setFiles([defaultFile]);
    setSelectedFileId(defaultFile.id);
    setSelectedFile(defaultFile);
    setCode(defaultFile.content);
  }, [projectId]);

  // Save the entire project to localStorage when it changes
  useEffect(() => {
    saveProject();
  }, [files, projectName, projectId]);

  const saveProject = () => {
    // Don't save if no projectId (temporary session)
    if (!projectId) return;
    
    const savedProjects = localStorage.getItem("projects");
    let projects = [];
    
    if (savedProjects) {
      try {
        projects = JSON.parse(savedProjects);
        // Remove the current project if it exists
        projects = projects.filter((p: any) => p.id !== projectId);
      } catch (error) {
        console.error("Failed to parse saved projects", error);
      }
    }
    
    // Add the current project
    projects.push({
      id: projectId,
      name: projectName,
      files: files,
      lastModified: new Date()
    });
    
    localStorage.setItem("projects", JSON.stringify(projects));
  };

  // Update the code for the selected file
  const updateCode = (newCode: string) => {
    // Update the code in state
    setCode(newCode);
    
    // Update the code in the selected file
    if (selectedFileId) {
      setFiles(prevFiles => 
        prevFiles.map(file => 
          file.id === selectedFileId 
            ? { ...file, content: newCode } 
            : file
        )
      );
    }
    
    // Update the preview if the selected file is HTML
    if (selectedFile && selectedFile.name.endsWith('.html')) {
      updatePreview(newCode);
    }
  };

  // Update the preview iframe with HTML content
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

  // Generate a full HTML preview from all files
  const generateFullPreview = () => {
    // Find the main HTML file
    const htmlFile = files.find(file => file.name.endsWith('.html'));
    if (!htmlFile) return;
    
    let htmlContent = htmlFile.content;
    
    // Find CSS files and inject them
    const cssFiles = files.filter(file => file.name.endsWith('.css'));
    if (cssFiles.length > 0) {
      const styleTag = cssFiles.map(file => 
        `<style>\n${file.content}\n</style>`
      ).join('\n');
      
      // Insert styles before </head>
      htmlContent = htmlContent.replace('</head>', `${styleTag}\n</head>`);
    }
    
    // Find JS files and inject them
    const jsFiles = files.filter(file => file.name.endsWith('.js'));
    if (jsFiles.length > 0) {
      const scriptTag = jsFiles.map(file => 
        `<script>\n${file.content}\n</script>`
      ).join('\n');
      
      // Insert scripts before </body>
      htmlContent = htmlContent.replace('</body>', `${scriptTag}\n</body>`);
    }
    
    updatePreview(htmlContent);
  };

  // Handle file selection
  const handleFileSelect = (file: FileItem) => {
    setSelectedFileId(file.id);
    setSelectedFile(file);
    setCode(file.content);
    
    // If the file is HTML, update the preview
    if (file.name.endsWith('.html')) {
      updatePreview(file.content);
    }
  };

  // Create a new file
  const handleFileCreate = (name: string, type: "file" | "folder") => {
    const newFile: FileItem = {
      id: Date.now().toString(),
      name: name,
      type: type,
      content: type === 'file' ? '' : '',
      children: type === 'folder' ? [] : undefined
    };
    
    setFiles(prevFiles => [...prevFiles, newFile]);
    
    if (type === 'file') {
      setSelectedFileId(newFile.id);
      setSelectedFile(newFile);
      setCode(newFile.content);
    }
    
    toast.success(`${type === 'file' ? 'File' : 'Folder'} created`);
  };

  // Delete a file
  const handleFileDelete = (id: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
    
    // If the deleted file is the selected file, select the first file
    if (id === selectedFileId) {
      const remainingFiles = files.filter(file => file.id !== id);
      if (remainingFiles.length > 0) {
        setSelectedFileId(remainingFiles[0].id);
        setSelectedFile(remainingFiles[0]);
        setCode(remainingFiles[0].content);
      } else {
        setSelectedFileId(null);
        setSelectedFile(null);
        setCode('');
      }
    }
    
    toast.success("File deleted");
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
        if (selectedFile?.name.endsWith('.html')) {
          generatedCode = code.replace("</body>", `  <button style="background: #4F46E5; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">Click Me</button>\n</body>`);
        } else if (selectedFile?.name.endsWith('.js')) {
          generatedCode = code + `\n\nfunction handleButtonClick() {\n  console.log("Button clicked!");\n}\n\ndocument.querySelector("button").addEventListener("click", handleButtonClick);`;
        }
      } else if (prompt.includes("header")) {
        if (selectedFile?.name.endsWith('.html')) {
          generatedCode = code.replace("<body>", `<body>\n  <header style="background: #f0f0f0; padding: 20px; margin-bottom: 20px;">\n    <nav>\n      <a href="#" style="margin-right: 10px;">Home</a>\n      <a href="#" style="margin-right: 10px;">About</a>\n      <a href="#">Contact</a>\n    </nav>\n  </header>`);
        }
      } else if (prompt.includes("footer")) {
        if (selectedFile?.name.endsWith('.html')) {
          generatedCode = code.replace("</body>", `  <footer style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea; text-align: center;">\n    <p>&copy; 2023 My App. All rights reserved.</p>\n  </footer>\n</body>`);
        }
      } else if (prompt.includes("create") && prompt.includes("css")) {
        // Create a new CSS file if it doesn't exist
        if (!files.some(file => file.name === "styles.css")) {
          const newCssFile: FileItem = {
            id: Date.now().toString(),
            name: "styles.css",
            type: "file",
            content: `/* Main Styles */\nbody {\n  font-family: 'Arial', sans-serif;\n  line-height: 1.6;\n  color: #333;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\nh1 {\n  color: #4F46E5;\n}\n\nbutton {\n  background: #4F46E5;\n  color: white;\n  padding: 8px 16px;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}\n\nbutton:hover {\n  background: #3c36b0;\n}\n`
          };
          setFiles(prevFiles => [...prevFiles, newCssFile]);
          setSelectedFileId(newCssFile.id);
          setSelectedFile(newCssFile);
          setCode(newCssFile.content);
          generatedCode = newCssFile.content;
        }
      } else {
        return "I've understood your request, but I'm not sure how to implement it with the current file. Could you be more specific or try editing an HTML file?";
      }
      
      // Update the code
      updateCode(generatedCode);
      generateFullPreview();
      
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
    saveProject();
    toast.success("Project saved successfully!");
  };

  const handleShareProject = () => {
    // In a real app, this would generate a shareable link
    navigator.clipboard.writeText(`${window.location.origin}/editor?project=${projectId}`);
    toast.success("Share link copied to clipboard!");
  };
  
  const handleExportProject = () => {
    // Create a zip file or download the HTML directly
    if (files.length === 1 && files[0].name.endsWith('.html')) {
      // Just download the single HTML file
      const blob = new Blob([files[0].content], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${projectName.replace(/\s+/g, "-").toLowerCase()}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // For multiple files, in a real app we would use JSZip to create a zip file
      // For now, just download the main HTML file
      const htmlFile = files.find(file => file.name.endsWith('.html'));
      if (htmlFile) {
        const blob = new Blob([htmlFile.content], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = htmlFile.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    }
    
    toast.success("Project exported successfully!");
  };

  // Generate the full preview when files change
  useEffect(() => {
    if (files.length > 0) {
      generateFullPreview();
    }
  }, [files]);

  return (
    <Layout>
      <div className="flex flex-col h-screen">
        <div className="border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate("/projects")}
              className="text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft size={18} />
            </button>
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
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <Save size={14} className="mr-1" />
              Save
            </button>
            <button 
              onClick={handleShareProject}
              className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            >
              <Share size={14} className="mr-1" />
              Share
            </button>
            <button 
              onClick={handleExportProject}
              className="px-3 py-1 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center"
            >
              <FileDown size={14} className="mr-1" />
              Export
            </button>
          </div>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          <div className="w-2/5 h-full flex flex-col border-r">
            <CodePanel 
              code={code} 
              onChange={updateCode} 
              files={files}
              onFileSelect={handleFileSelect}
              onFileCreate={handleFileCreate}
              onFileDelete={handleFileDelete}
              selectedFileId={selectedFileId}
              fileName={selectedFile?.name}
              onSave={handleSaveProject}
            />
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
