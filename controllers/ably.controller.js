import { ablyRealtime } from "../socket/socket.js";

export const createTokenRequest = async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized - User not authenticated" });
  }

  try {
    // Use REST instance to create Ably token request
    const tokenRequest = await ablyRealtime.auth.createTokenRequest({
      clientId: userId.toString(),
      capability: { '*': ["publish", "subscribe"] },
      ttl: 3600000 // 1 hour expiration
    });
    res.status(200).json(tokenRequest);
  } catch (error) {
    console.error("Error creating Ably token request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};