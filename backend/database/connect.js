import mongoose from "mongoose";

/** Importing MongoMemoryServer from the "mongodb-memory-server" package.
* This is used to create an in-memory MongoDB server for testing or temporary purposes,
* so you don't need a real MongoDB server running.
*/
import { MongoMemoryServer } from "mongodb-memory-server";

const connect = async()=>{
    const mongod = await MongoMemoryServer.create();
    const getUri = mongod.getUri(); // The URI (Uniform Resource Identifier) is a connection string used to connect to the temporary database.

    mongoose.set('strictQuery', true) // It ensures that only fields explicitly defined in your schema can be used in query filters.
    const db = await mongoose.connect(getUri);
    console.log("Database connected successfully")

    return db;
}

export default connect;