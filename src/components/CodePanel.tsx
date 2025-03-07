
import React from "react";
import MonacoEditor from "./MonacoEditor";
import { Copy, Save, Download, Share } from "lucide-react";
import FileExplorer, { FileItem } from "./FileExplorer";
import { toast } from "sonner";

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

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${fileName}`);
  };

  const handleShare = () => {
    // In a real app, this would generate a shareable link
    toast.success("Share link copied to clipboard");
  };

  return (
    <div className="flex-1 p-4 overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <h2 className="text-sm font-medium text-gray-700 mr-2">Code Editor</h2>
          {fileName && (
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">{fileName}</span>
          )}
        </div>
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
            onClick={handleShare}
            className="flex items-center gap-1 text-xs px-2 py-1 bg-purple-500 hover:bg-purple-600 text-white rounded"
          >
            <Share size={14} />
            <span>Share</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1 text-xs px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded"
          >
            <Download size={14} />
            <span>Download</span>
          </button>
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
          >
            <Copy size={14} />
            <span>Copy</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden flex gap-4">
        {hasFileExplorer && (
          <div className="w-1/4">
            <FileExplorer 
              files={files}
              onFileSelect={onFileSelect}
              onFileCreate={onFileCreate}
              onFileDelete={onFileDelete}
              selectedFileId={selectedFileId}
            />
          </div>
        )}
        <div className={hasFileExplorer ? 'w-3/4' : 'w-full'}>
          <MonacoEditor code={code} onChange={onChange} fileName={fileName} />
        </div>
      </div>
    </div>
  );
};

export default CodePanel;
