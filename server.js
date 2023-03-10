const express = require("express");
const mongoose = require("mongoose");
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const publicationRouter = require("./routes/publication.route");
const userRouter = require('./routes/users.route');

//MIDDLEWARE
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
const cors = require("cors");
app.use(cors());

//ENV variables
require("dotenv").config();
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3030;

//Conexión con MONGO.... esperando la DB
mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

/**ENDPOINTS */
app.use("/publications", publicationRouter);
app.use('/users',userRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
