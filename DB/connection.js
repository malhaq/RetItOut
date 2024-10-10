import mongoose from "mongoose";

const connectDB = async () => {
    return mongoose.connect(`mongodb+srv://jabermohammad:jaberjaber@rental.1rhqg.mongodb.net/rentaldb`)
    .then(result=>{
        console.log("connected to DB");
    }).catch(err=>{
        console.log(`error to connect DB ${err}`);
    })
};

export default connectDB;
