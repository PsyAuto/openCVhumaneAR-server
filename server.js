// entry point for app

var express = require("express");
//var mongoDBconnector = require("./mongoDBconnector.js");

var app = express();
var count = 0;

app.get("/", (req, res) =>{
    count++;
    res.json("hello local! count: "+ count.toString());
});

app.get("/user/:id", (req, res) =>{

    var myUser = {
        "userid":req.params["id"],
        "username": "psyauto",
        "wins": 18,
        "losses": 1000,
        "myArray":[
            {name: "foo", value: 12.3},
            {name: "bar", value: 11.2}
        ]
    }
    res.json(myUser);
});


app.listen(8000, ()=>{
    console.log("server has started...");
});
