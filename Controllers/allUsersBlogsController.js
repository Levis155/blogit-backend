import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const getAllBlogs = async (req, res) => {
    try{
        const allUsersBlogs= await client.blog.findMany({
            where:{
                isDeleted: false
            },
            select:{
                id: true,
                authorId:true,
                title:true,
                excerpt:true,
                updatedAt:true,
                author: {
                    select:{
                        firstName:true,
                        lastName:true,
                        userName:true
                    }
                }
            }
        });
        res.status(200).json({allUsersBlogs})
    } catch(e) {
        res.status(500).json({message:"Something went wrong."})
    }
}