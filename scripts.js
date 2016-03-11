var wikiEndpoint = "http:///en.wikipedia.org/w/api.php?"

function displayResults(data, results){
  var title;
  var body;
  var link;
  var i=0;
  for(i=0;i<results;i++){
      title=data[1][i];
      body=data[2][i];
      link=data[3][i];
      var item = title +"\n"+body+"\n"+link+"\n";
      $("#search_results").append("<div class='row'><a href='"+link+
        "' target='_blank'><div class='col-md-12 search_entry'>"+"<div class='search_title'>"+title+
        "</div><div class='search_body'>"+body+"</div></div></a></div>");
      console.log(title +"\n"+body+"\n"+link+"\n");
  }
}

function searchWiki(){
  if($("#searchQuery").val().trim().length==0){
    return;
  }
  var action = "action=opensearch";
  var list = "list=search";
  var results=10;
  var limit="&limit="+results;
  var searchString = "&search="+$("#searchQuery").val();
  var queryString = wikiEndpoint + action + searchString+limit;
  $.ajax({
    url: queryString,
    dataType: "jsonp",
    success: function(data){
      console.log(data);
      $("#search_results").empty();
      displayResults(data, 10);
    }
  });
}
$(window).keydown(function(event){
  if(event.keyCode == 13) {
    searchWiki();
    event.preventDefault();
    return false;
  }
});
