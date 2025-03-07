
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";
import Layout from "@/components/Layout";

interface Project {
  id: string;
  name: string;
  lastModified: Date;
}

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  
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
    const newProject: Project = {
      id: Date.now().toString(),
      name: "New Project",
      lastModified: new Date()
    };
    
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    toast.success("New project created!");
  };

  const deleteProject = (id: string) => {
    const updatedProjects = projects.filter(project => project.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    toast.success("Project deleted successfully!");
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Projects</h1>
          <button
            onClick={createNewProject}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <PlusCircle size={18} />
            <span>New Project</span>
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl mb-4">No projects yet</h2>
            <p className="text-gray-500 mb-6">Create your first project to get started!</p>
            <button
              onClick={createNewProject}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <div key={project.id} className="border rounded-lg overflow-hidden shadow-sm bg-white hover:shadow-md transition-shadow">
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Last edited: {project.lastModified.toLocaleDateString()}
                  </p>
                  <div className="flex gap-3">
                    <Link
                      to={`/editor?project=${project.id}`}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded hover:bg-blue-700"
                    >
                      Open
                    </Link>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
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
