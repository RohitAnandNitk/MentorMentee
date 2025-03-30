import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Button,
  Backdrop,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";
import config from "../config.js";

const BaseURL = config.BASE_URL;
const socket = io(BaseURL, {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err);
});

const ChatBox = ({ personName, mentorId, menteeId, onClose }) => {
  const { user } = useAuth();
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("MentorId:", mentorId);
    console.log("MenteeId:", menteeId);
    fetchChatHistory();
  }, [personName, mentorId, menteeId]);

  const fetchChatHistory = async () => {
    console.log("Fetching chat history...");
    try {
      const response = await axios.post(`${BaseURL}/chat/get-or-create-chat`, {
        menteeId,
        mentorId,
      });
      console.log("Chat history response:", response.data);
      if (response.data.success) {
        setChatId(response.data.chatId);
        setMessages(response.data.messages || []);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    if (chatId) {
      socket.emit("join_chat", { chatId });
      console.log("Joined chat room:", chatId);
    }
  }, [chatId]);

  useEffect(() => {
    if (!chatId) return;

    const handleMessageReceive = (data) => {
      console.log("Received message:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.on("receiveMessage", handleMessageReceive);
    return () => {
      socket.off("receiveMessage", handleMessageReceive);
    };
  }, [chatId]);

  const sendMessage = async () => {
    if (!message.trim() || !chatId || !user?.userType) return;

    console.log("Sending message:", message);
    const newMessage = {
      chatId,
      senderId: menteeId,
      receiverId: mentorId,
      role: user.userType,
      message,
    };

    socket.emit("sendMessage", newMessage);
    console.log("Message emitted via socket");

    try {
      const response = await axios.post(
        `${BaseURL}/chat/send-message`,
        newMessage
      );
      console.log("Message saved:", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setMessage("");
  };
  const chatBoxRef = useRef(null);
  return (
    <>
      <Backdrop
        open={true}
        sx={{ zIndex: 1000, backdropFilter: "blur(5px)" }}
      />

      <Card
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 450,
          height: 450,
          display: "flex",
          flexDirection: "column",
          boxShadow: 5,
          zIndex: 1100,
          borderRadius: 4,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">{personName}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </CardContent>

        {/* <CardContent
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            borderTop: "1px solid #ddd",
            borderBottom: "1px solid #ddd",
          }}
        > */}
        <div
          className="flex-1 overflow-y-auto p-4 bg-gray-100 rounded shadow-md"
          style={{ maxHeight: "70vh" }}
          ref={chatBoxRef}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 p-3 rounded-lg max-w-xs ${
                msg.userType === "mentor"
                  ? "bg-blue-300 text-black mr-auto" // Mentor messages on left
                  : "bg-green-500 text-white ml-auto" // Mentee messages on right
              }`}
            >
              <p>{msg.message}</p>
            </div>
          ))}
        </div>
        {/* </CardContent> */}

        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            fullWidth
            placeholder="Type a message..."
            size="small"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button variant="contained" sx={{ ml: 1 }} onClick={sendMessage}>
            Send
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default ChatBox;
