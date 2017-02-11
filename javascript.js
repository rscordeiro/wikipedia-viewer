$(document).ready(function(){
  var myTerm;
  var myAPI = 'https://en.wikipedia.org/w/api.php?';
  const MAX_LOOP = 10; //if the limit value on data object changes, change this constante to match its value.

  var data;
  var mySearch = function() {
    $.ajax({
      url: myAPI,
      dataType: 'jsonp',
      data: {
	      "action": "opensearch",
	      "format": "json",
	      "search": myTerm,
	      "namespace": "0",
	      "limit": "10",
	      "suggest": 1,
	      "warningsaserror": 1,
	      "utf8": 1,
	      "formatversion": "latest",
      },
      success: function(response){
        data = response;
        getResult(data);
        console.log(data);
      },
      error: function(response) {
        alert("Error. Please try again.");
      }
    });
  }

  var getResult = function(result) {
    var resultsDivs;
    for(var i = 0; i < MAX_LOOP; i++) {
      resultsDivs += "<div class='col-xs-2 empty-div'></div><div class='col-xs-8 returned-div'><h3>" + result[1][i] + "</h3> <p>" + result[2][i] + "</p> <footer> <a target='_blank' href='" + result[3][i] + "'>" + result[3][i] + "</a> </footer> </div><br>";
    }
    $("#result-div").html(resultsDivs);
  }

  $("#search-btn").click(function() {
    myTerm = $("#searchBar").val();
    mySearch();
  });

  /*$("#searchBar").keypress(function(e){
    if (e.keyCode == 13) {
      myTerm = $("#searchBar").val();
      mySearch();
    }
  });*/
});
