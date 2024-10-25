const mongoose = require('mongoose');

const conUrl = "mongodb://localhost:27017/";

const connectToMongo = async() => {
    try {
        await mongoose.connect(conUrl);
        console.log("Connected")
      } catch (error) {
        handleError(error);
      }
}


module.exports = connectToMongo;