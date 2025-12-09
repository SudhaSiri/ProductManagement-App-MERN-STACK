import express from "express";
import dotenv from "dotenv";
import connectDB from "../config/db.js"; // Make sure this path is correct
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import morgan from "morgan";

// Load environment variables
dotenv.config();

// Connect MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Something went wrong",
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
