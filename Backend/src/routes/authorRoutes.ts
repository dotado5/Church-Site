import { Router } from "express";
import {
  createAuthor,
  deleteAuthorById,
  getAllAuthors,
  getAuthorById,
} from "../controllers/AuthorController";

const authorRoutes = Router();

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     description: Adds a new author to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               profileImage:
 *                 type: string
 *                 example: "profileImage.jpg"
 *     responses:
 *       201:
 *         description: Author successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Document successfully uploaded 66ed615010288100e0979621
 *       500:
 *         description: Internal server error.
 */
authorRoutes.post("/", createAuthor);

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     description: Retrieves all authors from the database.
 *     responses:
 *       200:
 *         description: A list of all authors.
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
 *                   example: "All authors loaded successfully"
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
 *                         example: "profileImage.jpg"
 *       500:
 *         description: Internal server error.
 */
authorRoutes.get("/", getAllAuthors);

/**
 * @swagger
 * /authors/{authorId}:
 *   get:
 *     summary: Get an author by ID
 *     description: Retrieve a specific author by their ID.
 *     parameters:
 *       - name: authorId
 *         in: path
 *         required: true
 *         description: ID of the author to retrieve
 *         schema:
 *           type: string
 *           example: "66ed615010288100e0979621"
 *     responses:
 *       200:
 *         description: The requested author.
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
 *                   example: "Author found"
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
 *                       example: "profileImage.jpg"
 *       500:
 *         description: Internal server error.
 */
authorRoutes.get("/:authorId", getAuthorById);

/**
 * @swagger
 * /authors/{authorId}:
 *   delete:
 *     summary: Delete an author by ID
 *     description: Deletes a specific author by its ID from the database.
 *     parameters:
 *       - name: authorId
 *         in: path
 *         required: true
 *         description: ID of the author to delete
 *         schema:
 *           type: string
 *           example: "66ed615010288100e0979621"
 *     responses:
 *       200:
 *         description: Successfully deleted the author.
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
authorRoutes.delete("/:authorId", deleteAuthorById);

export default authorRoutes;
