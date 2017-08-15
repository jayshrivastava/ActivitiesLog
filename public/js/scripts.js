function createTable(tableData) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
}
//FIX
function getEntriesArray (){
  var url  = "http://localhost:3000/Entries";
  var xhr  = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function () {
    var [] data = xhr.response.body;
    if (xhr.readyState == 4 && xhr.status == "200") {
    console.table(data);
    } else {
      console.error(data);
    }
  }
  xhr.send(null);
}
