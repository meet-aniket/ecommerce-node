require("dotenv").config();

const app = require("express")();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");

const cors = require("cors");

// DB Configuration
const { mongoConfig } = require("./config/mongo");
mongoConfig();

// Routes
const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");


// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Routes Definition
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", userRoutes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
})

// Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
})

// PORT Definition
const PORT = process.env.PORT || 8000;

// SERVER Configuration
app.listen(PORT, () => {
  console.info(`app is running at ${PORT}`);
})