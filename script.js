
var key = "fb021fb2cd887810a1af82c9cd804746";

var searchedCities = localStorage.getItem("history")
console.log(searchedCities.split(","))

for (var i = 0; i < searchedCities.split(",").length; i++) {
    addRow(searchedCities.split(",")[i])
}


$("#search-button").on("click", function () {
    var cityValue = $("#search-value").val()
    $(".jumbotron").addClass("hide")
    $("#forecast-title").empty()
    $("#forecast").empty()
    cityWeather(cityValue)
    cityForecast(cityValue)
})

function addRow(text) {
    var li = $("<li>").addClass("list-group-item list-group-item-action").text(capitalizeCity(text));
    $(".history").append(li);
}

// Current Weather 
function cityWeather(cityValue) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityValue + "&units=imperial&appid=" + key;
    $.get(queryURL, function (data) {
        var searchedCities = localStorage.getItem("history")
        var history = searchedCities.split(",")
        if (history.indexOf(cityValue) === -1) {
            history.push(cityValue);
            console.log(history)
            console.log(searchedCities.split(","))
            window.localStorage.setItem("history", history.join(","));
            addRow(cityValue);
        }

        $("#today").empty();

        var card = $("<div>").addClass("card");
        var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")")
        var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F")
        var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH")
        var hum = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%")
        var cardBody = $("<div>").addClass("card-body")
        var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
       

        title.append(img);
        cardBody.append(title, temp, hum, wind);
        card.append(cardBody);
        $("#today").append(card);

        // uv index 
        uvIndex(data.coord.lon, data.coord.lat)

        function uvIndex(lon, lat) {
            var queryURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${key}&lat=${lat}&lon=${lon}`;
            $.get(queryURL, function (data) {
                var uvValue = $("<button>").addClass("uv-value " + colorUV(data.value)).text(data.value)
                var uvText = $("<p>").addClass("card-text").text("UV Index: ")

                uvText.append(uvValue)
                cardBody.append(uvText)
                console.log(data.value)
            })
        };

        
    

    // UV Index coloring
    function colorUV(uvNumber) {
        if (uvNumber > 0 && uvNumber <= 2) {
            return "gray";
        } else if (uvNumber <= 5) {
            return "yellow";
        } else if (uvNumber <= 7) {
            return "orange";
        } else if (uvNumber <= 10) {
            return "red"
        } else { return "black"; }
    };

})
}

// 5 day forecast 
function cityForecast(city) {
    var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=` + key + `&units=imperial`
    $.get(queryURL, function (data) {
        console.log(data)
        var fiveDay = function() {
            for (var i=0; i<data.list.length; i++) {
                var timeTarget = data.list[i].dt_txt
                console.log(timeTarget)
                var time = timeTarget.split(" ")[1]
                console.log(time)
                if (time === "15:00:00") {
                    var forTitle = $("<h3>").text(city + "'s 5-Day Forecast:")
                    var newCard = $("<div>").addClass("forecast card text-white bg-primary mb-3")
                    var date = $("<div>").addClass("card-header").text(timeTarget.split(" ")[0])
                    var body = $("<div>").addClass("card-body")
                    var icon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png")
                    var temp = $("<p>").addClass("card-text small").text("Temp: " + data.list[i].main.temp + " °F")
                    var hum = $("<p>").addClass("card-text small").text("Hum: " + data.list[i].main.humidity + "%")

                    body.append(icon, temp, hum)
                    date.append(body)
                    newCard.append(date)
                    $("#forecast").append(newCard)
                   
                }
            }
            
            $("#forecast-title").append(capitalizeCity(city) + "'s 5-Day Forecast:")


            
        }
        fiveDay()
    })

    
}

// Overly complicated function for capitalizing city names 
function capitalizeCity(city) {
              
    const capCityName = []
    
    const cityNameArr = city.split(" ")
    console.log(cityNameArr)
    
    for (var i=0; i<cityNameArr.length; i++) {
        const cityLetters = cityNameArr[i].split("")
        console.log(cityLetters)
        const rest = [] 
            
        for (var x=1; x<cityLetters.length; x++) {                          
                    rest.push(cityLetters[x])
                }                   
            
        
        console.log(rest)  
        const cap = cityLetters[0].toUpperCase() + rest.join("")
        capCityName.push(cap)
        
    }
    
    console.log(capCityName)

    return capCityName.join(" ")
       
}

