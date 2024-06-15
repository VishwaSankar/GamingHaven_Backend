import express from "express";
import mongoose from "mongoose";
import authRoute from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js";
import orderRoute from './routes/order.routes.js';
import cookieParser from "cookie-parser";
import cors from "cors";
import cartRoute from "./routes/cart.routes.js";
import favRoute from "./routes/fav.routes.js";
import reviewRoute from "./routes/review.routes.js";
import sessionMiddleware from "./middleware/session.js";

const app = express();
app.use(sessionMiddleware);
// Database Connection
const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://vishwaexpert7788:12345qwert@cluster001.vzfz843.mongodb.net/Gaminghaven"
    );
    console.log("Database Connected :-)");
  } catch (err) {
    console.log(err);
  }
};

// Middleware

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = ["https://gaminghaven.onrender.com"];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("Origin: ", origin); // Log the origin for debugging
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "The CORS policy for this site does not allow access from the specified origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
};
app.use(cors(corsOptions));

// Routes
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/fav", favRoute);
app.use("/cart", cartRoute);
app.use("/library", cartRoute);
app.use("/reviews", reviewRoute);
app.use("/order", orderRoute);

// Error Handling Middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).send(errorMessage);
});

// Start Server
const port = process.env.PORT || 5000;
connect().then(() => {
  app.listen(port, () => {
    console.log(`Backend Server is running on port ${port}`);
  });
}).catch(err => {
  console.error("Failed to connect to database:", err);
  process.exit(1); // Exit the process with an error code
});
