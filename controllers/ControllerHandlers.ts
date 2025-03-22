import { Request, Response, NextFunction } from "express";  
import CustomError from "../utils/CustomError";

const ControllerErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Determina lo status code appropriato
  const statusCode = err.statusCode || 500;
  // Struttura la risposta di errore
  const errorResponse = {
    success: false,
    error: {
      message: err.message || "Si è verificato un errore interno del server.",
      code: err.statusCode || "INTERNAL_ERROR",
      statusCode: err.statusCode || 500,
    },
  };

  res.status(statusCode).json(errorResponse);
};
export default ControllerErrorHandler;
