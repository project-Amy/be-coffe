import * as express from "express";
import ControllerCoffes from "../controllers/ControllerCoffes";

const router = express.Router();

router.get("/all_coffes", ControllerCoffes);
router.post("/coffe/:id", ControllerCoffes);

export default router;
