import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const client = new PrismaClient()

export const registerUser = async(req, res) => {
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
}

export const loginUser= async (req, res) => {
    const { identifier, password } = req.body;

   try{
    const user = await client.user.findFirst({where: {OR: [{emailAddress: identifier}, {userName: identifier}]}})

    if(!user) {
        return res.status(401).json({message:"Wrong login credentials."})
    }

    let theyMatch = await bcrypt.compare(password, user.password);

    if(!theyMatch) {
        return res.status(401).json({message: "Wrong login credentials."})
    }

    const jwtPayLoad = {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName
    }

    const token = jwt.sign(jwtPayLoad, process.env.JWT_SECRET_KEY);
    res.status(200).cookie("blogitAuthToken", token).json({
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        username: user.userName
    })
   } catch(e) {
    res.status(500).json({message: "Something went wrong."})
   } 
}