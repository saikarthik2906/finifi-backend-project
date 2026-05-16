const mongoose = require("mongoose");

const connectDB = async () => {
  try {

    await mongoose.connect(
      "mongodb+srv://saikarthik:Harshini%4031@cluster0.55v2maz.mongodb.net/saikarthik?retryWrites=true&w=majority"
    );

    console.log("MongoDB Connected");

  } catch (error) {

    console.log(error);

  }
};

module.exports = connectDB;