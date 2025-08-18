import express from "express";
import { userConnected, userDisconnected } from "../controllers/onlineUsers.controller.js";

const router = express.Router();

router.post("/userConnected", userConnected);
router.post("/userDisconnected", userDisconnected);

export default router;