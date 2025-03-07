
import React from "react";
import MonacoEditor from "./MonacoEditor";
import { Copy } from "lucide-react";

interface CodePanelProps {
  code: string;
  onChange: (code: string) => void;
}

const CodePanel: React.FC<CodePanelProps> = ({ code, onChange }) => {
  return (
    <div className="flex-1 p-4 overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-medium text-gray-700">Code Editor</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => navigator.clipboard.writeText(code)}
            className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
          >
            <Copy size={14} />
            <span>Copy</span>
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <MonacoEditor code={code} onChange={onChange} />
      </div>
    </div>
  );
};

export default CodePanel;
