import React, { useState, useRef, useEffect } from "react";

const CommunityHub = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      username: "Alice",
      avatar: "https://i.pravatar.cc/40?img=1",
      text: "I just finished my first DysleXa reading session!",
      timestamp: "10:30 AM",
      likes: 2,
    },
    {
      id: 2,
      username: "Bob",
      avatar: "https://i.pravatar.cc/40?img=2",
      text: "Proud to share that I completed 3 exercises today 🎉",
      timestamp: "10:35 AM",
      likes: 5,
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim() === "") return;

    const newEntry = {
      id: Date.now(),
      username: "Demo User",
      avatar: "https://i.pravatar.cc/40?img=3",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      likes: 0,
    };

    setMessages([...messages, newEntry]);
    setNewMessage("");
  };

  const handleLike = (id) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg
      )
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#A8FBD3] to-[#FDAAAA]">
      {/* Header */}
      <header className="bg-[#B95E82] text-white py-4 text-center text-2xl font-bold shadow-lg">
        🌟 Community Hub
      </header>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="flex items-start space-x-3 bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={msg.avatar}
              alt={msg.username}
              className="w-12 h-12 rounded-full border-2 border-[#59AC77]"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#59AC77]">
                  {msg.username}
                </span>
                <span className="text-xs text-gray-500">{msg.timestamp}</span>
              </div>
              <p className="text-gray-800 mt-1">{msg.text}</p>
              <div className="flex items-center space-x-2 mt-2">
                <button
                  onClick={() => handleLike(msg.id)}
                  className="text-sm text-[#B95E82] hover:text-[#902b55] transition-colors"
                >
                  ❤️ Like
                </button>
                <span className="text-sm text-gray-600">{msg.likes} likes</span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-white shadow-lg flex items-center space-x-2 sticky bottom-0">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Share your thoughts or achievements... ✨"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#59AC77]"
        />
        <button
          onClick={handleSend}
          className="bg-[#59AC77] hover:bg-[#4a9165] text-white px-5 py-2 rounded-full font-medium shadow-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CommunityHub;
