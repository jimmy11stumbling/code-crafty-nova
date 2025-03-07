
import React, { forwardRef, useEffect, useState } from "react";
import { Code, ExternalLink, Terminal, RefreshCw } from "lucide-react";

interface PreviewPanelProps {
  initialContent: string;
}

const PreviewPanel = forwardRef<HTMLIFrameElement, PreviewPanelProps>(
  ({ initialContent }, ref) => {
    const [view, setView] = useState<"preview" | "code" | "console">("preview");
    const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
    
    useEffect(() => {
      const iframe = ref as React.RefObject<HTMLIFrameElement>;
      if (iframe.current) {
        const iframeDoc = iframe.current.contentDocument || iframe.current.contentWindow?.document;
        
        if (iframeDoc) {
          iframeDoc.open();
          
          // Add a script to capture console logs
          const consoleScript = `
            <script>
              const originalConsole = console;
              console = {
                log: function() {
                  originalConsole.log.apply(originalConsole, arguments);
                  const args = Array.from(arguments).map(arg => {
                    if (typeof arg === 'object') return JSON.stringify(arg);
                    return String(arg);
                  });
                  window.parent.postMessage({
                    type: 'console.log',
                    message: args.join(' ')
                  }, '*');
                },
                warn: function() {
                  originalConsole.warn.apply(originalConsole, arguments);
                  const args = Array.from(arguments).map(arg => {
                    if (typeof arg === 'object') return JSON.stringify(arg);
                    return String(arg);
                  });
                  window.parent.postMessage({
                    type: 'console.warn',
                    message: args.join(' ')
                  }, '*');
                },
                error: function() {
                  originalConsole.error.apply(originalConsole, arguments);
                  const args = Array.from(arguments).map(arg => {
                    if (typeof arg === 'object') return JSON.stringify(arg);
                    return String(arg);
                  });
                  window.parent.postMessage({
                    type: 'console.error',
                    message: args.join(' ')
                  }, '*');
                }
              };
            </script>
          `;
          
          // Insert the script at the beginning of the HTML
          const contentWithConsoleCapture = consoleScript + initialContent;
          
          iframeDoc.write(contentWithConsoleCapture);
          iframeDoc.close();
          
          // Listen for console logs from the iframe
          const handleMessage = (event: MessageEvent) => {
            if (event.data && event.data.type && event.data.type.startsWith('console.')) {
              setConsoleLogs(prev => [...prev, event.data.message]);
            }
          };
          
          window.addEventListener('message', handleMessage);
          
          return () => {
            window.removeEventListener('message', handleMessage);
          };
        }
      }
    }, [initialContent, ref]);

    const clearConsole = () => {
      setConsoleLogs([]);
    };

    const refreshPreview = () => {
      const iframe = ref as React.RefObject<HTMLIFrameElement>;
      if (iframe.current) {
        const iframeDoc = iframe.current.contentDocument || iframe.current.contentWindow?.document;
        if (iframeDoc) {
          iframeDoc.location.reload();
        }
      }
    };

    return (
      <div className="h-full flex flex-col">
        <div className="p-3 border-b bg-gray-50 flex justify-between items-center">
          <div className="flex">
            <button
              onClick={() => setView("preview")}
              className={`text-xs mr-2 px-3 py-1 rounded-md flex items-center ${
                view === "preview" ? "bg-blue-100 text-blue-700" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <ExternalLink size={14} className="mr-1" />
              Preview
            </button>
            <button
              onClick={() => setView("code")}
              className={`text-xs mr-2 px-3 py-1 rounded-md flex items-center ${
                view === "code" ? "bg-blue-100 text-blue-700" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <Code size={14} className="mr-1" />
              HTML
            </button>
            <button
              onClick={() => setView("console")}
              className={`text-xs px-3 py-1 rounded-md flex items-center ${
                view === "console" ? "bg-blue-100 text-blue-700" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <Terminal size={14} className="mr-1" />
              Console
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={refreshPreview}
              className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded flex items-center"
            >
              <RefreshCw size={14} className="mr-1" />
              Refresh
            </button>
            <button 
              onClick={() => window.open("", "_blank")?.document.write(initialContent)}
              className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded flex items-center"
            >
              <ExternalLink size={14} className="mr-1" />
              Open in New Tab
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden">
          {view === "preview" && (
            <iframe
              ref={ref}
              title="preview"
              className="w-full h-full border-none"
              sandbox="allow-scripts allow-same-origin"
            />
          )}
          
          {view === "code" && (
            <div className="bg-gray-800 text-gray-200 p-4 h-full overflow-auto font-mono text-sm whitespace-pre-wrap">
              {initialContent}
            </div>
          )}
          
          {view === "console" && (
            <div className="bg-gray-800 text-gray-200 h-full overflow-auto flex flex-col">
              <div className="p-2 border-b border-gray-700 flex justify-between">
                <span className="text-xs">Console Logs</span>
                <button
                  onClick={clearConsole}
                  className="text-xs text-gray-400 hover:text-white"
                >
                  Clear
                </button>
              </div>
              <div className="flex-1 p-2 font-mono text-sm">
                {consoleLogs.length === 0 ? (
                  <div className="text-gray-500 italic">No console logs yet...</div>
                ) : (
                  consoleLogs.map((log, index) => (
                    <div key={index} className="mb-1 border-b border-gray-700 pb-1">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

PreviewPanel.displayName = "PreviewPanel";

export default PreviewPanel;
