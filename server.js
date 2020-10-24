// Dependencies
// ===========================================================
var express = require("express");
var fs = require("fs");
var app = express();
var PORT = 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
var dataBase = require("./db/db.json");
const path = require('path');
// Routes
// ===========================================================
app.get("/", function(req, res) {
  res.json(path.join(__dirname, './assets/index.html'));
});
app.get("/notes", function(req, res) {
  res.sendFile(path.resolve('./public/notes.html'));
});

/* 
get all of something
GET    /customer   /character   /car    (app.get)  "/<resource name>"
// get one of something
GET   /customer/12345  /character/563535    (app.get)  "/<resource>/:id"
// create new instance of something
POST /customer  /character  /car         (app.post)  "/<resource name>"
// update existing instance 
PUT  /customer/12345   /character/45667     (app.put)  "<resource name"/:id
// delete an existing instance
DELETE   /customer/12345  /character/3535363    (app.delete)  "<resource name>/:id"
GET /character                 app.get("/character")
GET /character/123345          app.get("/character/:id")
POST /character
*/

// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});