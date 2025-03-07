
import React, { useRef, useEffect } from "react";

interface CodePanelProps {
  code: string;
  onChange: (code: string) => void;
}

const CodePanel: React.FC<CodePanelProps> = ({ code, onChange }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize the textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [code]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex-1 p-4 overflow-hidden flex flex-col">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-medium text-gray-700">Code Editor</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => navigator.clipboard.writeText(code)}
            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
          >
            Copy
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto border rounded-md bg-gray-50">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleChange}
          className="w-full h-full p-3 font-mono text-sm resize-none focus:outline-none"
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default CodePanel;
