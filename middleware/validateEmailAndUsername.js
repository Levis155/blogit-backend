import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function validateEmailAndUsername(req, res, next) {
  const { emailAddress, userName } = req.body;

  const foundEmail = await client.user.findFirst({
    where: {
      emailAddress,
    },
  });

  const foundUserName = await client.user.findFirst({
    where: {
      userName,
    },
  });

  if (foundEmail) {
    return res.status(400).json({ message: "Email is already in use." });
  }

  if (foundUserName) {
    return res.status(400).json({ message: "Username is already in use." });
  }

  next();
}
