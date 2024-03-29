"use strict";

// load modules
const express = require("express");
const cors = require("cors"); // to make cross-origin requests
const morgan = require("morgan");
const routes = require("./routes");
const { sequelize } = require("./models");

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === "true";

// create the Express app
const app = express();

// use cors middleware
app.use(cors());

// Setup request body JSON parsing
app.use(express.json());

// setup morgan which gives us http request logging
app.use(morgan("dev"));

// test connection to database
(async () => {
    try {
        await sequelize.authenticate();
        console.log("Successfully connected to database.");
    } catch (err) {
        console.log("Error when trying to connect to database:", err);
    }
})();

// setup a friendly greeting for the root route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the REST API project!",
    });
});

// Add / import api routes
app.use("/api", routes);

// send 404 if no other route matched
app.use((req, res) => {
    res.status(404).json({
        message: "Route Not Found",
    });
});

// setup a global error handler
app.use((err, req, res, next) => {
    if (enableGlobalErrorLogging) {
        console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
    }

    res.status(err.status || 500).json({
        message: err.message,
        error: {},
    });
});

// set our port
app.set("port", process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get("port"), () => {
    console.log(`Express server is listening on port ${server.address().port}`);
});
