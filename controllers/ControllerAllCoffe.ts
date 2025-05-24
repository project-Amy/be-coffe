import { Request, Response } from "express";
import getElencoCoffee from "../services/getElencoCoffee";
import AsyncWrapper from "../utils/asyncErrorHandler";


async function ControllerCoffes(req: Request, res: Response) {
  if (req.method === "GET") {
    const allCoffees = await getElencoCoffee();
    res.status(200).json({ data: allCoffees});
  }
}

export default AsyncWrapper(ControllerCoffes);
