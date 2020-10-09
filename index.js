const express = require('express');
const bodyparser = require('body-parser');
const app = express();
let inputs = [];
let workItems = [];
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view-engine", "ejs");
app.get("/", function(req, res){
    let today = new Date();
   let options={
       weekday:"long",
       day: "numeric",
       month: "long"
   };
let day = today.toLocaleDateString("en-US",options);
   
    res.render("list.ejs", {listtitle: day, listitem: inputs});
    //res.render("list.ejs", {dateval: dt});

});
app.post("/",function(req, res){
    let input = req.body.newItem;
  if(req.body.list == "Work"){
    workItems.push(input);
    res.redirect("/work");
  }
  else{
    inputs.push(input);
    res.redirect("/");
  } 
});

app.get("/work", function(req,res){
    res.render("list.ejs", {listtitle:"Work List",listitem: workItems})
    });

app.post("/work", function(req,res){
  let item = req.body.inputs;
  workItems.push(item);
  res.redirect("/work");
});

app.listen(3000, function(){
   console.log("Server started on port 3000");
});

