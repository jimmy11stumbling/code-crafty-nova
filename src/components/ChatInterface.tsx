
import React, { useState, useRef, useEffect } from "react";
import { Send, CornerUpRight } from "lucide-react";

interface ChatInterfaceProps {
  onSendMessage: (message: string) => Promise<string>;
  isProcessing: boolean;
  suggestions?: string[];
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  onSendMessage, 
  isProcessing,
  suggestions = [
    "Create a responsive navbar",
    "Add a contact form",
    "Create an image gallery",
    "Add a login form"
  ]
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi! I'm your AI coding assistant. How can I help you today?",
      sender: "assistant",
      timestamp: new Date()
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
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    try {
      const response = await onSendMessage(input);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, there was an error processing your request.",
        sender: "assistant",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
            <div className="flex flex-col">
              <div className="pb-1">
                {message.content}
              </div>
              <div className="text-right text-xs text-gray-500">
                {formatTime(message.timestamp)}
              </div>
            </div>
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
      
      {/* Suggestions */}
      <div className="p-2 border-t bg-gray-50 flex gap-2 overflow-x-auto">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            className="text-xs whitespace-nowrap px-2 py-1 bg-white border rounded-full hover:bg-gray-100 flex items-center"
          >
            <CornerUpRight size={12} className="mr-1" />
            {suggestion}
          </button>
        ))}
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
          className={`px-4 py-2 rounded-r-md flex items-center justify-center ${
            isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
          disabled={isProcessing}
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
