const express = require('express')
const mongoose = require('mongoose')
const app = express()
const config = require("./config/config");
const chatRouter = require("./routes/chat");
const port = config.app.port;
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false
}
mongoose.set('strictQuery', true);
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(config.db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
        });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
  app.use("/", express.static('public', options));
  app.use(express.urlencoded({ extended: true }));
  //Routes go here
  app.use("/",chatRouter);
  //Connect to the database before listening
  connectDB().then(() => {
      app.listen(port, () => {
          console.log("listening for requests");
      })
  })