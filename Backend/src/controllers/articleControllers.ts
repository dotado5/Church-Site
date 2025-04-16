import { Request, Response } from "express";
import Article from "../models/articleModel";
import { client } from "../database";
import { ObjectId } from "mongodb";

const createArticle = async (req: Request, res: Response) => {
  const { body } = req;

  const data = {
    displayImage: "Saint",
    title: "Saint",
    authorId: "Saint",
    text: "Saint",
    readTime: new Date(),
  };

  // connect client
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");

  try {
    const database = client.db("MOJ_Web_Database");

    const articlesCollections = database.collection("Articles");

    const newArticle = new Article(body);

    // Upload article to MongoDB
    const article = await articlesCollections.insertOne(newArticle);

    // Find the document
    const filter = { title: body.title };
    const document = await articlesCollections.findOne(filter);

    // Respond with the saved article
    if (document !== null) {
      res
        .status(201)
        .send(`Document successfully uploaded ${article.insertedId}`);
    }
  } catch (err) {
    res.status(500).send({ error: err });
  } finally {
    await client.close();
  }
};

const getAllArticles = async (req: Request, res: Response) => {
  // connect client
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });

  try {
    // const { title, content, author } = req.body;

    // Validate request body
    // if (!title || !content || !author) {
    //     return res.status(400).send({ message: 'All fields are required' });
    // }

    // Create a new article document

    const database = client.db("MOJ_Web_Database");

    const articlesCollections = await database
      .collection("Articles")
      .find({})
      .toArray();
    // console.log('enter', articlesCollections);

    // Respond with the saved article
    return res.status(200).send({
      status: "Success",
      message: "All articles loaded successfully",
      data: articlesCollections, // You need to send the actual data, not the collection object
    });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const getArticleById = async (req: Request, res: Response) => {
  const { articleId } = req.params;

  // connect client
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");

  try {
    const database = client.db("MOJ_Web_Database");

    const articlesCollections = database.collection("Articles");

    const document = await articlesCollections.findOne({
      _id: new ObjectId(articleId),
    });

    // console.log('doc', document);

    // Respond with the saved article
    if (document !== null) {
      return res.status(200).send({
        status: "Success",
        message: "Course found",
        course: document,
      });
    }
  } catch (err) {
    res.status(500).send({ error: err });
  } finally {
    await client.close();
  }
};

const getArticlesByAuthorId = async (req: Request, res: Response) => {
  const { authorId } = req.params;

  // connect client
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");

  try {
    // console.log('enter');

    const database = client.db("MOJ_Web_Database");
    const articlesCollections = await database
      .collection("Articles")
      .find({})
      .toArray();

    // Filter articles where authorId matches the specified id
    const authorArticles = articlesCollections.filter(
      (article: any) => article.authorId === authorId
    );

    // Respond with articles
    if (authorArticles.length !== 0) {
      return res.status(200).send({
        status: "Success",
        message: "Course found",
        course: authorArticles,
      });
    }
  } catch (err) {
    res.status(500).send({ error: err });
  } finally {
    await client.close();
  }
};

async function deleteArticleById(req: Request, res: Response) {
  const { articleId } = req.params;
  const id = "66ed615010288100e0979621";

  // connect client
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");

  try {
    const database = client.db("MOJ_Web_Database");
    const authorsCollection = database.collection("Articles");

    // Delete the document by ID
    const result = await authorsCollection.deleteOne({
      _id: new ObjectId(articleId),
    });

    if (result.deletedCount === 1) {
      return res.status(200).send({
        status: "Success",
        message: `Successfully deleted document with _id: ${articleId}`,
      });
    } else {
      console.log(`No document found with _id: ${articleId}`);
    }
  } catch (error) {
    console.error("Error occurred while deleting document: ", error);
  } finally {
    await client.close();
  }
}

export {
  createArticle,
  getAllArticles,
  getArticleById,
  getArticlesByAuthorId,
  deleteArticleById,
};
