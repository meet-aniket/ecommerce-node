const mongoose = require("mongoose");

const mongoConfig = async () => {
  const URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecom-store";

  await mongoose
    .connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.info("MONGO CONNECTION SUCCESS !!!");
    })
    .catch((err) => {
      console.error(err);
    })
  
  mongoose.connection.on('connected', () => {
    console.info("MONGO CONNECTED WITH DB !!!");
  })

  mongoose.connection.on('error', (err) => {
    console.error(err.message);
  })

  mongoose.connection.on('disconnected', () => {
    console.info("MONGO CONNECTION CLOSED !!!");
  })

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.info("MONGO CONNECTION CLOSED !!!");
      process.exit(0);
    })
  })
}

module.exports = { mongoConfig };