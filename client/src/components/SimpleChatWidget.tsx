import React, { useState } from 'react';
import { MessageSquare, X, Phone } from 'lucide-react';

const SimpleChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{role: string; content: string}>>([
    { role: 'assistant', content: 'Hello! I\'m here to help with your solar energy questions. Ask me about:\n• Solar panel installations\n• Battery storage options\n• Financing plans\n• Energy savings' }
  ]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, 
        { role: 'user', content: message },
        { role: 'assistant', content: 'Thanks for your question! Please call us at (530) 226-0701 for immediate assistance with your solar energy needs.' }
      ]);
      setMessage('');
    }
  };

  return (
    <>
      {/* Support Toolbar */}
      <div className="fixed bottom-5 right-5 flex gap-3 z-[9999]">
        {/* Voice Support Button */}
        <a 
          href="tel:5302260701"
          className="w-14 h-14 bg-[#1a2332] rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
          aria-label="Call Support"
        >
          <Phone className="w-6 h-6 text-white" />
        </a>
        
        {/* Chat Button */}
        <button
          onClick={toggleChat}
          className="w-14 h-14 bg-[#ff6b35] rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
          aria-label="Open Chat"
        >
          <MessageSquare className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-5 w-[350px] h-[500px] bg-white rounded-xl shadow-2xl flex flex-col z-[10000]">
          {/* Header */}
          <div className="bg-[#ff6b35] text-white p-5 rounded-t-xl flex justify-between items-center">
            <span className="font-bold text-lg">Solar Energy Assistant</span>
            <button 
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-5 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
                  msg.role === 'user' 
                    ? 'bg-[#ff6b35] text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {msg.content.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-5 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent"
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-[#ff6b35] text-white rounded-md hover:bg-[#e55a2b] transition-colors"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SimpleChatWidget;