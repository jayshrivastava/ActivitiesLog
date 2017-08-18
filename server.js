var express = require('express');
var sqlite3 = require('sqlite3');
var bodyParser = require('body-parser')
var path = require('path');
var db = new sqlite3.Database('NodeBlog.db');
var app = express();
var port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.get('/post', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/post.html'));
});

//THIS ISNT BEING USED
app.get ('/getnEntries', function (request, response){
  db.all("SELECT count (*) from Entries",
  function (err, num) {console.log("Get successful");
  response.send(num);
});
});

app.get('/Entries', function(request, response){
  db.all("SELECT * FROM Entries",
  function (err, rows) {

    response.send(rows);
    console.log("Get successful");
  });
});

//THIS ISNT BEING USED
app.get('/EntriesTable', function(request, response){
  var posts = [];
  db.serialize(function() {
    db.each("SELECT * FROM Entries", function(err, row) {
      posts.push({title: row.Title, month: row.Month, year: row.Year, body: row.Body})
    }, function() {
console.log ("Get successful");
response.send (posts);

    });
  });
});

app.post('/postEntry', function(request, response) {
  db.run("INSERT INTO Entries (Title, Month, Year, Body) VALUES (?,?,?,?)", request.body.Title,request.body.Month,
  request.body.Year, request.body.Paragraph ,
  function (err, rows) {  console.log("Express POST recieved on port: " + port);
  response.redirect('/blog');
});
});

app.post('/deleteEntry', function(request, response) {
  db.run("DELETE FROM Entries WHERE id = ?",request.body.Num,
  function (err, rows) {  console.log("Post Deleted");
  response.redirect('/blog');
});
});


app.listen(port, function(){
  console.log("Express app listening on port " + port);
});
