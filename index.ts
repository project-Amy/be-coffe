import express from "express";
import * as dotenv from "dotenv";
import CustomError from "./utils/CustomError";
import ControllerErrorHandler from "./controllers/ControllerHandlers";
import routes from "./routes/routes";
dotenv.config();


const app = express();
app.use(express.json());
const port = parseInt(process.env.PORT || process.argv[3] || '8080');

app.get("/", (req, res) => {
  res.json("Hello world");
});

app.use("/api", routes);

app.all("*", (req, res, next) => {
  const error = new CustomError(
    `Can't find ${req.originalUrl} on this server`,
    404
  );
  next(error);
});

app.use(ControllerErrorHandler);
app.listen(port, () => {
  console.log(`🚀 Server disponibile: http://localhost:${port}`);
  console.log(
    `📚 Endpoint ALL ☕ GET: http://localhost:${port}/api/all_coffes`
  );
  console.log(`📚 Endpoint 1 ☕ POST: http://localhost:${port}/api/coffe/:id`);
});
