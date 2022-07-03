/**
 * @param mongoose: Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose
 * supports both promises and callbacks. Requires having mongodb installed. Its main function is to connect the applications
 * to the database.
 * @param connect: receives the parameters to make the connection. To avoid a failed process due to timeout, it is encapsulated 
 * inside a try-catch block.
 * is processed asynchronously, and for this it is encapsulated within a function of this type
 * @param module.exports: It will be used to export the function of the connection to the database and be able to use it
 * in any other file
 */
const {connect, connection } = require("mongoose");
const { MONGODB_URI } = require('./config');

const connectDB = () => {
  try{
    connect(MONGODB_URI, { useNewUrlParser:true, useUnifiedTopology:true });
  }catch(e){
    console.log("The connection has failed: ",e);
  }
};
 
connection.on("error", (err) => console.log(err));
module.exports = {connectDB, connection};