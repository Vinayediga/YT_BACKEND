import mongoose from "mongoose";


const connectDB = async () =>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_STR}/${process.env.DB_NAME}`)
        console.log("mongodb connected DB HOST:",connection.connection.host);
        
        
    } catch (error) {
        console.log("mongodb connection error:",error);
        process.exit(1)
        
    }
}

export default connectDB