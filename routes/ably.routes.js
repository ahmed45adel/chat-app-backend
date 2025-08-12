import express from "express";
import { createTokenRequest } from "../controllers/ably.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/createTokenRequest", protectRoute, createTokenRequest);

export default router;