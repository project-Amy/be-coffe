const ControllerErrorHandler = (err, req, res, next) => {
  // Determina lo status code appropriato
  const statusCode = err.statusCode || 500;
  // Struttura la risposta di errore
  const errorResponse = {
    success: false,
    error: {
      message: err.message || "Si è verificato un errore interno del server.",
      code: err.code || "INTERNAL_ERROR",
      statusCode: err.statusCode || 500,
    },
  };

  res.status(statusCode).json(errorResponse);
};
export default ControllerErrorHandler;
