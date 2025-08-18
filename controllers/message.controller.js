import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { ablyRealtime } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;   // target user (receiver)
    const senderId = req.user._id;           // sender from auth

    // 1. Find or create conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // 2. Create new message document
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // 3. Save conversation & message
    await Promise.all([conversation.save(), newMessage.save()]);

    // 4. Publish via Ably to both users 🔥
    const receiverChannel = ablyRealtime.channels.get(`chat:${receiverId.toString()}`);
    await receiverChannel.publish("newMessage", newMessage);

    const senderChannel = ablyRealtime.channels.get(`chat:${senderId.toString()}`);
    await senderChannel.publish("newMessage", newMessage);

    // 5. Respond success
    res.status(201).json(newMessage);

  } catch (error) {
    console.error("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


/**
 * Get all messages between the logged-in user and another user
 */
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    res.status(200).json(conversation.messages);

  } catch (error) {
    console.error("Error in getMessages controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};