import express from "express";
import { createTokenRequest } from "../controllers/ably.controller.js";

const router = express.Router();

router.get("/createTokenRequest", createTokenRequest);

export default router;