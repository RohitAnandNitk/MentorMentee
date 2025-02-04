import Chat from "../Model/ChatSchema.js"; // Import your chat model
import { getIO } from "../Middleware/socketio.js"; // Import Socket.IO instance



export const getOrCreateChat = async (req, res) => {
    console.log("getOrCreateChat function called at backend!");
    const { menteeId, mentorId } = req.body; // IDs of the two users

    try {
        // Check if a chat already exists
        let chat = await Chat.findOne({
            $or: [
                { menteeId, mentorId }, 
                { menteeId: mentorId, mentorId: menteeId } // Check both directions
            ]
        });

        // If chat doesn't exist, create a new one
        if (!chat) {
            chat = new Chat({ menteeId, mentorId, history: [] });
            await chat.save();
        }
        // console.log("type is chat.history : " , chat.history);

        res.status(200).json({ success: true, chatId: chat._id, messages: chat.history });

    } catch (error) {
        console.error("Error finding/creating chat:", error);
        res.status(500).json({ error: "Server error" });
    }
};


export const getAllChats = async (req, res) => {
    const { userId } = req.query; // ✅ Get userId from query params

    console.log("user Id is :", userId );

    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required" });
    }

    try {
        // Find all chats where the user is a mentor
        const chats = await Chat.find({ mentorId: userId });

        if (!chats.length) {
            return res.status(404).json({ success: false, message: "No chats found" });
        }

        res.status(200).json({ success: true, chats });
    } catch (error) {
        console.error("Error fetching chats:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



export const sendMessage =  async (req, res) => {
    // console.log("ENter in the seneMessage funcion at backend : ");
    try {
        const { chatId, senderId, receiverId, role , message } = req.body;

        if (!chatId || !senderId || !receiverId || !message) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Find or create chat
        let chat = await Chat.findById(chatId);
        // console.log("current chat id is :" , chat);

        if (!chat) {
            return res.status(404).json({ error: "Chat not found" });
        }

        // Add message to chat history
        const newMessage = {
            userType: role === "mentor" ? "sender" : "reciver",
            message,
            timestamp: new Date(),
            seen: false,
        };

        chat.history.push(newMessage);
        chat.lastMessage = message;
        chat.updatedAt = new Date();
        await chat.save();

        // Emit message via WebSocket
        const io = getIO();
        io.to(receiverId.toString()).emit("receiveMessage", newMessage);

        res.status(200).json({ success: true, message: "Message sent successfully", newMessage });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};