import express from "express";
import {
  createCoordinator,
  getAllCoordinators,
  getCoordinatorById,
  updateCoordinator,
  deleteCoordinatorById,
} from "../controllers/coordinatorController";

const coordinatorRoutes = express.Router();

/**
 * @swagger
 * /coordinators:
 *   post:
 *     summary: Create a new coordinator
 *     description: Adds a new coordinator to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               occupation:
 *                 type: string
 *                 example: "Youth Coordinator"
 *               phone_number:
 *                 type: string
 *                 example: "+1234567890"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               image_url:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *               about:
 *                 type: string
 *                 example: "Experienced coordinator..."
 *               isFeatured:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Coordinator successfully created.
 *       500:
 *         description: Internal server error.
 */
coordinatorRoutes.post("/", createCoordinator);

/**
 * @swagger
 * /coordinators:
 *   get:
 *     summary: Get all coordinators
 *     description: Retrieve all coordinators stored in the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved all coordinators.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 message:
 *                   type: string
 *                   example: All coordinators loaded successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Internal server error.
 */
coordinatorRoutes.get("/", getAllCoordinators);

/**
 * @swagger
 * /coordinators/{coordinatorId}:
 *   get:
 *     summary: Get coordinator by ID
 *     description: Retrieve a coordinator by its unique ID.
 *     parameters:
 *       - in: path
 *         name: coordinatorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the coordinator to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved the coordinator.
 *       404:
 *         description: Coordinator not found.
 *       500:
 *         description: Internal server error.
 */
coordinatorRoutes.get("/:coordinatorId", getCoordinatorById);

/**
 * @swagger
 * /coordinators/{coordinatorId}:
 *   put:
 *     summary: Update coordinator by ID
 *     description: Update a coordinator by its unique ID.
 *     parameters:
 *       - in: path
 *         name: coordinatorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the coordinator to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               occupation:
 *                 type: string
 *               phone_number:
 *                 type: string
 *               email:
 *                 type: string
 *               image_url:
 *                 type: string
 *               about:
 *                 type: string
 *               isFeatured:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Successfully updated the coordinator.
 *       404:
 *         description: Coordinator not found.
 *       500:
 *         description: Internal server error.
 */
coordinatorRoutes.put("/:coordinatorId", updateCoordinator);

/**
 * @swagger
 * /coordinators/{coordinatorId}:
 *   delete:
 *     summary: Delete coordinator by ID
 *     description: Delete a coordinator by its unique ID.
 *     parameters:
 *       - in: path
 *         name: coordinatorId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the coordinator to delete.
 *     responses:
 *       200:
 *         description: Successfully deleted the coordinator.
 *       404:
 *         description: Coordinator not found.
 *       500:
 *         description: Internal server error.
 */
coordinatorRoutes.delete("/:coordinatorId", deleteCoordinatorById);

export default coordinatorRoutes; 