import express from "express";
import { userConnected, userDisconnected, getOnlineUsers } from "../controllers/onlineUsers.controller.js";

const router = express.Router();

router.post("/userConnected", userConnected);
router.post("/userDisconnected", userDisconnected);
router.get("/onlineUsers", getOnlineUsers);

export default router;