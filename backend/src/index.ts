import express, { Application, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/index.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { setupSocket } from "./utils/socket.js";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import redis from "./config/redis.config.js";

const app: Application = express();
const PORT = process.env.PORT ?? 8000;
const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
  adapter: createAdapter(redis)
});

setupSocket(io)

// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/api", router)

server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
