import express from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs";
import cors from "cors";
import { validateEmailAndUsername } from "./middleware/validateEmailAndUsername.js";

const app = express();
const client = new PrismaClient()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"]
}))

app.post("/auth/register", validateEmailAndUsername, async(req, res) => {
    const{firstName, lastName, emailAddress, userName, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 12)

    try{
        const newUser = await client.user.create({
            data:{
                firstName,
                lastName,
                emailAddress,
                userName,
                password: hashedPassword
            }
        })

        res.status(201).json({
            message: "User registered successfully"
        })
    } catch(e) {
        res.status(500).json({
            message: "Something went wrong. Please try again."
        })
    }
})

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})