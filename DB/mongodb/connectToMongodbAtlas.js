const mongoose = require("mongoose");

// const CONNECTION_STRING = "mongodb://localhost:27017/jobServer"
const connectionString = process.env.ATLAS_CONNECTION_STRING


const connectToAtlaslDB = async () => {
    try {
        await await mongoose.connect(connectionString);
        console.log("Connect to MongoDB Atlas");    

    } catch (error) {
        console.log("Could not connect MongoDB Atlas", error.message);        
    }
}

module.exports = connectToAtlaslDB;