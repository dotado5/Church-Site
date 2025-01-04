import { Request, Response } from 'express';
import Activity from '../models/activityModel';
import { client } from '../database';
import { ObjectId } from 'mongodb';

// Create Entity A
const uploadActivity = async (req: Request, res: Response) => {

    const { body } = req
    // console.log(body);

    const data = {
        name: 'Saint',
        date: new Date,
        decription: 'new activity',
    }

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

        const database = client.db('MOJ_Web_Database');

        const activitiesCollection = database.collection('Activities');

        const newActivity = new Activity(body);

        // Upload article to MongoDB
        const activity = await activitiesCollection.insertOne(newActivity);

        // Find the document
        const filter = { "name": "Saint" };
        const document = await activitiesCollection.findOne(filter);

        console.log('doc', document);


        // Respond with the saved article
        if (document !== null) {
            res.status(201).send(`Activity successfully uploaded ${activity.insertedId}`);
        }

    } catch (err) {
        res.status(500).send({ error: err });
    } finally {
        await client.close();
    }
};

const getAllActivities = async (req: Request, res: Response) => {
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


        const database = client.db('MOJ_Web_Database');

        const activitiesCollection = await database.collection('Activities').find({}).toArray();
        // console.log('enter', activitiesCollection);

        // Respond with the saved article
        return res.status(200).send({
            status: "Success",
            message: "All activities loaded successfully",
            data: activitiesCollection, // You need to send the actual data, not the collection object
        });
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

// get article by id
const getActivityById = async (req: Request, res: Response) => {

    const { activityId } = req.params;
    const id = '66ed615010288100e0979621'

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

        console.log('enter');

        const database = client.db('MOJ_Web_Database');

        const activitiesCollection = database.collection('Activities');

        const document = await activitiesCollection.findOne({ _id: new ObjectId(activityId) });

        // console.log('doc', document);


        // Respond with the saved article
        if (document !== null) {
            return res.status(200).send({
                status: "Success",
                message: "Activity found",
                course: document,
            });
        }

    } catch (err) {
        res.status(500).send({ error: err });
    } finally {
        await client.close();
    }
};

async function deleteActivityById(req: Request, res: Response) {

    const { activityId } = req.params
    const id = '66ed615010288100e0979621'


    // connect client
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    try {
        const database = client.db('MOJ_Web_Database');
        const activitiesCollection = database.collection('Activities');

        // Delete the document by ID
        const result = await activitiesCollection.deleteOne({ _id: new ObjectId(activityId) });

        if (result.deletedCount === 1) {
            return res.status(200).send({
                status: "Success",
                message: `Successfully deleted document with _id: ${activityId}`,
            });
        } else {
            console.log(`No document found with _id: ${activityId}`);
        }


    } catch (error) {
        console.error("Error occurred while deleting document: ", error);
    } finally {
        await client.close();
    }
}

export { uploadActivity, getAllActivities, getActivityById, deleteActivityById }
