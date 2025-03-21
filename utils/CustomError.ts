class CustomError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  constructor(message: string, statusCode: number) {
    super(message); // messaggio custom
    this.statusCode = statusCode; // status code custom
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error"; // fail = client error || error = server error
    this.isOperational = true; // 
    Error.captureStackTrace(this, this.constructor);
  }
}
// cost error = new CustomError("messaggio di errore", status code: 500/404 etc")
export default CustomError;
