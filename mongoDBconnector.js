var mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/humaneAR", {useNewUrlParser: true, useUnifiedTopology: true});

var Schema = mongoose.Schema;

var userSchema = new Schema({
    userid: String,
    neighbours: Array,
    myTags: Array,
    allTags: Array
});

var users = mongoose.model("users", userSchema);
users.create({
    userid: "0001", 
    neighbours: ["0002", "0003"], 
    myTags: ["tag1", "tag2"], 
    allTags: ["tag1", "tag2", "tag3"]}, 
    (err, doc)=>{
    if(err) console.log(err);
    else console.log(doc);}
);
