import * as express from "express";
import ControllerAllCoffe from "../controllers/ControllerAllCoffe";
import ControllerCoffe from "../controllers/ControllerCoffe";
import ControllerEventsClerk from "../controllers/ControllerEventsClerk";

const router = express.Router();

/**
 * @swagger
 * /api/all_coffes:
 *   get:
 *     summary: Get all coffees
 *     description: Retrieve a list of all available coffees
 *     tags: [Coffees]
 *     responses:
 *       200:
 *         description: Successfully retrieved all coffees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Coffee ID
 *                   name:
 *                     type: string
 *                     description: Coffee name
 *       500:
 *         description: Internal server error
 */
router.get("/all_coffes", ControllerAllCoffe);

/**
 * @swagger
 * /api/coffe/{id}:
 *   get:
 *     summary: Get a specific coffee by ID
 *     description: Retrieve details of a specific coffee by its ID
 *     tags: [Coffees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the coffee to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the coffee
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Coffee ID
 *                 name:
 *                   type: string
 *                   description: Coffee name
 *       404:
 *         description: Coffee not found
 *       500:
 *         description: Internal server error
 */
router.get("/coffe/:id", ControllerCoffe);

/**
 * @swagger
 * /api/webhooks/events:
 *   post:
 *     summary: Clerk webhook endpoint
 *     description: Handle Clerk user events (create, update, delete)
 *     tags: [Webhooks]
 *     responses:
 *       200:
 *         description: Event processed successfully
 *       400:
 *         description: Bad request - missing payload or headers
 *       401:
 *         description: Unauthorized - invalid webhook signature
 *       500:
 *         description: Internal server error
 */
router.post("/webhooks/events", ControllerEventsClerk);

export default router;
