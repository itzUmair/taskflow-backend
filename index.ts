import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import { config } from "dotenv";
import router from "./routes/routes";
import LoggerMiddleware from "./middleware/logger";
import AuthMiddleware from "./middleware/auth";

config({ path: ".env.local" });

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    methods: "*",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(LoggerMiddleware);
app.use("/api/v1", router);

const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("test", (message) => console.log(message));
  console.log("a user connected");
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "connected",
  });
});

server.listen(process.env.REST_API_PORT || 8080, () => {
  console.log(
    `server listening on http://localhost:${process.env.REST_API_PORT || 8080}`
  );
});
