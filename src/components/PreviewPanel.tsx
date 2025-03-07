
import React, { forwardRef, useEffect } from "react";

interface PreviewPanelProps {
  initialContent: string;
}

const PreviewPanel = forwardRef<HTMLIFrameElement, PreviewPanelProps>(
  ({ initialContent }, ref) => {
    useEffect(() => {
      const iframe = ref as React.RefObject<HTMLIFrameElement>;
      if (iframe.current) {
        const iframeDoc = iframe.current.contentDocument || iframe.current.contentWindow?.document;
        
        if (iframeDoc) {
          iframeDoc.open();
          iframeDoc.write(initialContent);
          iframeDoc.close();
        }
      }
    }, [initialContent, ref]);

    return (
      <div className="h-full flex flex-col">
        <div className="p-3 border-b bg-gray-50 flex justify-between items-center">
          <h3 className="font-medium text-sm">Preview</h3>
          <button 
            onClick={() => window.open("", "_blank")?.document.write(initialContent)}
            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded"
          >
            Open in New Tab
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <iframe
            ref={ref}
            title="preview"
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    );
  }
);

PreviewPanel.displayName = "PreviewPanel";

export default PreviewPanel;
