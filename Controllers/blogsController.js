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
        res.status(201).json({newBlog})
    } catch(e) {
        console.log(e);
        res.status(500).json({message:"Something went wrong"})
    }
}

export const getBlog = async (req, res) => {
    try{
        const authorId = req.user.userId;
        const { blogId } = req.params;

        const blog = await client.blog.findFirst({
            where:{
                authorId,
                id: blogId,
                isDeleted: false
            }
        })
        
        if(blog) {
            return res.status(200).json(blog)
        }

        res.status(404).json({message: "blog not found."})
    } catch(e) {
        res.status(500).json({message: "Something went wrong."})
    }
}

export const getallBlogsByUser = async(req, res) => {
    try{
        const authorId = req.user.userId;
        const blogs = await client.blog.findMany({
            where:{
                AND:[{authorId}, {isDeleted: false}]
            }
        })
        console.log(blogs)
        res.status(200).json(blogs);
    } catch(e) {
        res.status(500).json({message: "Something went wrong."})
    }
}

export const updateBlog = async (req, res) => {
    try{
        const authorId = req.user.userId;
        const { blogId } = req.params;
        const {title, excerpt} = req.body;
        const updatedBlog = await client.blog.update({
            where: {
                authorId,
                id: blogId
            },
            data: {
                title: title && title,
                excerpt: excerpt && excerpt,
            }
        })

        res.status(200).json({message: "Blog updated successfully."})
    } catch (e) {
        res.status(500).json({message: "Something went wrong."})
    }
}