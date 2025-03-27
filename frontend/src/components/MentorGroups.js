import { useState, useRef } from "react";
import { Card, CardContent } from "@mui/material";
import { Button, Autocomplete, TextField, IconButton } from "@mui/material";
import MentorGrpChat from "./mentorGrpChat";
import { Plus, MessageCircle, X } from "lucide-react";

export default function MentorGroups() {
  const [groups, setGroups] = useState([
    { name: "React Beginners", mentees: ["Alice", "Bob", "Charlie"] },
    { name: "Machine Learning Enthusiasts", mentees: ["David", "Eve", "Frank"] }
  ]);
  const [groupName, setGroupName] = useState("");
  const [selectedMentees, setSelectedMentees] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const chatBoxRef = useRef(null);

  const allMentees = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hank"];

  // Function to create a new group
  const createGroup = () => {
    if (groupName.trim() === "" || selectedMentees.length === 0) return;
    setGroups([...groups, { name: groupName, mentees: selectedMentees }]);
    setGroupName("");
    setSelectedMentees([]);
    setCreatingGroup(false);
  };

  // Function to send a message in the chat
  const sendMessage = () => {
    if (message.trim() === "") return;
    setMessages([...messages, { id: messages.length, userType: "mentor", message }]);
    setMessage("");
  };

  // Define the missing functions
  const groupMembers = selectedGroup ? selectedGroup.mentees : [];

  const updateGroupName = (newName) => {
    setSelectedGroup((prevGroup) => ({ ...prevGroup, name: newName }));
    setGroups(groups.map((g) => (g.name === selectedGroup.name ? { ...g, name: newName } : g)));
  };

  const addMember = (newMember) => {
    if (selectedGroup && !selectedGroup.mentees.includes(newMember)) {
      const updatedGroup = { ...selectedGroup, mentees: [...selectedGroup.mentees, newMember] };
      setSelectedGroup(updatedGroup);
      setGroups(groups.map((g) => (g.name === selectedGroup.name ? updatedGroup : g)));
    }
  };

  const removeMember = (memberToRemove) => {
    if (selectedGroup) {
      const updatedGroup = { 
        ...selectedGroup, 
        mentees: selectedGroup.mentees.filter((m) => m !== memberToRemove) 
      };
      setSelectedGroup(updatedGroup);
      setGroups(groups.map((g) => (g.name === selectedGroup.name ? updatedGroup : g)));
    }
  };

  const deleteGroup = () => {
    setGroups(groups.filter((g) => g.name !== selectedGroup.name));
    setSelectedGroup(null);
  };

  if (selectedGroup) {
    return (
      <MentorGrpChat 
        selectedGroup={selectedGroup} 
        setSelectedGroup={setSelectedGroup} 
        messages={messages} 
        sendMessage={sendMessage} 
        groupMembers={groupMembers} 
        updateGroupName={updateGroupName} 
        addMember={addMember} 
        removeMember={removeMember} 
        deleteGroup={deleteGroup} 
      />
    );
  }

  return (
    <div className="p-6 mx-auto space-y-6 h-[700px] overflow-y-auto">
      <h1 className="text-2xl font-bold">Mentor Group Chat</h1>
      <Button variant="contained" color="primary" onClick={() => setCreatingGroup(true)} className="flex items-center gap-2">
        <Plus size={16} /> Create Group
      </Button>
      {creatingGroup && (
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Create a New Group</h2>
              <IconButton onClick={() => setCreatingGroup(false)}><X /></IconButton>
            </div>
            <TextField 
              fullWidth
              label="Group Name" 
              value={groupName} 
              onChange={(e) => setGroupName(e.target.value)} 
            />
            <Autocomplete
              multiple
              options={allMentees}
              getOptionLabel={(option) => option}
              value={selectedMentees}
              onChange={(event, newValue) => setSelectedMentees(newValue)}
              renderInput={(params) => (
                <TextField {...params} label="Select Mentees" placeholder="Add Mentees" fullWidth />
              )}
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={createGroup} 
              className="flex items-center gap-2"
            >
              <Plus size={16} /> Create Group
            </Button>
          </CardContent>
        </Card>
      )}
      <div className="space-y-4">
        {groups.map((group, index) => (
          <Card key={index} onClick={() => setSelectedGroup(group)} className="cursor-pointer">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{group.name}</h2>
                <p className="text-sm text-gray-500">
                  {group.mentees.join(", ")}
                </p>
              </div>
              <Button variant="contained" color="secondary" className="flex items-center gap-2">
                <MessageCircle size={16} /> Chat
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
