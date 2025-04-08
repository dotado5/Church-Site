import { Request, Response } from "express";
import Author from "../models/authorModel";
import { client } from "../database";
import { ObjectId } from "mongodb";

const createAuthor = async (req: Request, res: Response) => {
  const { body } = req;

  const data = {
    firstName: "Saint",
    lastName: "Saint",
    profileImage: "new image",
  };

  // connect client
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");

  try {
    // const { title, content, author } = req.body;

    // Validate request body
    // if (!title || !content || !author) {
    //     return res.status(400).send({ message: 'All fields are required' });
    // }

    // Create a new article document

    // console.log('enter');

    const database = client.db("MOJ_Web_Database");

    const authorsCollection = database.collection("Authors");

    const newAuthor = new Author(body);

    // Upload article to MongoDB
    const author = await authorsCollection.insertOne(newAuthor);

    // Find the document
    const filter = { firstName: body.firstName };
    const document = await authorsCollection.findOne(filter);

    // console.log('doc', document);

    // Respond with the saved article
    if (document !== null) {
      res
        .status(201)
        .send(`Document successfully uploaded ${author.insertedId}`);
    }
  } catch (err) {
    res.status(500).send({ error: err });
  } finally {
    await client.close();
  }
};

const getAllAuthors = async (req: Request, res: Response) => {
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

    const authorsCollection = await database
      .collection("Authors")
      .find({})
      .toArray();
    console.log("enter", authorsCollection);

    // Respond with the saved article
    return res.status(200).send({
      status: "Success",
      message: "All authors loaded successfully",
      data: authorsCollection, // You need to send the actual data, not the collection object
    });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const getAuthorById = async (req: Request, res: Response) => {
  const { authorId } = req.params;
  const id = "66ed615010288100e0979621";

  // connect client
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");

  try {
    // Validate request body
    // if (!title || !content || !author) {
    //     return res.status(400).send({ message: 'All fields are required' });
    // }

    // Create a new article document

    console.log("enter");

    const database = client.db("MOJ_Web_Database");

    const authorsCollection = database.collection("Authors");

    const document = await authorsCollection.findOne({
      _id: new ObjectId(authorId),
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

async function deleteAuthorById(req: Request, res: Response) {
  const { authorId } = req.params;
  const id = "66ed615010288100e0979621";

  // connect client
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");

  try {
    const database = client.db("MOJ_Web_Database");
    const authorsCollection = database.collection("Authors");

    // Delete the document by ID
    const result = await authorsCollection.deleteOne({
      _id: new ObjectId(authorId),
    });

    if (result.deletedCount === 1) {
      return res.status(200).send({
        status: "Success",
        message: `Successfully deleted document with _id: ${authorId}`,
      });
    } else {
      console.log(`No document found with _id: ${authorId}`);
    }
  } catch (error) {
    console.error("Error occurred while deleting document: ", error);
  } finally {
    await client.close();
  }
}

export { createAuthor, getAllAuthors, getAuthorById, deleteAuthorById };
