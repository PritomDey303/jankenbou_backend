const mongoose = require("mongoose");
class DatabaseConfig {
  static config() {
    mongoose
      .connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "jankenbou",
      })
      .then(() => console.log("Database connection successful!"))
      .catch((err) => console.log(err.message));
  }
}

module.exports = DatabaseConfig;
