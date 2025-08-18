import { ablyRealtime } from "../socket/socket.js";

const onlineUsers = new Set();

// Publishing online users list to all users
const publishOnlineUsers = () => {
  onlineUsers.forEach(userId => {
    const channel = ablyRealtime.channels.get(`chat:${userId}`);
    channel.publish('getOnlineUsers', Array.from(onlineUsers));
  });
};

// Handle user connection
export const userConnected = (req, res) => {
  const userId = req.body.userId;
  if (!userId) return res.status(400).json({ error: "User ID is required" });

  onlineUsers.add(userId);
  publishOnlineUsers();
  res.status(200).json({ success: true });
};

// Handle user disconnection
export const userDisconnected = (req, res) => {
  const userId = req.body.userId;
  if (!userId) return res.status(400).json({ error: "User ID is required" });

  onlineUsers.delete(userId);
  publishOnlineUsers();
  res.status(200).json({ success: true });
};
