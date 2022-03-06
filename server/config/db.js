const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecom-store";

    await mongoose
    .connect(URI, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      useUnifiedTopology: true,
    }).then(() => {
      console.info("MONGO CONNECTION SUCCESS !!!");
    }).catch((err) => {
      console.error(err);
    })
  } catch(err) {
    console.error(err);
    return err;
  }
}