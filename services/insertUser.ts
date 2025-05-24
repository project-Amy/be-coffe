import { prisma } from "../prisma/use-prisma";

export default async function insertUser(clerkId: string, email: string) {
  if (!email || !clerkId) {
    throw new Error("Email or clerkId is missing");
  }
  
  const user = await prisma.user.create({
    data: {
      email,
      clerkId,
    },
  });
  
  return user;
}
