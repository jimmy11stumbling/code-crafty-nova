
import React, { useState, useRef, useEffect } from "react";

interface ChatInterfaceProps {
  onSendMessage: (message: string) => Promise<string>;
  isProcessing: boolean;
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onSendMessage, isProcessing }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi! I'm your AI coding assistant. How can I help you today?",
      sender: "assistant"
    }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isProcessing) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user"
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    try {
      const response = await onSendMessage(input);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "assistant"
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, there was an error processing your request.",
        sender: "assistant"
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className="h-80 border-t flex flex-col">
      <div className="p-3 border-b bg-gray-50">
        <h3 className="font-medium text-sm">AI Assistant</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map(message => (
          <div
            key={message.id}
            className={`p-2 rounded-lg max-w-[80%] ${
              message.sender === "user"
                ? "ml-auto bg-blue-100 text-blue-900"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {message.content}
          </div>
        ))}
        {isProcessing && (
          <div className="bg-gray-100 text-gray-800 p-2 rounded-lg max-w-[80%]">
            <div className="flex space-x-1">
              <div className="animate-bounce">●</div>
              <div className="animate-bounce" style={{ animationDelay: "0.2s" }}>●</div>
              <div className="animate-bounce" style={{ animationDelay: "0.4s" }}>●</div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-3 border-t flex">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask me to add features to your code..."
          className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isProcessing}
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded-r-md ${
            isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
          disabled={isProcessing}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
