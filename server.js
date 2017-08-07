var express = require('express');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('NodeBlog.db');
var app = express();
var port = 3000;

app.get('/Entries', function(request, response){
    db.all("SELECT * FROM Entries",
    function (err, rows) {console.log("Get Entries: The database currently contains the following: "
    + rows);

      response.send(rows);

    });
});

app.listen(port, function(){
    console.log("Express app listening on port " + port);
});
