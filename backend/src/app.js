import express from "express";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import logger from "./middleware/logger.js";
import notFound from "./middleware/notFound.js";
import error from "./middleware/error.js";
import morgan from "morgan";

const app = express();

// Built-in middleware - parse JSON to JS Object
app.use(express.json());

// Logger
app.use(morgan("dev"));
app.use(logger);

// Mounting routes
app.use("/products", productRouter);
app.use("/users", userRouter);

// Error handling
app.use(notFound);
app.use(error);

export default app;
