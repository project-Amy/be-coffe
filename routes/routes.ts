import * as express from "express";
import ControllerAllCoffe from "../controllers/ControllerAllCoffe";
import ControllerCoffe from "../controllers/ControllerCoffe";

const router = express.Router();

router.get("/all_coffes", ControllerAllCoffe);
router.get("/coffe/:id", ControllerCoffe);

export default router;
