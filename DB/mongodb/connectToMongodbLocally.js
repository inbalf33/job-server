const mongoose = require("mongoose");

const CONNECTION_STRING = "mongodb://localhost:27017/jobBoard"

const connectToLocalDB = async () => {
    try {
        await mongoose.connect(CONNECTION_STRING);
        console.log("Connect to MongoDB Locally");    

    } catch (error) {
        console.log("Could not connect MongoDB Locally", error.message);        
    }
}

module.exports = connectToLocalDB;