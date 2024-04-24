import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const DB =
  "mongodb+srv://abhoy21:uVulIqyzajS85wkZ@cluster0.41dn67u.mongodb.net/console_blog()?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DB)
  .then(() => console.log("Database connected!"))
  .catch((error) => {
    console.log(error);
  });

// const __dirname = path.resolve();

const app = express();
const port = 8080;

app.use(
  cors({
    origin: true,
    methods: ["POST", "GET"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

// app.use(express.static(path.join(__dirname, "../client/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
// });

// Error handler middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ success: false, statusCode, message });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
