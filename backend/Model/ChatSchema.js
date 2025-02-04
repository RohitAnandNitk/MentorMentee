import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor', required: true },
    menteeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentee', required: true },
    history: [
        {
            userType: { type: String, enum: ['sender', 'reciver'], required: true },
            message: { type: String },
            timestamp: { type: Date, default: Date.now },
            seen: { type: Boolean, default: false }
        }
    ],
    lastMessage: { type: String }, // Storing last message for quick access
    updatedAt: { type: Date, default: Date.now }
});

ChatSchema.index({ mentorId: 1, menteeId: 1 }); // Indexing for faster queries

const Chat = mongoose.model('Chat', ChatSchema);
export default Chat; 