
import React, { useState } from "react";
import { Plus, Folder, File, ChevronRight, ChevronDown, X, Edit, Save, Trash } from "lucide-react";

export interface FileItem {
  id: string;
  name: string;
  content: string;
  language?: string;
  type: "file" | "folder";
  children?: FileItem[];
  parentId?: string;
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
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  const [parentForNewItem, setParentForNewItem] = useState<string | undefined>(undefined);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [newName, setNewName] = useState("");

  const handleCreateNewItem = () => {
    if (newItemName.trim()) {
      onFileCreate(newItemName, newItemType, parentForNewItem);
      setNewItemName("");
      setIsCreatingFile(false);
      setParentForNewItem(undefined);
    }
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderId)
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const startRenaming = (file: FileItem) => {
    setRenamingId(file.id);
    setNewName(file.name);
  };

  const confirmRename = () => {
    // In a real app, we would update the file name here
    // For now, we'll just end the renaming state
    setRenamingId(null);
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.html')) return <File size={16} className="text-orange-500" />;
    if (fileName.endsWith('.css')) return <File size={16} className="text-blue-500" />;
    if (fileName.endsWith('.js')) return <File size={16} className="text-yellow-500" />;
    if (fileName.endsWith('.jsx')) return <File size={16} className="text-yellow-500" />;
    if (fileName.endsWith('.ts')) return <File size={16} className="text-blue-700" />;
    if (fileName.endsWith('.tsx')) return <File size={16} className="text-blue-700" />;
    if (fileName.endsWith('.json')) return <File size={16} className="text-gray-500" />;
    if (fileName.endsWith('.md')) return <File size={16} className="text-gray-700" />;
    return <File size={16} />;
  };

  const renderFileItem = (file: FileItem, depth = 0) => {
    const isSelected = selectedFileId === file.id;
    const isFolder = file.type === "folder";
    const isExpanded = expandedFolders.includes(file.id);
    const isRenaming = renamingId === file.id;
    
    return (
      <div key={file.id}>
        <div 
          className={`flex items-center justify-between py-1 px-2 hover:bg-gray-100 rounded cursor-pointer ${
            isSelected ? "bg-blue-100" : ""
          }`}
          style={{ paddingLeft: `${(depth * 12) + 8}px` }}
        >
          <div 
            className="flex items-center gap-1 flex-1" 
            onClick={() => isFolder ? toggleFolder(file.id) : onFileSelect(file)}
          >
            {isFolder && (
              <button onClick={(e) => { e.stopPropagation(); toggleFolder(file.id); }} className="p-0.5">
                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </button>
            )}
            
            {isFolder ? <Folder size={16} className="text-blue-400" /> : getFileIcon(file.name)}
            
            {isRenaming ? (
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="text-xs p-0.5 border rounded flex-1"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && confirmRename()}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <span className="text-sm">{file.name}</span>
            )}
          </div>
          
          <div className="flex space-x-1">
            {isRenaming ? (
              <button 
                className="text-green-500 hover:text-green-700 p-1"
                onClick={confirmRename}
              >
                <Save size={12} />
              </button>
            ) : (
              <>
                <button 
                  className="text-gray-400 hover:text-blue-500 p-1"
                  onClick={(e) => { e.stopPropagation(); startRenaming(file); }}
                >
                  <Edit size={12} />
                </button>
                <button 
                  className="text-gray-400 hover:text-red-500 p-1"
                  onClick={(e) => { e.stopPropagation(); onFileDelete(file.id); }}
                >
                  <Trash size={12} />
                </button>
              </>
            )}
          </div>
        </div>
        
        {isFolder && isExpanded && file.children && (
          <div>
            {file.children.map(child => renderFileItem(child, depth + 1))}
            {file.children.length === 0 && (
              <div 
                className="text-xs text-gray-400 italic py-1 px-2"
                style={{ paddingLeft: `${((depth + 1) * 12) + 8}px` }}
              >
                Empty folder
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderFolderSelect = () => {
    const renderOption = (file: FileItem, depth = 0) => {
      if (file.type !== "folder") return null;
      
      return (
        <React.Fragment key={file.id}>
          <option value={file.id} style={{ marginLeft: `${depth * 10}px` }}>
            {'\u00A0'.repeat(depth * 2)}{depth > 0 ? '└─ ' : ''}{file.name}
          </option>
          {file.children?.map(child => renderOption(child, depth + 1))}
        </React.Fragment>
      );
    };
    
    return (
      <select 
        value={parentForNewItem || ""}
        onChange={(e) => setParentForNewItem(e.target.value || undefined)}
        className="text-xs p-1 border rounded mb-2 w-full"
      >
        <option value="">Root directory</option>
        {files.map(file => renderOption(file))}
      </select>
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
        {files.map(file => renderFileItem(file))}
        {files.length === 0 && (
          <div className="text-gray-500 text-sm italic p-2">
            No files yet. Create your first file!
          </div>
        )}
      </div>
      
      {isCreatingFile && (
        <div className="p-3 border-t">
          <h4 className="text-xs font-medium mb-2">Create new item</h4>
          {renderFolderSelect()}
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
              placeholder={newItemType === "file" ? "filename.js" : "folder name"}
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
