import express from "express";
import * as dotenv from "dotenv";
import CustomError from "./utils/CustomError";
import ControllerErrorHandler from "./controllers/ControllerHandlers";
import routes from "./routes/routes";
import setupSwagger from "./swagger";
dotenv.config();

const app = express();
// Middleware per gestire il raw body per i webhook
app.use('/api/events', express.raw({ type: 'application/json' }));

// Middleware per il parsing JSON per tutte le altre route
app.use(express.json());

const port = parseInt(process.env.PORT || process.argv[3] || '8084');

// Setup Swagger documentation
setupSwagger(app);

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
  console.log(`🚀 Endpoint API Docs: http://localhost:${port}/api-docs`);
  console.log(
    `📚 Endpoint ALL ☕ GET: http://localhost:${port}/api/all_coffes`
  );
  console.log(`📚 Endpoint 1 ☕ POST: http://localhost:${port}/api/coffe/:id`);
  console.log(`🔗 Endpoint Webhook Clerk: http://localhost:${port}/api/webhooks/clerk`);
});
