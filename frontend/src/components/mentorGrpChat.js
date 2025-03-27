import { useState, useRef } from "react";
import { ArrowLeft, Phone, Video, Edit, UserPlus, UserMinus, Trash2 } from "lucide-react";
import IconButton from "@mui/material/IconButton";

export default function MentorGrpChat({ selectedGroup, setSelectedGroup, messages, sendMessage, groupMembers, updateGroupName, addMember, removeMember, deleteGroup }) {
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newGroupName, setNewGroupName] = useState(selectedGroup.name);
  const [showMembers, setShowMembers] = useState(false);
  const chatBoxRef = useRef(null);

  return (
    <div className="p-6  mx-auto space-y-6 h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4">
        <IconButton onClick={() => setSelectedGroup(null)}><ArrowLeft /></IconButton>
        {isEditing ? (
          <input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            onBlur={() => { updateGroupName(newGroupName); setIsEditing(false); }}
            className="text-2xl font-bold border-b-2 focus:outline-none"
            autoFocus
          />
        ) : (
          <h1 className="text-2xl font-bold">{selectedGroup.name}</h1>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-between p-4">
        <IconButton color="primary"><Phone /></IconButton>
        <IconButton color="primary"><Video /></IconButton>
        <IconButton color="primary" onClick={() => setIsEditing(true)}><Edit /></IconButton>
        <IconButton color="primary" onClick={() => setShowMembers(!showMembers)}><UserPlus /></IconButton>
        <IconButton color="error" onClick={() => deleteGroup()}><Trash2 /></IconButton>
      </div>

      {/* Group Members */}
      {showMembers && (
        <div className="bg-gray-100 p-4 rounded shadow-md">
          <h2 className="text-lg font-bold mb-2">Group Members</h2>
          <ul>
            {groupMembers.map((member) => (
              <li key={member.id} className="flex justify-between p-2 border-b">
                <span>{member.name}</span>
                <IconButton color="error" onClick={() => removeMember(member.id)}><UserMinus /></IconButton>
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Enter member name"
            className="p-2 border rounded mt-2 w-full"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value) {
                addMember(e.target.value);
                e.target.value = "";
              }
            }}
          />
        </div>
      )}

      {/* Chat Section */}
      <div className="flex flex-col h-full">
        {/* Chat Box */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-100 rounded shadow-md" ref={chatBoxRef} style={{ maxHeight: "70vh" }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 p-3 rounded-lg max-w-xs ${
                msg.userType === "mentor"
                  ? "bg-blue-300 text-black mr-auto"  // Mentor messages on left
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
    </div>
  );
}
