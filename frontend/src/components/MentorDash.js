import { useState, useEffect, useRef  } from "react";
import { Menu, X, Home, MessageSquare, User, ArrowLeft, Send } from "lucide-react";

const MentorDash = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("Home");
    const [messagingUsers, setMessagingUsers] = useState(null);
    const [showBackButton, setShowBackButton] = useState(false);
    const [selectedUserMessages, setSelectedUserMessages] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [selectedUserId, setSelectedUserId] = useState(null); 
    const [mentorDetails, setMentorDetails] = useState({
        name: "John Doe", // Example data
        email: "john.doe@example.com",
        expertise: ["Web Development", "JavaScript"],
        bio: "Experienced web developer.",
        availability: "Available",
        profilePicture: "",
    });
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [selectedUserMessages]);


    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
        if (tab !== "Messaging") {
            setMessagingUsers(null);
            setShowBackButton(false);
            setSelectedUserMessages(null);
            setNewMessage("");
        }
    };

    const handleMessagingClick = () => {
        setActiveTab("Messaging");
        setMessagingUsers([
            { id: 1, name: "Alice Smith" },
            { id: 2, name: "Bob Johnson" },
            { id: 3, name: "Charlie Brown" },
        ]);
        setShowBackButton(true);
        if (window.innerWidth < 768) {
            setIsSidebarOpen(true);
        }
    };

    const handleBackClick = () => {
        setMessagingUsers(null);
        setShowBackButton(false);
        setSelectedUserMessages(null);
        setNewMessage("");
    };

    const handleUserSelect = (user) => {
        const messages = [
            { id: 1, sender: "Alice Smith", text: "Hello!" },
            { id: 2, sender: "You", text: "Hi Alice!" },
            { id: 3, sender: "Alice Smith", text: "How are you?" },
        ];
        setSelectedUserMessages(messages);
        if (window.innerWidth < 768) {
            setIsSidebarOpen(false);
        }
    };

    const handleSendMessage = () => {
        if (newMessage.trim() && selectedUserMessages) {
            const newMessageObj = {
                id: selectedUserMessages.length + 1,
                sender: "You",
                text: newMessage,
            };
            setSelectedUserMessages([...selectedUserMessages, newMessageObj]);
            setNewMessage("");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMentorDetails({
            ...mentorDetails,
            [name]: value,
        });
    };

    const handleExpertiseChange = (e) => {
        const value = e.target.value;
        setMentorDetails({
            ...mentorDetails,
            expertise: value.split(",").map(item => item.trim())
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would send mentorDetails to your backend API to update the profile
        console.log("Updated Mentor Details:", mentorDetails);
        // Add your backend update logic here
    };

    const renderSidebarContent = () => {
        if (messagingUsers) {
            return(
                <div>
                    {showBackButton && (
                        <button
                            className="text-white bg-slate-800 hover:bg-slate-700 mb-2"
                            onClick={handleBackClick}
                        >
                            <ArrowLeft size={20} className="inline mr-1" /> Back
                        </button>
                    )}
                    <h3 className="text-lg font-semibold mb-2">Select a Contact</h3>
                    <ul className="space-y-2">
                        {messagingUsers.map((user) => (
                            <li
                                key={user.id}
                                className={`p-2 cursor-pointer ${selectedUserId === user.id ? "bg-gray-700" : "hover:bg-gray-700"}`} // Modified hover behavior
                                onClick={() => {handleUserSelect(user); setSelectedUserId(user.id);}}
                            >
                                {user.name}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return (
                <>
                    <h2 className="text-xl font-bold mb-4">Mentor Dashboard</h2>
                    <ul className="space-y-3">
                        <li className={`p-2 hover:bg-gray-700 cursor-pointer flex items-center ${activeTab === "Home" ? "bg-gray-700" : ""}`} onClick={() => handleTabClick("Home")}>
                            <Home className="mr-2" size={18} /> Home
                        </li>
                        <li className={`p-2 hover:bg-gray-700 cursor-pointer flex items-center ${activeTab === "Messaging" ? "bg-gray-700" : ""}`} onClick={handleMessagingClick}>
                            <MessageSquare className="mr-2" size={18} /> Messaging
                        </li>
                        <li className={`p-2 hover:bg-gray-700 cursor-pointer flex items-center ${activeTab === "Edit Profile" ? "bg-gray-700" : ""}`} onClick={() => handleTabClick("Edit Profile")}>
                            <User className="mr-2" size={18} /> Edit Profile
                        </li>
                    </ul>
                </>
            );
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case "Home":
                return (
                    <>
                        <h1 className="text-2xl font-bold">Welcome, Mentor!</h1>
                        <p className="text-gray-800">Manage your mentees, messages, and sessions from here.</p>
                        <div className="mt-6 border p-4 bg-white shadow-md rounded">
                            <h2 className="text-lg font-semibold">Upcoming Sessions</h2>
                            <p className="text-gray-800">No upcoming sessions.</p>
                        </div>
                    </>
                );
                case "Messaging":
                    if (selectedUserMessages) {
                        return (
                            <div className="flex flex-col h-full bg-gray-100">
                                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                                    {selectedUserMessages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`max-w-xs rounded-xl p-2 ${
                                                message.sender === "You"
                                                    ? "bg-green-200 ml-auto"
                                                    : "bg-white mr-auto"
                                            }`}
                                        >
                                            <p className="text-sm">{message.text}</p>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                                <div className="p-4 border-t bg-white">
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="Type a message..."
                                            className="flex-1 p-2 border rounded-l-xl focus:outline-none"
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            className="bg-green-500 text-white p-2 rounded-r-xl"
                                        >
                                            <Send size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    } else {
                    return (
                        <div className="flex flex-col items-center justify-center h-full">
                            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                                <h2 className="text-lg font-semibold mb-4 text-center">Messaging</h2>
                                <p className="text-gray-600 text-center">Select a contact to begin messaging.</p>
                                <div className="mt-4 text-center">
                                    <MessageSquare size={48} className="mx-auto text-gray-400" />
                                </div>
                            </div>
                        </div>
                    );
                }
                case "Edit Profile":
                    return (
                        <div className="p-4">
                            <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={mentorDetails.name}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={mentorDetails.email}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Expertise (comma-separated)</label>
                                    <input
                                        type="text"
                                        name="expertise"
                                        value={mentorDetails.expertise.join(", ")}
                                        onChange={handleExpertiseChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                                    <textarea
                                        name="bio"
                                        value={mentorDetails.bio}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Availability</label>
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
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
                                    <input
                                        type="text"
                                        name="profilePicture"
                                        value={mentorDetails.profilePicture}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
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
                    );
            
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen">
            <aside className={`bg-gray-800 text-white p-4 transition-all duration-300 ${isSidebarOpen ? "w-1/4" : "w-0 overflow-hidden"}`}>
                <button className="text-white absolute top-4 right-4 md:hidden" onClick={toggleSidebar}><X size={24} /></button>
                {renderSidebarContent()}
            </aside>
            <main className="flex-1 p-6">
                <button className="md:hidden p-2 bg-gray-800 text-white rounded mb-4" onClick={toggleSidebar}><Menu size={24} /></button>
                {renderContent()}
            </main>
        </div>
    );
};

export default MentorDash;