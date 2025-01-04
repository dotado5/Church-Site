import express from 'express';
import { deleteMemoryByActivityId, getAllMemories, getMemoriesByActivityId, getMemoryById, uploadMemory } from '../controllers/memoryController';


const memoryRoutes = express.Router();

// Create Memory
/**
 * @swagger
 * /memories:
 *   post:
 *     summary: Upload a memory
 *     description: Uploads a new memory to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               imageUrl:
 *                 type: string
 *                 example: "John"
 *               height:
 *                 type: number
 *                 example: 0
 *               width:
 *                 type: number
 *                 example: 0
 *               imgType:
 *                 type: string
 *                 example: "jpeg"
 *               activityId:
 *                 type: string
 *                 example: "Christmas"
 *     responses:
 *       201:
 *         description: Memory successfully uploaded.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Memory successfully uploaded 66ed615010288100e0979621
 *       500:
 *         description: Internal server error.
 */
memoryRoutes.post('/memories', uploadMemory);

// Get all Memories
/**
 * @swagger
 * /memories:
 *   get:
 *     summary: Get all memories
 *     description: Retrieves all memories from the database.
 *     responses:
 *       200:
 *         description: A list of all memories.
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
 *                   example: "All memories loaded successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       firstName:
 *                         type: string
 *                         example: "John"
 *                       lastName:
 *                         type: string
 *                         example: "Doe"
 *                       profileImage:
 *                         type: string
 *                         example: "profile.jpg"
 *       500:
 *         description: Internal server error.
 */
memoryRoutes.get('/memories', getAllMemories);

// Get all Memory by Id
/**
 * @swagger
 * /memories/{memoryId}:
 *   get:
 *     summary: Get a memory by ID
 *     description: Retrieve a specific memory by its ID.
 *     parameters:
 *       - name: memoryId
 *         in: path
 *         required: true
 *         description: ID of the memory to retrieve
 *         schema:
 *           type: string
 *           example: "66ed615010288100e0979621"
 *     responses:
 *       200:
 *         description: The requested memory.
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
 *                   example: "Memory found"
 *                 course:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     profileImage:
 *                       type: string
 *                       example: "profile.jpg"
 *       500:
 *         description: Internal server error.
 */
memoryRoutes.get('/memories/:memoryId', getMemoryById);

// Get all Memory by activity Id
/**
 * @swagger
 * /memories/activity/{activityId}:
 *   get:
 *     summary: Get memories by activity ID
 *     description: Retrieve all memories related to a specific activity ID.
 *     parameters:
 *       - name: activityId
 *         in: path
 *         required: true
 *         description: ID of the activity
 *         schema:
 *           type: string
 *           example: "66ed615010288100e0979621"
 *     responses:
 *       200:
 *         description: List of memories related to the activity.
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
 *                   example: "Memories successfully loaded"
 *                 course:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       firstName:
 *                         type: string
 *                         example: "John"
 *                       lastName:
 *                         type: string
 *                         example: "Doe"
 *                       profileImage:
 *                         type: string
 *                         example: "profile.jpg"
 *       500:
 *         description: Internal server error.
 */
memoryRoutes.get('/memories/activity/:activityId', getMemoriesByActivityId);

// delete memories
/**
 * @swagger
 * /memories/activity/{activityId}:
 *   delete:
 *     summary: Delete an memory by activity ID
 *     description: Deletes a specific memories by their activity from the database.
 *     parameters:
 *       - name: activityId
 *         in: path
 *         required: true
 *         description: ID of the activity to delete
 *         schema:
 *           type: string
 *           example: "66ed615010288100e0979621"
 *     responses:
 *       200:
 *         description: Successfully deleted the memories.
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
 *                   example: "Successfully deleted document with _id: 66ed615010288100e0979621"
 *       404:
 *         description: No document found with the provided ID.
 *       500:
 *         description: Internal server error.
 */
memoryRoutes.delete('/memories/activity/:activityId', deleteMemoryByActivityId);

export default memoryRoutes;
