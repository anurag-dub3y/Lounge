const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true }    
    )
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
    // .catch((err)=>{
    //     console.log(err);
    // });
};

module.exports = connectDatabase;

// useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options. Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false.

// URI is Universal Resouce Identifier
