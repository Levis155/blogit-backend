import express from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs"

const app = express();
const client = new PrismaClient()

app.use(express.json())

app.post("/auth/register", async(req, res) => {
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
            message: "User registered successfully",
            data: newUser
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