import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

mongoClient.connect(() => {
    db = mongoClient.db(process.env.MONGO_DATABASE);
});


export default db;