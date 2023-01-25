const express = require("express");
const mongoose = require("mongoose");
const app = express();
const publicationRouter = require("./routes/publication.route");
const userRouter = require('./routes/users.route');

//ENV variables
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3030;

//CORS
const cors = require("cors");
app.use(cors());

//Conexión con MONGO.... esperando la DB
mongoose
  .connect(process.env.MONGO_PUBLICATIONS_DB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

mongoose
  .connect(process.env.MONGO_USERS_DB_URI)
  .then(() => {
    console.log("Connected to MongoDB users database");
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
