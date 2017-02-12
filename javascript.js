$(document).ready(function(){
  var myTerm;
  var myAPI = 'https://en.wikipedia.org/w/api.php';

  $("#searchBar").autocomplete({
    source: function(request, response) {
      $.ajax({
        url: myAPI,
        dataType: 'jsonp',
        data: {
          'action': "opensearch",
  	      'format': "json",
  	      'search': request.term
        },
        success: function(data) {
          response(data[1]);
        }
      });
    },
    minLength: 2,
    select: function (event, ui) {
      $("#searchBar").val(ui.item.value);
    }
  });

  var data;
  var mySearch = function() {
    myTerm = $("#searchBar").val();
    $("#result-div").empty();
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
      success: function(responses){
        data = responses;
        getResult(data);
      },
      error: function(responses) {
        alert("Error. Please try again.");
      }
    });
  }

  var getResult = function(result) {
    var resultsDivs;
    for(var i = 0; i < result[1].length; i++) {
      resultsDivs = "<div class='col-xs-2 empty-div'></div><div class='col-xs-8 returned-div'><h3><a target='_blank' href='" + result[3][i] + "'>" + result[1][i] + "</a> " + "</h3> <p>" + result[2][i] + "</p></div>";
      $(resultsDivs).appendTo("#result-div");
    }
  }

  $("#search-btn").click(function() {
    mySearch();
  });

  $("#searchBar").keypress(function(e){
    if(e.keyCode == 13) {
      mySearch();
    }
  });
});
