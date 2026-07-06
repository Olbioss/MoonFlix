import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import router from "./src/routes/index.js";

const app = express();

app.use(helmet());

// Restrict CORS to the origins listed in CORS_ORIGINS (comma-separated). When
// none are configured (e.g. local dev), fall back to permissive so the app
// still works out of the box.
const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.length === 0 ||
        allowedOrigins.includes(origin)
      ) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", router);

const port = process.env.PORT || 5001;

const server = http.createServer(app);

// Turn the common "port already taken" crash into an actionable message rather
// than an unhandled 'error' event. On macOS, AirPlay Receiver holds port 5000.
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${port} is already in use. On macOS the AirPlay Receiver service ` +
        `occupies port 5000 by default — set PORT in server/.env to a free ` +
        `port or disable AirPlay Receiver in System Settings.`
    );
  } else {
    console.error(err);
  }
  process.exit(1);
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Mongodb connected");
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log({ err });
    process.exit(1);
  });
