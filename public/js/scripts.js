
function getEntriesArray (){
  var url  = "/Entries";
  var xhr  = new XMLHttpRequest()
  xhr.open('GET', url, true);
  xhr.onload = function () {
    var obj = JSON.parse(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == "200") {

      var tbl=$("<table/>").attr("id","mytable");
      $("#div1").append(tbl);
      for(var i=0;i<obj.length;i++)
      {
        var tr="<tr>";
        var td1="<td>"+obj[i]["id"]+"</td>";
        var td2="<td>"+obj[i]["Title"]+"</td>";
        var td3="<td>"+obj[i]["Month"]+"</td>";
        var td4="<td>"+obj[i]["Year"]+"</td>";
        var td5="<td>"+obj[i]["Body"]+"</td></tr>";
        $("#mytable").append(tr+td1+td2+td3+td4+td5);

      }
    }
  }
  xhr.send(null);
}

//buttons are null right now
function getBlog(){
  var url = "/blog";
  var xhttp = new XMLHttpRequest;
  xhttp.open ('GET', url, true);
  xhttp.send (null);
};
function getPost(){
  var url = "/post";
  var xhttp = new XMLHttpRequest;
  xhttp.open ('GET', url, true);
  xhttp.send (null);
};
