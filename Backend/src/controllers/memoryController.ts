import { Request, Response } from 'express';
import Memory from '../models/memoryModel';
import { client } from '../database';
import { ObjectId } from 'mongodb';


// Create Entity A
const uploadMemory = async (req: Request, res: Response) => {
    const { body } = req;

    const data = {
        firstName: 'Saint',
        lastName: 'Saint',
        profileImage: 'new image',
    }

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

        // console.log('enter');

        const database = client.db('MOJ_Web_Database');

        const memoriesCollection = database.collection('Memories');

        const newMemory = new Memory(body);

        // Upload article to MongoDB
        const memory = await memoriesCollection.insertOne(newMemory);

        // Find the document
        const filter = { "imageUrl": body.imageUrl };
        const document = await memoriesCollection.findOne(filter);

        // console.log('doc', document);


        // Respond with the saved article
        if (document !== null) {
            res.status(201).send(`Memory successfully uploaded ${memory.insertedId}`);
        }

    } catch (err) {
        res.status(500).send({ error: err });
    } finally {
        await client.close();
    }
};

const getAllMemories = async (req: Request, res: Response) => {
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

        const memoriesCollection = await database.collection('Memories').find({}).toArray();
        // console.log('enter', activitiesCollection);

        // Respond with the saved article
        return res.status(200).send({
            status: "Success",
            message: "All memories loaded successfully",
            data: memoriesCollection, // You need to send the actual data, not the collection object
        });
    } catch (err) {
        res.status(500).send({ error: err });
    }
};

// get article by id
const getMemoryById = async (req: Request, res: Response) => {

    const { memoryId } = req.params;
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

        const memoriesCollection = database.collection('Memories');

        const document = await memoriesCollection.findOne({ _id: new ObjectId(memoryId) });

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

// get all articles for a particular author
const getMemoriesByActivityId = async (req: Request, res: Response) => {

    const { activityId } = req.params;
    const id = '66ed615010288100e0979621'

    // connect client
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    try {

        // console.log('enter');

        const database = client.db('MOJ_Web_Database');
        const memoriesCollection = await database.collection('Memories').find({}).toArray();

        // Filter articles where authorId matches the specified id
        const activityMemories = memoriesCollection.filter((article: any) => article.activityId === activityId);

        // Respond with articles
        if (activityMemories.length !== 0) {
            return res.status(200).send({
                status: "Success",
                message: "Memories successfully loaded",
                course: activityMemories,
            });
        }

    } catch (err) {
        res.status(500).send({ error: err });
    } finally {
        await client.close();
    }
};

async function deleteMemoryByActivityId(req: Request, res: Response) {

    const { activityId } = req.params
    const id = '66ed615010288100e0979621'

    // connect client
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    try {

        const database = client.db('MOJ_Web_Database');
        const authorsCollection = database.collection('Memories');

        const filter = { activityId: activityId }

        // Delete multiple documents based on a filter
        const result = await authorsCollection.deleteMany(filter);

        console.log(`Deleted ${result.deletedCount} documents`);

        if (result.deletedCount === 1) {
            return res.status(200).send({
                status: "Success",
                message: `Successfully Deleted memories of this activities.`,
            });
        } else {
            console.log(`No document found with Activity id: ${activityId}`);
        }

    } catch (error) {
        console.error("Error occurred while deleting document: ", error);
    } finally {
        await client.close();
    }
}

export { uploadMemory, getAllMemories, getMemoryById, getMemoriesByActivityId, deleteMemoryByActivityId }
