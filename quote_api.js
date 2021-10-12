var timeBeforeFetchingQuoteAgainInHours = 12;

(function() {
	
	let quote = getCookie("quote");
	let author = getCookie("author");
	 
	if (!(quote && author)) {
		fetchQuoteFromAPI();
	} else {
		setValuesInHTML(quote, author);
	}
	
})();

function setValuesInHTML(quote, author) {
	document.getElementById("quote_container").style.opacity = "1";
	 
	document.getElementById("quote_container").innerHTML = quote;
	document.getElementById("author_container").innerHTML = author;
}

function saveQuoteInCookies(quote, author) {
	
	setCookie("quote", quote, timeBeforeFetchingQuoteAgainInHours);
	setCookie("author", author, timeBeforeFetchingQuoteAgainInHours);
}

function fetchQuoteFromAPI() {
	let xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				 
				 var parsedResponse = JSON.parse(this.response);

				 let quote = parsedResponse.contents.quotes[0].quote;
				 let author = parsedResponse.contents.quotes[0].author;
				 
				 saveQuoteInCookies(quote, author);
				 
				 setValuesInHTML(quote, author);
			}
	 };

	 xhttp.open("GET", "https://quotes.rest/qod", true);
	 xhttp.send();
}

function getCookie(cname) {
	 let name = cname + '=';
	 let decodedCookie = decodeURIComponent(document.cookie);
	 let cookieArr = decodedCookie.split(';');

	 for (let i = 0 ; i < cookieArr.length ; i++) {
			let cookie = cookieArr[i];
			while (cookie.charAt(0) == ' ') {
				 cookie = cookie.substring(1);
			}
			if (cookie.indexOf(name) == 0) {
				 return cookie.substring(name.length, cookie.length);
			}
	 }

	 return "";
}

function setCookie(cname, cvalue, exhours) {
	 const date = new Date();
	 date.setTime(date.getTime() + (exhours * 60 * 60 * 1000));

	 let expires = "expires=" + date.toUTCString();
	 document.cookie = cname + '=' + cvalue + ';' + expires + ";path=/" + ";SameSite=Strict";
}
