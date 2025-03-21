import { NextFunction, Request, Response } from "express";
import CustomError from "./CustomError";


export const asyncWrapper = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: CustomError) => next(err));
  };
};