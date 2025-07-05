import { Request, Response } from "express";
import Coordinator from "../models/coordinatorModel";
import { client } from "../database";
import { ObjectId } from "mongodb";

const createCoordinator = async (req: Request, res: Response) => {
  const { body } = req;

  // connect client
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");

  try {
    const database = client.db("MOJ_Web_Database");
    const coordinatorsCollection = database.collection("Coordinators");

    const newCoordinator = new Coordinator(body);

    // Upload coordinator to MongoDB
    const coordinator = await coordinatorsCollection.insertOne(newCoordinator);

    // Find the document
    const filter = { name: body.name };
    const document = await coordinatorsCollection.findOne(filter);

    // Respond with the saved coordinator
    if (document !== null) {
      res
        .status(201)
        .send(`Coordinator successfully created ${coordinator.insertedId}`);
    }
  } catch (err) {
    res.status(500).send({ error: err });
  } finally {
    await client.close();
  }
};

const getAllCoordinators = async (req: Request, res: Response) => {
  // connect client
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });

  try {
    const database = client.db("MOJ_Web_Database");

    const coordinatorsCollection = await database
      .collection("Coordinators")
      .find({})
      .toArray();

    // Respond with the coordinators
    return res.status(200).send({
      status: "Success",
      message: "All coordinators loaded successfully",
      data: coordinatorsCollection,
    });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const getCoordinatorById = async (req: Request, res: Response) => {
  const { coordinatorId } = req.params;

  // connect client
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");

  try {
    const database = client.db("MOJ_Web_Database");
    const coordinatorsCollection = database.collection("Coordinators");

    const document = await coordinatorsCollection.findOne({
      _id: new ObjectId(coordinatorId),
    });

    // Respond with the coordinator
    if (document !== null) {
      return res.status(200).send({
        status: "Success",
        message: "Coordinator found",
        data: document,
      });
    } else {
      return res.status(404).send({
        status: "Error",
        message: "Coordinator not found",
      });
    }
  } catch (err) {
    res.status(500).send({ error: err });
  } finally {
    await client.close();
  }
};

const updateCoordinator = async (req: Request, res: Response) => {
  const { coordinatorId } = req.params;
  const { body } = req;

  // connect client
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");

  try {
    const database = client.db("MOJ_Web_Database");
    const coordinatorsCollection = database.collection("Coordinators");

    // Update the document by ID
    const result = await coordinatorsCollection.updateOne(
      { _id: new ObjectId(coordinatorId) },
      { $set: body }
    );

    if (result.modifiedCount === 1) {
      return res.status(200).send({
        status: "Success",
        message: `Successfully updated coordinator with _id: ${coordinatorId}`,
      });
    } else {
      return res.status(404).send({
        status: "Error",
        message: `No coordinator found with _id: ${coordinatorId}`,
      });
    }
  } catch (error) {
    console.error("Error occurred while updating coordinator: ", error);
    res.status(500).send({ error: error });
  } finally {
    await client.close();
  }
};

const deleteCoordinatorById = async (req: Request, res: Response) => {
  const { coordinatorId } = req.params;

  // connect client
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");

  try {
    const database = client.db("MOJ_Web_Database");
    const coordinatorsCollection = database.collection("Coordinators");

    // Delete the document by ID
    const result = await coordinatorsCollection.deleteOne({
      _id: new ObjectId(coordinatorId),
    });

    if (result.deletedCount === 1) {
      return res.status(200).send({
        status: "Success",
        message: `Successfully deleted coordinator with _id: ${coordinatorId}`,
      });
    } else {
      return res.status(404).send({
        status: "Error",
        message: `No coordinator found with _id: ${coordinatorId}`,
      });
    }
  } catch (error) {
    console.error("Error occurred while deleting coordinator: ", error);
    res.status(500).send({ error: error });
  } finally {
    await client.close();
  }
};

export {
  createCoordinator,
  getAllCoordinators,
  getCoordinatorById,
  updateCoordinator,
  deleteCoordinatorById,
}; 