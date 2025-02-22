import React, { useState } from 'react'
import ChatApp from './ChatApp';

const Home = () => {

    const sendMessage = async () => {
        try {
          const res = await fetch("http://localhost:5000/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              senderId: "1234",
              receiverId: "4444",
              text: "hello yes",
            }),
          });
      
          const data = await res.json();
          console.log(data);
        } catch (error) {
          console.error("Error sending message:", error);
        }
      };

const [messages,setMessages]= useState();
      const fetchMessages = async () => {
        try {
          const res = await fetch(
            `http://localhost:5000/chat/${'4444'}/${'1234'}`
          );
          // "/chat/:senderId/:receiverId"
          const data = await res.json();
          setMessages(data.messages);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
      
      console.log("messages=====",messages)

      const [users, setUsers] = useState([]);
      const fetchUsers = async (role) => {
        try {
          const url =  `http://localhost:5000/all-users?role=${role}` ;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          const data = await response.json();
          setUsers(data.users);
        } catch (error) {
          console.error('Error fetching users:', error.message);
        }
      };

 console.log("users====",users)

  return (
    <div>
      {/* <br />
      <br />
      <br />
      <br />
      <br />

      <button onClick={()=>sendMessage()}>Send message</button>
      <br />
      <br />
      <button onClick={()=>fetchMessages()}>receive message</button>
      <br />
      <br />
      <br />
      <br />
      <button onClick={()=>fetchUsers('Student')}> All users</button>
      <br />
      <ChatApp /> */}
    </div>
  )
}

export default Home
