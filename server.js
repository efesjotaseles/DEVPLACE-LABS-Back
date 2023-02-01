const express = require("express");
const mongoose = require("mongoose");
const app = express();
const multer = require("multer");
const path = require("path");
const { fileURLToPath} = require("url");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user.routes");
const postRouter = require("./routes/post");
const {register} = require("./controllers/auth");
const {createPost} = require("./controllers/post");
const {verifyToken} = require("./middleware/auth");
const bodyParser = require("body-parser");


//ENV variables
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const port = process.env.PORT || 3030;

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

//CORS
const cors = require("cors");
app.use(cors());

//Conexión con MONGO.... esperando la DB
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_PUBLICATIONS_DB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

  /* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts" ,verifyToken,upload.single("picture"), createPost);

/**ENDPOINTS */

app.use("/auth",authRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});