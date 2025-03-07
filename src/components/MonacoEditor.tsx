
import React, { useRef } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";

interface MonacoEditorProps {
  code: string;
  onChange: (code: string) => void;
  language?: string;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({ 
  code, 
  onChange, 
  language = "html" 
}) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, _monaco: Monaco) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div className="h-full w-full overflow-hidden border rounded-md">
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={(value) => onChange(value || "")}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
        theme="vs-dark"
      />
    </div>
  );
};

export default MonacoEditor;
