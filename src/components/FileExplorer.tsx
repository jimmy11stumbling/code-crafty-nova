
import React, { useState } from "react";
import { Plus, Folder, File, X } from "lucide-react";

export interface FileItem {
  id: string;
  name: string;
  content: string;
  language?: string;
  type: "file" | "folder";
  children?: FileItem[];
}

interface FileExplorerProps {
  files: FileItem[];
  onFileSelect: (file: FileItem) => void;
  onFileCreate: (name: string, type: "file" | "folder", parentId?: string) => void;
  onFileDelete: (id: string) => void;
  selectedFileId: string | null;
}

const FileExplorer: React.FC<FileExplorerProps> = ({
  files,
  onFileSelect,
  onFileCreate,
  onFileDelete,
  selectedFileId
}) => {
  const [newItemName, setNewItemName] = useState("");
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [newItemType, setNewItemType] = useState<"file" | "folder">("file");

  const handleCreateNewItem = () => {
    if (newItemName.trim()) {
      onFileCreate(newItemName, newItemType);
      setNewItemName("");
      setIsCreatingFile(false);
    }
  };

  const renderFileItem = (file: FileItem) => {
    const isSelected = selectedFileId === file.id;
    
    return (
      <div 
        key={file.id} 
        className={`flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer ${
          isSelected ? "bg-blue-100" : ""
        }`}
      >
        <div 
          className="flex items-center gap-2 flex-1" 
          onClick={() => file.type === "file" && onFileSelect(file)}
        >
          {file.type === "folder" ? <Folder size={16} /> : <File size={16} />}
          <span>{file.name}</span>
        </div>
        <button 
          className="text-gray-500 hover:text-red-500 p-1"
          onClick={() => onFileDelete(file.id)}
        >
          <X size={14} />
        </button>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col border rounded-md">
      <div className="p-3 border-b bg-gray-50 flex justify-between items-center">
        <h3 className="font-medium text-sm">Files</h3>
        <button
          onClick={() => setIsCreatingFile(true)}
          className="text-xs px-2 py-1 bg-blue-500 text-white hover:bg-blue-600 rounded flex items-center gap-1"
        >
          <Plus size={12} />
          <span>New</span>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        {files.map(renderFileItem)}
      </div>
      
      {isCreatingFile && (
        <div className="p-3 border-t">
          <div className="flex gap-2 mb-2">
            <select 
              value={newItemType}
              onChange={(e) => setNewItemType(e.target.value as "file" | "folder")}
              className="text-xs p-1 border rounded"
            >
              <option value="file">File</option>
              <option value="folder">Folder</option>
            </select>
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="filename.js"
              className="text-xs p-1 border rounded flex-1"
              autoFocus
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsCreatingFile(false)}
              className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateNewItem}
              className="text-xs px-2 py-1 bg-blue-500 text-white hover:bg-blue-600 rounded"
            >
              Create
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
