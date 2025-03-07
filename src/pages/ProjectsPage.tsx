
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PlusCircle, Code, Trash, Clock, Edit, Copy } from "lucide-react";
import Layout from "@/components/Layout";

interface Project {
  id: string;
  name: string;
  lastModified: Date;
  files?: any[];
}

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load projects from localStorage
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
      try {
        const parsedProjects = JSON.parse(savedProjects);
        setProjects(parsedProjects.map((project: any) => ({
          ...project,
          lastModified: new Date(project.lastModified)
        })));
      } catch (error) {
        console.error("Failed to parse saved projects", error);
        setProjects([]);
      }
    }
  }, []);

  const createNewProject = () => {
    const newProjectId = Date.now().toString();
    const newProject: Project = {
      id: newProjectId,
      name: "New Project",
      lastModified: new Date()
    };
    
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    toast.success("New project created!");
    
    // Navigate to the editor with the new project ID
    navigate(`/editor?project=${newProjectId}`);
  };

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter(project => project.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    toast.success("Project deleted successfully!");
  };

  const duplicateProject = (project: Project) => {
    const newProjectId = Date.now().toString();
    const duplicatedProject: Project = {
      ...project,
      id: newProjectId,
      name: `${project.name} (Copy)`,
      lastModified: new Date()
    };
    
    const updatedProjects = [...projects, duplicatedProject];
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    toast.success("Project duplicated successfully!");
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Projects</h1>
          <button
            onClick={createNewProject}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <PlusCircle size={18} />
            <span>New Project</span>
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
            <h2 className="text-xl mb-4">No projects yet</h2>
            <p className="text-gray-500 mb-6">Create your first project to get started!</p>
            <button
              onClick={createNewProject}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div key={project.id} className="border rounded-lg overflow-hidden shadow-sm bg-white hover:shadow-md transition-shadow">
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold truncate">{project.name}</h3>
                    <div className="flex space-x-1">
                      <button 
                        onClick={() => duplicateProject(project)}
                        className="p-1 text-gray-500 hover:text-blue-500 transition-colors"
                        title="Duplicate"
                      >
                        <Copy size={16} />
                      </button>
                      <button 
                        onClick={() => deleteProject(project.id)}
                        className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock size={14} className="mr-1" />
                    <span title={formatDate(project.lastModified)}>
                      {formatDate(project.lastModified)}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Code size={14} className="mr-1" />
                    <span>
                      {project.files ? `${project.files.length} files` : "No files"}
                    </span>
                  </div>
                  
                  <div className="flex gap-3">
                    <Link
                      to={`/editor?project=${project.id}`}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
                    >
                      <Edit size={16} className="mr-2" />
                      Open Editor
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProjectsPage;
