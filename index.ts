import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { config } from "dotenv";
import router from "./routes/routes";
import LoggerMiddleware from "./middleware/logger";

config({ path: ".env.local" });

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "*",
    credentials: true,
  })
);

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
