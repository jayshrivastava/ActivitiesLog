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

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/Entries', function(request, response){
  db.all("SELECT * FROM Entries",
  function (err, rows) {console.log("Get successful");

  response.send(rows);
});
});
// FIX DB.RUN
app.post('/postEntry', function(request, response) {
    db.run("INSERT INTO Entries (Title, Month, Year, Body) VALUES (?,?,?,?)", request.body.Title,request.body.Month, request.body.Year, request.body.Paragraph ,
    function (err, rows) {  console.log("Express POST recieved on port: " + port);
    response.send(rows);
  });
});

app.listen(port, function(){
  console.log("Express app listening on port " + port);
});
