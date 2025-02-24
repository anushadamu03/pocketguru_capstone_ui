import React, { useState, useEffect, useRef } from "react";

const ChatComponent = ({ messages, currentUserId }) => {
  const chatContainerRef = useRef(null);
  const [chatMessages, setChatMessages] = useState(messages);

  useEffect(() => {
    chatContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <div className="chat-container">
      <div className="chat-header">Chat App</div>

      <div className="chat-messages">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${
              msg.senderId === currentUserId ? "sent" : "received"
            }`}
          >
            {/* Show 'R' icon for received messages */}
            {msg.senderId !== currentUserId && <div className="icon">R</div>}

            <div className="message-bubble">
              <p>{msg.text}</p>
              <p className="message-time">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </p>
            </div>

            {/* Show 'S' icon for sent messages */}
            {msg.senderId === currentUserId && <div className="icon">S</div>}
          </div>
        ))}
        <div ref={chatContainerRef}></div>
      </div>

      <div className="chat-input-container">
        <input type="text" placeholder="Type a message..." className="chat-input" />
        <button className="chat-send-btn">Send</button>
      </div>
    </div>
  );
};

// Example Usage
const ChatApp = () => {
  const messages = [
    {
      id: 1,
      senderId: "4444",
      receiverId: "1234",
      text: "message22222222222",
      createdAt: "2025-02-18T17:23:20.000Z",
    },
    {
      id: 3,
      senderId: "4444",
      receiverId: "1234",
      text: "hello 1",
      createdAt: "2025-02-19T07:37:24.000Z",
    },
    {
      id: 4,
      senderId: "1234",
      receiverId: "4444",
      text: "hello yes",
      createdAt: "2025-02-19T07:37:59.000Z",
    },
  ];

  return <ChatComponent messages={messages} currentUserId="4444" />;
};

export default ChatApp;
