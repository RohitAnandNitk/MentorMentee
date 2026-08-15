import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useAuth } from "../components/AuthContext";
import config from "../config.js";
import "./ChatPage.css";

const BaseURL = config.BASE_URL;

const ChatPage = () => {
  const { user, isLoggedIn } = useAuth();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [chatId, setChatId] = useState(null);
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const chatBoxRef = useRef(null);

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(BaseURL, {
      transports: ["websocket", "polling"],
      withCredentials: true,
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn || !user?.userId) return;

    const fetchAllChats = async () => {
      try {
        const response = await axios.get(`${BaseURL}/chat/get-all-chats/${user.userId}`);
        if (response.data.success) {
          setChats(response.data.chats || []);
          if (response.data.chats && response.data.chats.length > 0) {
            setActiveChat(response.data.chats[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchAllChats();
  }, [isLoggedIn, user]);

  useEffect(() => {
    if (!activeChat) return;

    setChatId(activeChat._id);
    setMessages(activeChat.history || []);

    if (socketRef.current) {
      socketRef.current.emit("join_chat", { chatId: activeChat._id });
    }
  }, [activeChat]);

  useEffect(() => {
    if (!chatId || !socketRef.current) return;

    const handleMessageReceive = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socketRef.current.on("receiveMessage", handleMessageReceive);

    return () => {
      if (socketRef.current) {
        socketRef.current.off("receiveMessage", handleMessageReceive);
      }
    };
  }, [chatId]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim() || !chatId || !user?.userType) return;

    const newMessage = {
      chatId,
      senderId: user.userId,
      role: user.userType,
      message,
    };

    if (socketRef.current) {
      socketRef.current.emit("sendMessage", newMessage);
    }

    try {
      await axios.post(`${BaseURL}/chat/send-message`, newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setMessage("");
  };

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-xl font-semibold text-gray-700">Please log in to access messages.</p>
      </div>
    );
  }

  return (
    <div className="flex h-[85vh] bg-gray-100 m-4 rounded-lg shadow-lg overflow-hidden">
      {/* Sidebar - Chat list */}
      <div className="w-1/3 bg-white border-r overflow-y-auto">
        <div className="p-4 border-b bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">Your Conversations</h2>
        </div>
        {chats.length === 0 ? (
          <p className="p-4 text-gray-500 text-center">No active chats found.</p>
        ) : (
          chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => setActiveChat(chat)}
              className={`p-4 border-b cursor-pointer transition hover:bg-gray-50 ${
                activeChat?._id === chat._id ? "bg-blue-50" : ""
              }`}
            >
              <h4 className="font-semibold text-gray-800">
                Chat #{chat._id.substring(chat._id.length - 6)}
              </h4>
              <p className="text-sm text-gray-500 truncate">
                {chat.lastMessage || "No messages yet"}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Main Chat Window */}
      <div className="w-2/3 flex flex-col bg-white">
        {activeChat ? (
          <>
            <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
              <h3 className="font-bold text-gray-800">
                Chat Conversation #{activeChat._id.substring(activeChat._id.length - 6)}
              </h3>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50" ref={chatBoxRef}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.userType === user.userType ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md p-3 rounded-lg text-sm shadow ${
                      msg.userType === user.userType
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white text-gray-800 border rounded-bl-none"
                    }`}
                  >
                    <p>{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t flex items-center space-x-2 bg-white">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start chatting.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
