import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "../routes/auth.routes.js";
import messageRoutes from "../routes/message.routes.js";
import userRoutes from "../routes/user.routes.js";
import ablyRoutes from "../routes/ably.routes.js";
import onlineUsersRoutes from "../routes/onlineUsers.routes.js";
import connectToMongoDB from "../db/db.js";

dotenv.config();

const app = express();

const corsConfig = {
  origin: `${process.env.CLIENT_URL}`,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
};

app.options("/{*any}", cors(corsConfig));
app.use(cors(corsConfig));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send("Server is running");
});
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api", ablyRoutes);
app.use("/api", onlineUsersRoutes);
connectToMongoDB();

export default app;