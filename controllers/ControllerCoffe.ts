import { Request, Response } from "express";
import getCoffeById from "../services/getCoffeById";
import AsyncWrapper from "../utils/asyncErrorHandler";
async function ControllerCoffe(req: Request, res: Response) {
  if (req.params.id) {
    const coffe = await getCoffeById(req.params.id);
    res.status(200).json({ data: coffe });
  } else {
    res.status(400).json({ message: "Id non trovato" });
  }
}

export default AsyncWrapper(ControllerCoffe);
