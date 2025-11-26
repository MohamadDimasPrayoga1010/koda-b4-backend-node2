import prisma from "../libs/prisma.js";

export async function createUser(fullname, email, password) {
  return await prisma.user.create({
    data: { fullname, email, password },
  });
}

export async function findUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },
  });
}
