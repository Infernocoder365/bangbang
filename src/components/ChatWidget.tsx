'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Message {
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = () => {
    if (inputText.trim() === '') return;
    
    const now = new Date();
    const timestamp = `${now.toLocaleDateString()}, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    
    const newMessage: Message = {
      text: inputText,
      sender: 'user',
      timestamp
    };
    
    setMessages([...messages, newMessage]);
    setInputText('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        text: "We'll get back to you soon!",
        sender: 'ai',
        timestamp
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <button 
        onClick={toggleChat}
        className="bg-black text-white px-4 py-2 rounded flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span className="ml-2">Let's Chat!</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-12 right-0 w-80 h-96 bg-white border border-gray-300 shadow-lg flex flex-col">
          {/* Chat Header */}
          <div className="bg-black text-white p-3 flex justify-between items-center">
            <div>
              <div className="font-bold">Let's Chat!</div>
              <div className="text-xs flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                We'll reply as soon as we can
              </div>
            </div>
            <button onClick={toggleChat} className="text-white">
              ×
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 p-3 overflow-y-auto bg-gray-100">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 text-sm py-4">
                Send a message to start chatting
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className="inline-block max-w-[80%]">
                    <div className="text-xs text-gray-500 mb-1">
                      {msg.timestamp}
                    </div>
                    <div className={`p-2 rounded ${msg.sender === 'user' ? 'bg-gray-300' : 'bg-white border border-gray-200'}`}>
                      {msg.text}
                    </div>
                    {msg.sender === 'user' && (
                      <div className="text-xs text-gray-500 mt-1">Sent</div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          
          {/* Chat Input */}
          <div className="border-t border-gray-300 p-2 flex">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Write your message..."
              className="flex-1 p-2 border border-gray-300 rounded-l"
            />
            <div className="flex">
              <button className="p-2 bg-gray-100 border border-gray-300 border-l-0">
                <span role="img" aria-label="emoji">😊</span>
              </button>
              <button 
                onClick={sendMessage}
                className="p-2 bg-gray-100 border border-gray-300 border-l-0 rounded-r"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;