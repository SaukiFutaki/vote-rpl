import prisma from "./prisma";

export const getUserByNim = async (nim: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        nim: nim,
      },
    });
    return user;
  } catch {
    return null;
  }
};


export const getUserById = async (id : string) => {
    try {
        const user = await prisma.user.findUnique({
        where: {
            id: id,
        },
        });
        return user;
    } catch {
        return null;
    }
}