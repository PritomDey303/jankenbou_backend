const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");
const DatabaseConfig = require("./utilityClasses/DatabaseConfig");

//express app
const app = express();
//dotenv config
dotenv.config();

//cors
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", " DELETE", "UPDATE", "PUT", " PATCH"],
    credentials: true,
  })
);
//database configuration
DatabaseConfig.config();
//request parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//routes
app.use("/product", require("./routes/productRoute"));
//not found handler
app.use(notFoundHandler);
//error handler
app.use(errorHandler);
//prot setup
const port = 5000 || process.env.PORT;
app.listen(port, () => console.log(`Server started on port ${port}`));
