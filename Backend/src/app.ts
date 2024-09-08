import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import entityARoutes from './routes/';

dotenv.config();

const app: Application = express();
app.use(express.json());


