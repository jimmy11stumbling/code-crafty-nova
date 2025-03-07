
import React, { useRef } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";

interface MonacoEditorProps {
  code: string;
  onChange: (code: string) => void;
  language?: string;
  fileName?: string;
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({ 
  code, 
  onChange, 
  language,
  fileName = "index.html"
}) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const detectLanguage = (): string => {
    if (language) return language;
    
    // Detect language from file extension
    if (fileName.endsWith('.html')) return 'html';
    if (fileName.endsWith('.js')) return 'javascript';
    if (fileName.endsWith('.jsx')) return 'javascript';
    if (fileName.endsWith('.ts')) return 'typescript';
    if (fileName.endsWith('.tsx')) return 'typescript';
    if (fileName.endsWith('.css')) return 'css';
    if (fileName.endsWith('.json')) return 'json';
    if (fileName.endsWith('.md')) return 'markdown';
    
    return 'html'; // Default
  };

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, _monaco: Monaco) => {
    editorRef.current = editor;
    editor.focus();
    
    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // Save functionality can be implemented here
      console.log("Save command triggered");
    });
  };

  return (
    <div className="h-full w-full overflow-hidden border rounded-md">
      <Editor
        height="100%"
        language={detectLanguage()}
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
          lineNumbers: "on",
          folding: true,
          suggest: {
            showMethods: true,
            showFunctions: true,
            showConstructors: true,
            showFields: true,
            showVariables: true,
            showClasses: true,
            showStructs: true,
            showInterfaces: true,
            showEnums: true,
          }
        }}
        theme="vs-dark"
      />
    </div>
  );
};

export default MonacoEditor;
