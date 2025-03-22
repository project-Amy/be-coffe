import { prisma } from "../prisma/use-prisma";
import CustomError from "../utils/CustomError";

export default async function getCoffeById(id: string) {
  if (!id) {
    throw new CustomError("Id is required", 400);
  }

  const coffe = await prisma.coffee.findUnique({
    where: {
      id: id,
    },
  });

  if (!coffe) {
    throw new CustomError("Coffe not found", 404);
  }

  return coffe;
}
