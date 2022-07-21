const app = require("./app.js");
const dotenv=require("dotenv");
const connectDatabase = require("./database");
// Handling uncaught exceptions

process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

// Config
dotenv.config({path: "./config.env"});

// Databse connection 
connectDatabase();


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejections
// This will handle cases such as mistyping mongodb in the URI to something else and stuff

process.on("unhandledRejection", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Server is shutting down due to an unhandled promise rejection.");
    server.close(()=>{
        process.exit(1);
    })
})
