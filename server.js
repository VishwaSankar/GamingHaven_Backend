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
app.use(sessionMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "https://gaminghaven.onrender.com", credentials: true }));

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
app.listen(port, async () => {
  await connect();
  console.log(`Backend Server is running on port ${port}`);
});
