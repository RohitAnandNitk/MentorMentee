// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";
// import { jwtDecode } from "jwt-decode"; // Import jwt-decode
// import "./ChatPage.css"; // Import CSS file

// const socket = io("http://localhost:4000"); // Connect to backend

// const ChatPage = () => {
//   const menteeId = "679b31262ddd4d4d9ba3b1eb";
//   const mentorId = "679676affaea7b0ba3134295";
//   const [userId, setUserId] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [chatId, setChatId] = useState(null);
//   const [userType, setUserType] = useState(null); // Store userType from token

//   const [chats, setChats] = useState([]);

//   // hard coded
//   const buyerId = "c3185ff0-fabd-415f-ab11-3459cc147538";
//   const sellerId = "ed784258-a737-4157-b0a9-08225b7c7c30";

//   // Extract userType from Token
//   useEffect(() => {
//     const token = localStorage.getItem("token"); // Get token from localStorage
//     if (token) {
//       try {
//         const decodedToken = jwtDecode(token);
//         setUserId(decodedToken.userId);
//         setUserType(decodedToken.role); // Set userType from token
//       } catch (error) {
//         console.error("Invalid token:", error);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (menteeId && mentorId) {
//       fetchAllChats();
//       fetchChatHistory();
//     }
//   }, [menteeId, mentorId]);

//   const fetchAllChats = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:4000/chat/get-all-chats?userId=${mentorId}`
//       );

//       if (response.data.success) {
//         console.log("All chats:", response.data.chats);
//         setChats(response.data.chats);
//       }
//     } catch (error) {
//       console.error("Error fetching chats:", error);
//     }
//   };

//   const fetchChatHistory = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:4000/chat/get-or-create-chat",
//         { menteeId, mentorId }
//       );
//       if (response.data.success) {
//         setChatId(response.data.chatId);
//         setMessages(response.data.messages || []);
//       }
//     } catch (error) {
//       console.error("Error fetching chat history:", error);
//     }
//   };

//   // Ensure socket joins the chat room after chatId is set
//   useEffect(() => {
//     if (chatId) {
//       console.log(`Joining chat room: ${chatId}`);
//       socket.emit("join_chat", { chatId });
//     }
//   }, [chatId]);

//   // Listen for incoming messages
//   useEffect(() => {
//     if (!chatId) return;
//     const handleMessageReceive = (data) => {
//       console.log("Received message:", data);
//       setMessages((prevMessages) => [...prevMessages, data]); // ✅ Update messages correctly
//     };

//     socket.on("receiveMessage", handleMessageReceive);

//     return () => {
//       socket.off("receiveMessage", handleMessageReceive);
//     };
//   }, [chatId]);

//   const sendMessage = async () => {
//     if (message.trim() === "" || !chatId || !userType) {
//       console.error("Missing required fields in sendMessage:", {
//         chatId,
//         userType,
//         message,
//       });
//       return;
//     }

//     let senderId, receiverId;
//     if (userType === "mentor") {
//       senderId = mentorId;
//       receiverId = menteeId;
//     } else {
//       senderId = menteeId;
//       receiverId = mentorId;
//     }

//     const newMessage = {
//       chatId,
//       senderId,
//       receiverId,
//       role: userType,
//       message,
//     };
//     socket.emit("sendMessage", newMessage);

//     try {
//       const response = await axios.post(
//         "http://localhost:4000/chat/send-message",
//         newMessage
//       );
//       if (response.data.success) {
//         // setMessages((prev) => [...prev, response.data.newMessage]);
//       } else {
//         console.error("Message sending failed:", response.data.error);
//       }
//     } catch (error) {
//       console.error(
//         "Error sending message:",
//         error.response?.data || error.message
//       );
//     }

//     setMessage("");
//   };

//   const chatBoxRef = useRef(null); // Add this ref
//   // Scroll to the bottom whenever messages update
//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   }, [messages]); // Runs every time messages update

//   return (
//     <div className="chat-container">
//       <div className="chat-box" ref={chatBoxRef}>
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${
//               msg.senderId === userId ? "sent" : "received"
//             }`}
//           >
//             <p>{msg.message}</p>
//           </div>
//         ))}
//       </div>
//       <div className="input-box">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//         />
//         <button onClick={sendMessage}>Send</button>r
//       </div>
//     </div>
//   );
// };

// export default ChatPage;
