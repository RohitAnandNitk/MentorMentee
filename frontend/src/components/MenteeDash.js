import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Home,
  MessageSquare,
  User,
  ArrowLeft,
  UserRoundPen,
  Copy,
  UsersRound,
} from "lucide-react";
import axios from "axios";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import config from "../config.js";
import MenteeYour from "./YourMentee.js";
import MentorMenteeMatching from "./MentorMenteeMatching.js";
import { useAuth } from "./AuthContext";
import MenteeRequests from "./MenteeRequests.js";
const BaseURL = config.BASE_URL;
const socket = io(BaseURL, {
  transports: ["websocket", "polling"],
  withCredentials: true,
}); // Adjust to your backend URL

const MenteeDash = () => {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Home");
  const [messagingUsers, setMessagingUsers] = useState(null);
  const [showBackButton, setShowBackButton] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [mentorDetails, setMentorDetails] = useState(null); // Set initially to null

  useEffect(() => {
    if (!user.userType || !user.userId) return; // Prevent execution if values are missing

    const fetchUserData = async () => {
      try {
        console.log("Fetching user data...");
        const response = await axios.get(
          `${BaseURL}/${user.userType}/${user.userId}`
        );
        console.log("User data received:", response.data.data);
        const userData = response.data.data;

        setMentorDetails({
          name: userData.name || "",
          email: userData.email || "",
          fieldOfInterest: userData.fieldOfInterest || [],
          bio: userData.bio || "",
          availability: userData.availability || "Available",
        });

        setLoading(false);
      } catch (error) {
        console.log("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user.userType, user.userId]);

  const chatBoxRef = useRef(null);
  // Fetch chat history when a mentee is selected
  useEffect(() => {
    if (selectedUserId && user.userId) {
      fetchChatHistory();
    }
  }, [selectedUserId, user.userId]);

  const fetchChatHistory = async () => {
    console.log();
    try {
      const response = await axios.post(`${BaseURL}/chat/get-or-create-chat`, {
        menteeId: user.userId,
        mentorId: selectedUserId,
      });
      if (response.data.success) {
        setChatId(response.data.chatId);
        setMessages(response.data.messages || []);
      }
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  // Join chat room via Socket.IO
  useEffect(() => {
    if (chatId) {
      socket.emit("join_chat", { chatId });
    }
  }, [chatId]);

  useEffect(() => {
    if (!chatId || !socket) return; // Ensure socket is available

    const handleMessageReceive = (data) => {
      console.log("data :" + data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.on("receiveMessage", handleMessageReceive);

    return () => {
      socket.off("receiveMessage", handleMessageReceive);
    };
  }, [chatId, socket]); // Add `socket` as a dependency

  // Send a message
  const sendMessage = async () => {
    if (!message.trim() || !chatId || !user.userType) return;

    const newMessage = {
      chatId,
      senderId: user.userId,
      receiverId: selectedUserId,
      role: user.userType,
      message,
    };

    socket.emit("sendMessage", newMessage);

    try {
      const response = await axios.post(
        `${BaseURL}/chat/send-message`,
        newMessage
      );
      if (!response.data.success) {
        console.error("Failed to save message:", response.data.error);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setMessage("");
  };

  // Sidebar toggle for mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle tab navigation
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab !== "Messaging") {
      setMessagingUsers(null);
      setShowBackButton(false);
      setSelectedUserId(null);
      setChatId(null);
      setMessages([]);
    }
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  // Fetch all mentor for messaging
  const handleMessagingClick = async () => {
    setActiveTab("Messaging");
    console.log("you are a ", user.userType);
    console.log("your id ", user.userId);
    try {
      const response = await axios.get(
        `${BaseURL}/chat/get-all-chats/${user.userId}`
      );
      if (response.data.success) {
        const allChats = response.data.chats;
        const idAndName = await Promise.all(
          allChats.map(async (chat) => ({
            id: chat.mentorId,
            name: await getNameofMentor(chat.mentorId),
          }))
        );
        setMessagingUsers(idAndName);
        setShowBackButton(true);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
    if (window.innerWidth < 768) {
      setIsSidebarOpen(true);
    }
  };

  // Go back to contact list
  const handleBackClick = () => {
    setActiveTab("Home");
    setMessagingUsers(null);
    setSelectedUserId(null);
    setChatId(null);
    setMessages([]);
  };

  // Select a mentee to chat with
  const handleUserSelect = (user) => {
    setSelectedUserId(user.id);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  // Fetch mentee name
  const getNameofMentor = async (id) => {
    try {
      const response = await axios.get(`${BaseURL}/mentor/${id}`);
      if (response.data.success) {
        return response.data.data.name;
      }
    } catch (error) {
      console.error("Error fetching mentor name:", error);
      return "Unknown";
    }
  };

  // Render sidebar content
  const renderSidebarContent = () => {
    if (messagingUsers) {
      return (
        <div>
          {showBackButton && (
            <button
              className="text-white bg-slate-800 hover:bg-slate-700 mb-2 p-2 rounded flex items-center"
              onClick={handleBackClick}
            >
              <ArrowLeft size={20} className="mr-1" /> Back
            </button>
          )}
          <h3 className="text-lg font-semibold mb-2">Select a Contact</h3>
          <ul className="space-y-2">
            {messagingUsers.map((user) => (
              <li
                key={user.id}
                className={`p-2 cursor-pointer rounded ${
                  selectedUserId === user.id
                    ? "bg-gray-700"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => handleUserSelect(user)}
              >
                {user.name}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return (
      <>
        <h2 className="text-xl font-bold mb-4">Mentee Dashboard</h2>
        <ul className="space-y-3">
          <li
            className={`p-2 hover:bg-gray-700 cursor-pointer flex items-center rounded ${
              activeTab === "Home" ? "bg-gray-700" : ""
            }`}
            onClick={() => handleTabClick("Home")}
          >
            <Home className="mr-2" size={18} /> Home
          </li>
          <li
            className={`p-2 hover:bg-gray-700 cursor-pointer flex items-center rounded ${
              activeTab === "Messaging" ? "bg-gray-700" : ""
            }`}
            onClick={handleMessagingClick}
          >
            <MessageSquare className="mr-2" size={18} /> Messaging
          </li>
          <li
            className={`p-2 hover:bg-gray-700 cursor-pointer flex items-center rounded ${
              activeTab === "Edit Profile" ? "bg-gray-700" : ""
            }`}
            onClick={() => handleTabClick("Edit Profile")}
          >
            <User className="mr-2" size={18} /> Edit Profile
          </li>

          <li
            className={`p-2 hover:bg-gray-700 cursor-pointer flex items-center rounded ${
              activeTab === "Your Profile" ? "bg-gray-700" : ""
            }`}
            onClick={() => handleTabClick("Your Profile")}
          >
            <UserRoundPen className="mr-2" size={18} /> Your Profile
          </li>

          <li
            className={`p-2 hover:bg-gray-700 cursor-pointer flex items-center rounded ${
              activeTab === "MentorMenteeMatching" ? "bg-gray-700" : ""
            }`}
            onClick={() => handleTabClick("MentorMenteeMatching")}
          >
            <Copy className="mr-2" size={18} /> MentorMenteeMatching
          </li>
          <li
            className={`p-2 hover:bg-gray-700 cursor-pointer flex items-center rounded ${
              activeTab === "mentor request" ? "bg-gray-700" : ""
            }`}
            onClick={() => handleTabClick("mentor request")}
          >
            <UsersRound className="mr-2" size={18} /> mentor request
          </li>
        </ul>
      </>
    );
  };

  // Render main content
  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return (
          <>
            <h1 className="text-2xl font-bold">Welcome, Mentee!</h1>
            <p className="text-gray-800">
              Manage your mentors, messages, and sessions from here.
            </p>
            <div className="mt-6 border p-4 bg-white shadow-md rounded">
              <h2 className="text-lg font-semibold">Upcoming Sessions</h2>
              <p className="text-gray-800">No upcoming sessions.</p>
            </div>
          </>
        );
      case "mentor request":
        return  <MenteeRequests/>
      case "Your Profile":
        return <MenteeYour />;
      case "MentorMenteeMatching":
        return <MentorMenteeMatching />;
      case "Messaging":
        if (selectedUserId) {
          return (
            <div className="flex flex-col h-full">
              {/* Chat Box */}
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

              {/* Input Box */}
              <div className="mt-4 flex p-2 bg-white border-t shadow-md">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border rounded-l outline-none"
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 transition"
                >
                  Send
                </button>
              </div>
            </div>
          );
        }

        // Default view when no user is selected
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4 text-center">
                Messaging
              </h2>
              <p className="text-gray-600 text-center">
                Select a contact to begin messaging.
              </p>
              <div className="mt-4 text-center">
                <MessageSquare size={48} className="mx-auto text-gray-400" />
              </div>
            </div>
          </div>
        );

      case "Edit Profile":
        return (
          <>
            {loading ? (
              <p>Loading ....</p>
            ) : mentorDetails ? (
              <div className="p-4">
                <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={mentorDetails.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={mentorDetails.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Field Of Interest (comma-separated)
                    </label>
                    <input
                      type="text"
                      name="fieldOfInterest"
                      value={mentorDetails.fieldOfInterest.join(", ")}
                      onChange={handleExpertiseChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={mentorDetails.bio}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Availability
                    </label>
                    <select
                      name="availability"
                      value={mentorDetails.availability}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="Available">Available</option>
                      <option value="Busy">Busy</option>
                      <option value="Not Available">Not Available</option>
                    </select>
                  </div>
                  {/* <div>
                <label className="block text-sm font-medium text-gray-700">
                  Profile Picture URL
                </label>
                <input
                  type="text"
                  name="profilePicture"
                  value={mentorDetails.profilePicture}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div> */}
                  <div>
                    <button
                      type="submit"
                      className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <p>Loading user data</p>
            )}
            ;
          </>
        );
      default:
        return null;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMentorDetails({ ...mentorDetails, [name]: value });
  };

  const handleExpertiseChange = (e) => {
    const value = e.target.value;
    setMentorDetails({
      ...mentorDetails,
      expertise: value.split(",").map((item) => item.trim()),
    });
  };

  const updateMenteeDetails = async () => {
    try {
      const response = await axios.put(
        `${BaseURL}/${user.userType}/update-profile/${user.userId}`,
        mentorDetails // ✅ Send `mentorDetails` directly
      );

      if (!response.data.success) {
        // ✅ Check `response.data.success`
        console.log("Something went wrong at update-profile in backend");
        return;
      }

      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.error("Error at update profile function:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMenteeDetails();
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`bg-gray-800 text-white p-4 transition-all duration-300 ${
            isSidebarOpen ? "w-1/4" : "w-0 overflow-hidden"
          }`}
        >
          <button
            className="text-white absolute top-4 right-4 md:hidden"
            onClick={toggleSidebar}
          >
            <X size={24} />
          </button>
          {renderSidebarContent()}
        </aside>

        <main className="flex-1 p-6">
          <button
            className="md:hidden p-2 bg-gray-800 text-white rounded mb-4"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </button>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default MenteeDash;
