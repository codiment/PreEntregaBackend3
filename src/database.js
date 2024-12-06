import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

//Configuramos conexion .env
const mongoURI = process.env.MONGODB_URI;
mongoose.set('strictQuery', false)

const connectDB = async () => {

    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
    }   catch (error) {
        console.log("Error connecting to MongoDB", error.message);
        process.exit(1);
    }

}

export default connectDB;