
var btn = [];
var key = "fb021fb2cd887810a1af82c9cd804746";

var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + $(city) "&id=524901&appid=" + key



$.get(queryURL)
    .then(
        function (data) {
            console.log(data)
        }
    )

    $(document).on("click, "."cityBtn", function() {

        
    })