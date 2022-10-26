const key = "8b0e3f2db2eda27fb20c1d35ce3aba87"

// create a jQuery object for the div with the data class
const $data = $("div.data")

// function to convert Kelvin fahrenheit
const tempConversion = (k) => {
    const f = Math.floor(((k-273.15)*1.8)+32)
    return `${f}°`
}

// function that takes a city parameter and returns the JSON object
const citySearch = (city) => { 

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${key}`
    console.log(url)

    $.ajax(url)
    .then((location) => {
        console.log(location)

        const lat = location[0].lat
        const lon = location[0].lon

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`


        $.ajax(url)
        .then((weather) => {
            console.log(weather)

            $data.empty();
            $data.append($("<div>").html(`<p>Weather for: ${weather.name}</p>`));
            $data.append($("<div>").html(`<p>Temperature: ${tempConversion(weather.main.temp)}</p>`));
            $data.append($("<div>").html(`<p>Feels like: ${tempConversion(weather.main.feels_like)}</p>`));
            $data.append($("<div>").html(`<p>Weather: ${weather.weather[0].description}</p>`));
        })
    })
}

// add a click event to the submit button
$("input[type=submit]").on("click", (event) => {
    // prevent refresh
    event.preventDefault()
    
    // grab text from input
    const inputText = $("input[type=text]").val()

    // update the screen
    citySearch(inputText)

})
