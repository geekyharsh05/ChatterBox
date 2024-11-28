import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import ChatGroupController from "../controllers/chatgroup.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import ChatGroupUserController from "../controllers/chatgroupuser.controller.js";
import ChatsController from "../controllers/chats.controller.js";

const router = Router();

// Auth Routes
router.post("/auth/login", AuthController.login)

// Chat Group Routes
router.get("/chat-group", authMiddleware, ChatGroupController.index)
router.get("/chat-group/:id", ChatGroupController.show);
router.post("/chat-group", authMiddleware, ChatGroupController.store);
router.put("/chat-group/:id", authMiddleware, ChatGroupController.update);
router.delete("/chat-group/:id", authMiddleware, ChatGroupController.destroy);

// Chat Group Users
router.get("/chat-group-user", ChatGroupUserController.index)
router.post("/chat-group-user", ChatGroupUserController.store)

// Chats
router.get("/chats/:groupId", ChatsController.index);

export default router;