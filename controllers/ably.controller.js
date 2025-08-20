import { ablyRealtime } from "../socket/socket.js";

export const createTokenRequest = async (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const tokenRequest = await ablyRealtime.auth.createTokenRequest({
      clientId: userId.toString(),
      capability: JSON.stringify({
        "chat:*": ["publish", "subscribe", "presence"],
      }),
      ttl: 3600000, // 1 hour
    });

    res.status(200).json(tokenRequest);
  } catch (error) {
    console.error("Error creating Ably token request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};