import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const client = new PrismaClient();

export const getUserInfo = async (req, res) => {
  try {
    const userId = req.user.userId;

    const userInfo = await client.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        firstName: true,
        lastName: true,
        createdAt: true,
        emailAddress: true,
        userName: true,
        phoneNumber: true,
        occupation: true,
        secondaryEmail: true,
        profilePhotoUrl: true,
        bio: true,
      },
    });
    res.status(200).json(userInfo);
  } catch (e) {
    res.status(500).json({ message: "something went wrong." });
  }
};

export const updatePersonalInfo = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { firstName, lastName, emailAddress, userName } = req.body;

    await client.user.update({
      where: {
        id: userId,
      },
      data: {
        firstName,
        lastName,
        emailAddress,
        userName,
      },
    });

    res.status(200).json({ message: "Personal details updated successfully." });
  } catch (e) {
    res.status(500).json("something went wrong.");
  }
};

export const updateProfileInfo = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { phoneNumber, occupation, bio, secondaryEmail } = req.body;

    await client.user.update({
      where: {
        id: userId,
      },
      data: {
        phoneNumber: phoneNumber && phoneNumber,
        occupation: occupation && occupation,
        bio: bio && bio,
        secondaryEmail: secondaryEmail && secondaryEmail,
      },
    });

    res.status(200).json({ message: "updated profile info successfully." });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { oldPassword, newPassword } = req.body;

    const user = await client.user.findFirst({
      where: {
        id: userId,
      },
    });

    const theyMatch = await bcrypt.compare(oldPassword, user.password);

    if (!theyMatch) {
      return res.status(400).json({ message: "Incorrect old password" });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 12);

    await client.user.update({
      where: {
        id: userId,
      },
      data: {
        password: newHashedPassword,
      },
    });
    res.status(200).json({ message: "password updated successfully." });
  } catch (e) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const updateProfilePhoto = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { profilePhotoUrl } = req.body;

    await client.user.update({
      where: {
        id: userId,
      },
      data: {
        profilePhotoUrl,
      },
    });

    res.status(200).json({ message: "Profile photo updated successfully" });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong." });
  }
};
