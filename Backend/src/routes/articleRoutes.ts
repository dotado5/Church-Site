import express from "express";
import {
  createArticle,
  deleteArticleById,
  getAllArticles,
  getArticleById,
  getArticlesByAuthorId,
} from "../controllers/ArticleControllers";

const articleRoutes = express.Router();

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Create a new article
 *     description: Adds a new article to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               displayImage:
 *                 type: string
 *                 example: "Saint"
 *               title:
 *                 type: string
 *                 example: "The Title of the Article"
 *               authorId:
 *                 type: string
 *                 example: "author123"
 *               text:
 *                 type: string
 *                 example: "This is the text content of the article."
 *               readTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-10-11T00:00:00Z"
 *     responses:
 *       201:
 *         description: Document successfully uploaded.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: Document successfully uploaded 66ed615010288100e0979621
 *       500:
 *         description: Internal server error.
 */
articleRoutes.post("/", createArticle);

/*
 * @swagger
 * /articles:
 *   get:
 *     summary: Get all articles
 *     description: Retrieve all articles stored in the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved all articles.
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
 *                   example: All articles loaded successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 123abc
 *                       title:
 *                         type: string
 *                         example: "Article Title"
 *                       content:
 *                         type: string
 *                         example: "Article content..."
 *                       authorId:
 *                         type: string
 *                         example: "author123"
 *       500:
 *         description: Internal server error.
 */
articleRoutes.get("/", getAllArticles);

/**
 * @swagger
 * /articles/{articleId}:
 *   get:
 *     summary: Get article by ID
 *     description: Retrieve an article by its unique ID.
 *     parameters:
 *       - in: path
 *         name: articleId
 *         required: true
 *         schema:
 *           type: string
 *           example: 66ed615010288100e0979621
 *         description: The ID of the article to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved the article.
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
 *                   example: Article found
 *                 course:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 66ed615010288100e0979621
 *                     title:
 *                       type: string
 *                       example: "Article Title"
 *                     content:
 *                       type: string
 *                       example: "Article content..."
 *                     authorId:
 *                       type: string
 *                       example: "author123"
 *       500:
 *         description: Internal server error.
 */
articleRoutes.get("/:articleId", getArticleById);

/**
 * @swagger
 * /articles/author/{authorId}:
 *   get:
 *     summary: Get all articles by author
 *     description: Retrieve all articles written by a specific author.
 *     parameters:
 *       - in: path
 *         name: authorId
 *         required: true
 *         schema:
 *           type: string
 *           example: author123
 *         description: The ID of the author whose articles should be retrieved.
 *     responses:
 *       200:
 *         description: Successfully retrieved articles by the specified author.
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
 *                   example: Articles found
 *                 course:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 66ed615010288100e0979621
 *                       title:
 *                         type: string
 *                         example: "Article Title"
 *                       content:
 *                         type: string
 *                         example: "Article content..."
 *                       authorId:
 *                         type: string
 *                         example: "author123"
 *       500:
 *         description: Internal server error.
 */
articleRoutes.get("/author/:authorId", getArticlesByAuthorId);

/**
 * @swagger
 * /articles/{articleId}:
 *   delete:
 *     summary: Delete an article by ID
 *     description: Deletes a specific article by its ID from the database.
 *     parameters:
 *       - name: articleId
 *         in: path
 *         required: true
 *         description: ID of the article to delete
 *         schema:
 *           type: string
 *           example: "66ed615010288100e0979621"
 *     responses:
 *       200:
 *         description: Successfully deleted the article.
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
articleRoutes.delete("/articles/:articleId", deleteArticleById);

export default articleRoutes;
