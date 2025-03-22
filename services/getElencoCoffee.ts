import { prisma } from "../prisma/use-prisma";

export default async function getElencoCoffee() {
  const allCoffees = await prisma.coffee.findMany();

  if (!allCoffees) {
    throw new Error("Nessun caffè trovato");
  }

  return allCoffees;
}
