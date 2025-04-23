import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const createBlog = async (req, res) => {
  try {
    const authorId = req.user.userId;
    const { title, excerpt, blogImageUrl, content } = req.body;

    const newBlog = await client.blog.create({
      data: {
        title,
        blogImageUrl,
        excerpt,
        authorId,
        content,
      },
    });
    res.status(201).json({ newBlog });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getBlog = async (req, res) => {
  try {
    const authorId = req.user.userId;
    const { blogId } = req.params;

    const blog = await client.blog.findFirst({
      where: {
        id: blogId,
        isDeleted: false,
      },
      select: {
        title: true,
        excerpt: true,
        content:true,
        updatedAt: true,
        author: true,
        blogImageUrl: true,
      },
    });

    if (blog) {
      return res.status(200).json(blog);
    }

    res.status(404).json({ message: "blog not found." });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const allUsersBlogs = await client.blog.findMany({
      where: {
        isDeleted: false,
      },
      select: {
        id: true,
        authorId: true,
        title: true,
        excerpt: true,
        updatedAt: true,
        blogImageUrl: true,
        author: {
          select: {
            firstName: true,
            lastName: true,
            userName: true,
            profilePhotoUrl: true,
          },
        },
      },
    });
    res.status(200).json({ allUsersBlogs });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const getallBlogsByUser = async (req, res) => {
  try {
    const authorId = req.user.userId;
    const blogs = await client.blog.findMany({
      where: {
        AND: [{ authorId }, { isDeleted: false }],
      },
    });
    res.status(200).json(blogs);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const authorId = req.user.userId;
    const { blogId } = req.params;
    const { title, excerpt, content, blogImageUrl } = req.body;
    const updatedBlog = await client.blog.update({
      where: {
        authorId,
        id: blogId,
      },
      data: {
        title,
        excerpt,
        content,
        blogImageUrl,
      },
    });

    res.status(200).json({ message: "Blog updated successfully." });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const authorId = req.user.userId;
    const { blogId } = req.params;

    await client.blog.update({
      where: {
        authorId,
        id: blogId,
      },
      data: {
        isDeleted: true,
      },
    });

    res.status(200).json({ message: "Blog deleted successfully." });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
