/******************************************************************************************************
 * Author: Colin Van Overschelde 
 * Date: 2/18/2018
 * Description: ajaxRequests.js adds AJAX interactions to the forms contained in AjaxInteractions.html
 ******************************************************************************************************/
 
 var openWeatherKey = "fa7d80c48643dfadde2cced1b1be6ca1"
 
 document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
	
	// Add action listeners
	document.getElementById("get-weather-by-city").addEventListener("click", getWeatherByCity);
	document.getElementById("get-weather-by-zip").addEventListener("click", getWeatherByZip);
	document.getElementById("send-post").addEventListener("click", postHttpBin);
  });
  
  function getWeatherByCity(){
	  console.log("Getting weather by city...");
	  event.preventDefault();
	  var cityName = document.getElementById("city").value;
	  console.log("City name = " + cityName);
	  
	  var req = new XMLHttpRequest();
	  req.open("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + ",us&appid=" + openWeatherKey, true);
	  req.addEventListener("load", function(){
		displayWeather(JSON.parse(req.responseText));
	  });
	  req.send(null);
	  
  }
  
  
  function getWeatherByZip(){
	  console.log("Getting weather by zip...");
	  event.preventDefault();
	  var zipCode = document.getElementById("zip").value;
	  console.log("Zip code = " + zipCode);
	  
	  var req = new XMLHttpRequest();
	  req.open("GET", "http://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + ",us&appid=" + openWeatherKey, true);
	  req.addEventListener("load", function(){
		displayWeather(JSON.parse(req.responseText));  
	  });
	  req.send(null);
  }
  
  function postHttpBin(){
	  console.log("Sending POST to httpBin.org...");
	  event.preventDefault();
	  
	  var req = new XMLHttpRequest();
	  req.open("POST", "http://httpbin.org/post", true);
	  req.setRequestHeader("Content-Type", "application/json");
	  req.addEventListener("load", function(){
		  console.log(JSON.parse(req.responseText));
		  if( req.status >= 200 && req.status < 400 ){
			  var someResponse = JSON.parse(req.responseText);
			  document.getElementById("accept").textContent = someResponse.headers.Accept;
			  document.getElementById("accept-encoding").textContent = someResponse.headers["Accept-Encoding"];
			  document.getElementById("accept-language").textContent = someResponse.headers["Accept-Language"];
			  document.getElementById("connection").textContent = someResponse.headers.Connection;
			  document.getElementById("content-length").textContent = someResponse.headers["Content-Length"];
			  document.getElementById("content-type").textContent = someResponse.headers["Content-Type"];
			  document.getElementById("host").textContent = someResponse.headers.Host;
			  document.getElementById("origin").textContent = someResponse.headers.Origin;
			  document.getElementById("user-agent").textContent = someResponse.headers["User-Agent"];
		  }
		  else{
			  console.log(JSON.parse(req.responseText));
		  }
	  });
	  req.send(null);
  }
  
  function displayWeather( someWeather ){
	  console.log(someWeather);
		var results = document.getElementById("weather-results");
		var weatherHeading = results.firstElementChild.textContent = "Weather Report for " + someWeather.name;
		var currentTemp = Math.round(( (someWeather.main.temp * 9) / 5 ) - 459.67);
		document.getElementById("temp").textContent = currentTemp;
		document.getElementById("condition").textContent = someWeather.weather[0].main;
		document.getElementById("humidity").textContent = someWeather.main.humidity;
		document.getElementById("pressure").textContent = someWeather.main.pressure;
		results.style.visibility="visible";
  }