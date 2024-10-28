import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://jabermohammad:jaberjaber@rental.1rhqg.mongodb.net/rentaldb", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Successfully connected to the database.");
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
        process.exit(1); 
    }
};

export default connectDB;
