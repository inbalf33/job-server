const express = require("express");
const dotenv = require("dotenv");
dotenv.config()

const mongoose = require("mongoose");
const connectDB = require("./DB/dbServics");
const router = require("./router/router");
const corsmiddleware = require("./middlewares/cors");
const loggerMiddleware = require("./logger/loggerService");

const app = express();
// const port = 8181;

const PORT = process.env.PORT


// MIDLLEWER

app.use(express.json());

//morgan
app.use(loggerMiddleware());


// CORS
app.use(corsmiddleware);

app.use(router);

// Routs

// Listen

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT} `); 
    connectDB()  
});






