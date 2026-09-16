const connectToAtlaslDB = require("./mongodb/connectToMongodbAtlas");
const connectToLocalDB = require("./mongodb/connectToMongodbLocally");

const ENVIROMENT = process.env.ENVIROMENT;
const DB_SERVICE = process.env.DB_SERVICE;

const connectDB = async () => {
    if(DB_SERVICE==="mongodb"){
        if (ENVIROMENT==="development") {
            await connectToLocalDB();
            console.log("Conncted to mongoDB");
        }
        if (ENVIROMENT==="production") {
            await connectToAtlaslDB();
        }
    }
    
    // במידה והיה לנו גם SQL היינו מייצרים פונקציה חדשה מה היה קורה אם זה SAL
    // if (DB_SERVICE==="sql") {
    //     ...
    // }
};

module.exports = connectDB;