import { Request, Response } from "express";
import getElencoCoffee from "../services/getElencoCoffee";
import AsyncWrapper from "../utils/asyncErrorHandler";
import getCoffeById from "../services/getCoffeById";

async function ControllerCoffes(req: Request, res: Response) {
  if (req.method === "GET") {
    const allCoffees = await getElencoCoffee();
    res.status(200).json({ data: allCoffees});
  }
  if (req.method === "POST") {
    const coffe = await getCoffeById(req.params.id);
    res.status(200).json({ data: coffe });
  }
}

export default AsyncWrapper(ControllerCoffes);
