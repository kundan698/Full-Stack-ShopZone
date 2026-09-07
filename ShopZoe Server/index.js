const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const http = require("http");
const { Route } = require("./App/Route");

const App = express();


// ===============================
// CORS CONFIGURATION
// ===============================

App.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://localhost:3001",
        ],

        methods: [
            "POST",
            "PATCH",
            "GET",
            "DELETE",
            "PUT",
        ],

        credentials: true,
    })
);


// ===============================
// MIDDLEWARE
// ===============================

App.use(express.json());


// ===============================
// HTTP SERVER
// ===============================

const server = http.createServer(App);


// ===============================
// TEST ROUTE
// ===============================

App.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running successfully",
    });
});

App.use(Route)


// ===============================
// MONGODB CONNECTION
// ===============================

mongoose
    .connect(`${process.env.MONGO_URI}`)
    .then(() => { 
        console.log("MongoDB connected successfully");

        // ===============================
        // SERVER START
        // ===============================

        server.listen(process.env.PORT || 3333, () => {
            console.log(
                `Server running on port ${process.env.PORT || 3333}`
            ); 
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error);
    });