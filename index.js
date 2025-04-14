import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./Routes/authRoutes.js"
import blogsRouter from "./Routes/blogsRoutes.js";

const app = express();


app.use(express.json())
app.use(cors({
    origin: "https://blogit-frontend-beta.vercel.app",
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    credentials: true
}))
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/blogs", blogsRouter);


export default app;