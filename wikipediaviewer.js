//function that calls search when user presses enter - also called by search button
function pressEnter(event) {
	var e = event.which || event.keyCode;
	if (e == 13) {
		search();
	} // close if
} // close pressEnter()

function search() {
	//clear all search results
	$("#results").empty();

	var searchString = $("#search").val();
	if (searchString.length > 0) {
		$.get("https://en.wikipedia.org/w/api.php?action=opensearch&search=" + encodeURI(searchString) + "&format=json&limit=5", function(searchResult) {
			//for testing
			/*console.log(searchResult[0]); // shows search term
			console.log(searchResult[1]); // shows wiki article titles
			console.log(searchResult[2]); // shows snipper from article
			console.log(searchResult[3]); // shows url
			console.log(searchResult.length); // always 4 (user search string, search titles, search descriptions, link to article)
			console.log(searchResult[1].length);*/

			//searchResult.length will always equal 4, but if there are no search results searchResult[1].length == 0
			if (searchResult[1].length !== 0) {
				for (var i=0; i<searchResult[1].length; i++) {
					if (i === 0) {
						$("#results").append("<h4>Top 5 Wikipedia articles:</h4>");
					} // close if

					$("#results").append(
						"<div class='result-box'>" +
							"<a target='_blank' href='" + searchResult[3][i] + "'>" +
								"<h3 class='result-title'>" + searchResult[1][i] + "</h3>" +
								"<p class='result-description'>" + searchResult[2][i] + "</p>" +
							"</a>" +
						"</div>");
				} // close for
			} // close if

			else {
				$("#results").append("<p>No results</p>");
			} // close else
		}, "jsonp"); // close get()
	} // close if

	else {
		//this will empty results if user enters an empty string
		$("#results").empty();
	} // close else
} // close search()