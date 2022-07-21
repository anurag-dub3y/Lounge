const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { dirname } = require('path');


const errorMiddleware=require("./middleware/error");
// Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle.

app.use(express.static(path.join(__dirname,'../','upload')))
app.use(express.static('upload'))

// Importing route elements
const posts = require("./routes/postRoutes.js");
app.use("/api/v1",posts);
const user = require("./routes/userRoutes.js");
app.use("/api/v1",user);

// Middleware for errors
app.use(errorMiddleware);

module.exports=app;

