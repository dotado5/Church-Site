import { Router } from "express";
import {
  uploadActivity,
  getAllActivities,
  getActivityById,
  deleteActivityById,
} from "../controllers/ActivityController";

const activityRoutes = Router();

/**
 * @swagger
 * /uploadActivity:
 *   post:
 *     summary: Upload a new activity
 *     description: Uploads a new activity to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Saint"
 *               date:
 *                 type: string
 *                 example: "Saint"
 *               description:
 *                 type: string
 *                 example: "new Activity"
 *     responses:
 *       201:
 *         description: Activity successfully uploaded.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Activity successfully uploaded 1234567890abcdef"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
activityRoutes.post("/", uploadActivity);

/**
 * @swagger
 * /activities:
 *   get:
 *     summary: Get all activities
 *     description: Retrieves a list of all activities from the database.
 *     responses:
 *       200:
 *         description: A list of all activities.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Success"
 *                 message:
 *                   type: string
 *                   example: "All activities loaded successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       firstName:
 *                         type: string
 *                       lastName:
 *                         type: string
 *                       profileImage:
 *                         type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
activityRoutes.get("/", getAllActivities);

/**
 * @swagger
 * /activities/{activityId}:
 *   get:
 *     summary: Get activity by ID
 *     description: Retrieves a specific activity from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the activity to retrieve.
 *     responses:
 *       200:
 *         description: Activity found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Success"
 *                 message:
 *                   type: string
 *                   example: "Activity found"
 *                 course:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     profileImage:
 *                       type: string
 *       404:
 *         description: Activity not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
activityRoutes.get("/:activityId", getActivityById);

/**
 * @swagger
 * /activities/{activityId}:
 *   delete:
 *     summary: Delete activity by ID
 *     description: Deletes a specific activity from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the activity to delete.
 *     responses:
 *       200:
 *         description: Successfully deleted activity.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "Success"
 *                 message:
 *                   type: string
 *                   example: "Successfully deleted document with _id: 1234567890abcdef"
 *       404:
 *         description: Activity not found.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
activityRoutes.delete("/:activityId", deleteActivityById);

export default activityRoutes;
