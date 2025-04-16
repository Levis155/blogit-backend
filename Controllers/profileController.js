import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs";


const client = new PrismaClient()

export const getUserInfo = async (req, res) => {
    try{
        const userId = req.user.userId;

        const userInfo = await client.user.findFirst({
            where:{
                id:userId
            },
            select:{
                firstName:true,
                lastName:true,
                createdAt:true,
                emailAddress:true,
                userName:true,
                phoneNumber:true,
                occupation:true,
                secondaryEmail:true,
                bio:true
            }
        })
        res.status(200).json(userInfo)
    } catch(e) {
        res.status(500).json({message:"something went wrong."})
        console.log(e);
    }
}

export const updatePersonalInfo = async(req, res) => {
    try{
        const userId = req.user.userId;
        const {firstName, lastName, emailAddress, userName} = req.body;

        await client.user.update({
            where:{
                id:userId
            },
            data:{
                firstName,
                lastName,
                emailAddress,
                userName
            }
        })

        res.status(200).json({message:"Personal details updated successfully."})
    } catch(e){
        res.status(500).json("something went wrong.")
    }
}

export const updatePassword = async(req, res) => {
    try{
        const userId = req.user.userId;
        const {updatedPassword} = req.body;
        const newEncryptedPass = await bcrypt.hash(updatedPassword, 12)

        await client.user.update({
            where:{
                id: userId
            },
            data:{
                password: newEncryptedPass
            }
        })

        res.status(200).json({message:"password updated successfully."})
    } catch(e) {
        res.status(500).json({message: "something went wrong"})
    }
}