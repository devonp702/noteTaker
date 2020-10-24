// Dependencies
// ===========================================================
var express = require("express");
var fs = require("fs");
var app = express();
const PORT = process.env.PORT || 3000;
var archive = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static('public'));
var dataBase = require("./db/db.json");
const path = require('path');
// Routes
// ===========================================================

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, './db/db.json'))
});

app.post("/api/notes", function (req, res) {
  let newNote = req.body;
  let myId = (archive.length).toString();
  newNote.id = myId;
  archive.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(archive));
  res.json(archive);
});


app.delete("/api/notes/:id", function (req, res) {
  let deleteId = req.params.id;
  let newArchive = archive.filter(obj => obj.id != deleteId);
  archive = newArchive;
  let newId= 0;
  for(obj in archive) {
    obj.id= newId.toString();
    newId++;
  }
  fs.writeFileSync('./db/db.json', JSON.stringify(archive));
  res.json(archive);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
// Listener
// ===========================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});