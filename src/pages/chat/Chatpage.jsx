import React, { useEffect, useState } from "react";
import "./Chat.scss";
import "./chat-responsive.scss";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ChatPage = () => {
  const location = useLocation();
  const expert = location.state?.expert || {};
  const expert_img = location.state?.expert_img || {};

    const [authUserId, setauthWebUserId] = useState('');
     const getToken = () => {
      const auth_webId = localStorage.getItem('web_userId');
      setauthWebUserId(auth_webId)
    };

    const [messages,setMessages]= useState();
          const fetchMessages = async () => {
         
            try {
              const res = await fetch(
                `http://localhost:5000/chat/${authUserId}/${expert?.id}`
              );
              // "/chat/:senderId/:receiverId"
              const data = await res.json();
              setMessages(data.messages);
            } catch (error) {
              console.error("Error fetching messages:", error);
            }
          

          };
  
    useEffect(()=>{
      getToken();
      if(authUserId && expert?.id){
      fetchMessages();
      }
    },[authUserId, expert])

  const [text_msg, setTextMsg] = useState("");

  const sendMessage = async () => {
    try {
      if(!expert?.id || !authUserId){
    toast.error("Not getting id to chat")
      }else if(text_msg ==''){
        toast.error("Please type any message first")
      }else{
      const res = await fetch("http://localhost:5000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: authUserId,
          receiverId: expert?.id,
          text: text_msg,
        }),
      });
  
      const data = await res.json();
      if(data){
        fetchMessages();
        setTextMsg('');
      }
      console.log(data);
    }

    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  console.log("messages======",messages)


  return (
    <div className="chating-box">
      <div className="chat-expert-container">
        <img src={expert_img} alt={expert.name} className="expert-image" />
        <h2 className="expert-name">
          Chat with: <span>{expert.name}</span>
        </h2>
        <div className="chat-experts-specalization">
        <p className="expert-details">
          Expertise: <span>{expert.title}</span>
        </p>
        <div className="expert-details">{expert.expertise}</div>
    
        </div>
     
      </div>

      <div className="chat-container">
        <div className="chat-box">
          {messages?.map((msg, index) => (
            <div
              key={index}
              className={`chat-message 
               ${
              msg.senderId === authUserId ? "sent" : "received"
            }
              `}
            >
              <div className="message-bubble">
                <strong>{msg.sender}</strong>
                <p>{msg.text}</p>
                <span className="time">
                  {}
                {new Date(msg.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={text_msg}
            onChange={(e) => setTextMsg(e.target.value)}
          />
          {}
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
