
var key = "fb021fb2cd887810a1af82c9cd804746";

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&units=imperial&appid=" + key;

$(document).on("click", ".searchBtn", function() {
    console.log("Hello");
    cityWeather(cityValue);
    console.log(data)
})

function addRow(text) {
    var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
    $(".history").append(li);
  }

function cityWeather(cityValue) {
    $.get(queryURL, function(data) {
        console.log(data)
        if (history.indexOf(searchValue) === -1) {
            history.push(searchValue);
            window.localStorage.setItem("history", JSON.stringify(history));
            addRow(searchValue);
        }

$("#today").empty();

var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
var card = $("<div>").addClass("card");
var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
var rain = $("<p>").addClass("card-text").text("Rain Forecast: " + data.rain);
var cardBody = $("<div>").addClass("card-body");
var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

title.append(img);
cardBody.append(title, temp, humid, wind);
card.append(cardBody);
$("#today").append(card);

}
});
