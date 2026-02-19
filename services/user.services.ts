import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UpdateUserPayload } from "@/types/payload/user.payload";
export async function initiateUser(data: { email: string; name: string; password: string; totalExperience: number; totalProject: number }) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  try {
    const user = await prisma.$transaction(async (tx) => {
      const count = await tx.user.count();
      if (count > 0) {
        const error = new Error("ADMIN_ALREADY_EXISTS");
        throw error;
      }
      return await tx.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          totalExperience: data.totalExperience,
          totalProject: data.totalProject,
        },

        select: {
          email: true,
          name: true,
        },
      });
    });
    return user;
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new Error("EMAIL_EXISTS");
    }

    throw error;
  }
}

export async function signIn(data: { email: string; password: string }) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new Error("INVALID_PASSWORD");
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  } catch (error: any) {
    throw error;
  }
}

export function signOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export async function updateUser(userId: string, data: UpdateUserPayload) {
  try {
    const { skillIds, password, ...rest } = data;

    return await prisma.$transaction(async (tx) => {
      const updateData: Prisma.UserUpdateInput = { ...rest };

      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: updateData,
      });

      if (skillIds) {
        await tx.userSkill.deleteMany({
          where: { userId },
        });

        await tx.userSkill.createMany({
          data: skillIds.map((skillId) => ({
            userId,
            skillId,
          })),
        });
      }

      return tx.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          bio: true,
          totalExperience: true,
          totalProject: true,
          instagram: true,
          linkedIn: true,
          github: true,
          twitter: true,
          skills: {
            include: {
              skill: true,
            },
          },
        },
      });
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new Error("EMAIL_ALREADY_EXISTS");
    }

    if (error.code === "P2025") {
      throw new Error("USER_NOT_FOUND");
    }

    throw error;
  }
}
export async function getUserById(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        bio: true,
        totalExperience: true,
        totalProject: true,
        instagram: true,
        linkedIn: true,
        github: true,
        twitter: true,

        skills: {
          include: {
            skill: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    return user;
  } catch (error) {
    throw error;
  }
}
