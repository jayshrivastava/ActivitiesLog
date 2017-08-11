var express = require('express');
var sqlite3 = require('sqlite3');
var path = require('path');
// var fetch = require ('node-fetch');
var db = new sqlite3.Database('NodeBlog.db');
var app = express();
var port = 3000;

// var getInit = { method: 'GET'};
// var postInit = {method: 'POST'};

// fetch('https://localhost:2000/Entries', getInit)
//     .then(function(data) {
//       console.log("Sent Entries");
//     })
//     .catch(function(error) {
//     console.log("Error");
//     });

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
  var t= request.Title;
  var m =request.Month;
  var y = request.Year;
  var p = request.Paragraph;
    db.run("INSERT INTO Entries (Title, Month, Year, Body) VALUES (?, ?, ?,?)",t,m,y,p,
    function (err, rows) {  console.log("Express POST recieved on port: " + port);
    response.send(rows);
  });
});

app.listen(port, function(){
  console.log("Express app listening on port " + port);
});
