require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const path = require("path");
const createError = require("http-errors");

// Routes
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");


// DB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.info("MONGO CONNECTION SUCCESS !!!");
  })
  .catch((err) => {
    console.error("can not connect with database");
  });

const connection = mongoose.connection;

// console.log(connection)

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Routes Definition
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", userRoutes);

// PORT Definition
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`)
})