$(document).ready(function(){
	nextQuote();	
});

function nextQuote() {
	$.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(json) {
	  $("h1").text(json.quoteText);
	  $("p").text(json.quoteAuthor);
	});
}