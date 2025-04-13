import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const createBlog = async (req, res) => {
    try{
        const authorId = req.user.userId;
        const {title, excerpt} = req.body;
        
        const newBlog = await client.blog.create({
            data:{
                title,
                excerpt,
                authorId
            }
        })
        res.status(201).json({message: "blog created successfully!"})
    } catch(e) {
        console.log(e);
        res.status(500).json({message:"Something went wrong"})
    }
}