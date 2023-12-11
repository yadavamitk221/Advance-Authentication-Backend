const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://yadavamitk221:ha0YAu3NjHC0iSHe@atlascluster.hq9jxxy.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;

db.on('err', console.error.bind(console, "Error in connecting to the database"));

db.once("open", function(){
    console.log("Connected to database :: Mongodb");
});