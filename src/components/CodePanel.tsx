
import React from "react";
import MonacoEditor from "./MonacoEditor";
import { Copy, Save } from "lucide-react";
import FileExplorer, { FileItem } from "./FileExplorer";

interface CodePanelProps {
  code: string;
  onChange: (code: string) => void;
  files?: FileItem[];
  onFileSelect?: (file: FileItem) => void;
  onFileCreate?: (name: string, type: "file" | "folder", parentId?: string) => void;
  onFileDelete?: (id: string) => void;
  selectedFileId?: string | null;
  fileName?: string;
  onSave?: () => void;
}

const CodePanel: React.FC<CodePanelProps> = ({ 
  code, 
  onChange, 
  files = [],
  onFileSelect = () => {},
  onFileCreate = () => {},
  onFileDelete = () => {},
  selectedFileId = null,
  fileName = "index.html",
  onSave
}) => {
  const hasFileExplorer = files.length > 0;

  return (
    <div className="flex-1 p-4 overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-medium text-gray-700">Code Editor</h2>
        <div className="flex space-x-2">
          {onSave && (
            <button
              onClick={onSave}
              className="flex items-center gap-1 text-xs px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              <Save size={14} />
              <span>Save</span>
            </button>
          )}
          <button
            onClick={() => navigator.clipboard.writeText(code)}
            className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
          >
            <Copy size={14} />
            <span>Copy</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden flex">
        {hasFileExplorer && (
          <div className="w-1/4 mr-4">
            <FileExplorer 
              files={files}
              onFileSelect={onFileSelect}
              onFileCreate={onFileCreate}
              onFileDelete={onFileDelete}
              selectedFileId={selectedFileId}
            />
          </div>
        )}
        <div className={`${hasFileExplorer ? 'w-3/4' : 'w-full'}`}>
          <MonacoEditor code={code} onChange={onChange} fileName={fileName} />
        </div>
      </div>
    </div>
  );
};

export default CodePanel;
