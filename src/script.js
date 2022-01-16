/*
id : description
city : texte decrivant le nom de la ville
weather_icon : icone decrivant le temps actuel
temperature : texte decrivant la temperature
temperature_min : texte decrivant la temperature min
temperature_max : texte decrivant la temperature min
wind_speed : texte decrivant la vitesse du vent
humidity : texte decrivant l'humidité
pressure : texte decrivant la pression
*/

function searchCity (){
    let ville = document.getElementById("search").value;
    console.log(ville);
    getApi(ville).then(Response => editDom(Response));
}

function getApi(ville){
    let request = "http://api.openweathermap.org/data/2.5/weather?q="+ville+"&APPID=ee07e2bf337034f905cde0bdedae3db8";
    return fetch(request)
    .then(response => response.json())
    .then(json => {return json});
}

function editDom(json){
    console.log("Edit DOM");
    document.getElementById("city").innerHTML = json.name;
    document.getElementById("weather_icon").className = "wi main-icon wi-owm-"+json.weather[0].id;
    document.getElementById("temperature").innerHTML = KtoC(json.main.temp) + "°C";
    document.getElementById("temperature_min").innerHTML = KtoC(json.main.temp_min) + "°C";
    document.getElementById("temperature_max").innerHTML = KtoC(json.main.temp_max) + "°C";
    document.getElementById("wind_speed").innerHTML = json.wind.speed + "m/s";
    document.getElementById("humidity").innerHTML = json.main.humidity + "%";
    document.getElementById("pressure").innerHTML = json.main.pressure + "Pa";
    
}
function KtoC(temp){
    return Math.round(temp-273.15)
}


getApi("vannes").then(Response => editDom(Response));

//{
//    "coord": {
//      "lon": -2.5,
//      "lat": 47.8333
//    },
//    "weather": [
//      {
//        "id": 803,
//        "main": "Clouds",
//        "description": "broken clouds",
//        "icon": "04d"
//      }
//    ],
//    "base": "stations",
//    "main": {
//      "temp": 281.02,
//      "feels_like": 280.09,
//      "temp_min": 278.63,
//      "temp_max": 282.21,
//      "pressure": 1039,
//      "humidity": 85,
//      "sea_level": 1039,
//      "grnd_level": 1028
//    },
//    "visibility": 10000,
//    "wind": {
//      "speed": 1.76,
//      "deg": 74,
//      "gust": 3.17
//    },
//    "clouds": {
//      "all": 82
//    },
//    "dt": 1641979333,
//    "sys": {
//      "type": 1,
//      "id": 6576,
//      "country": "FR",
//      "sunrise": 1641974167,
//      "sunset": 1642005596
//    },
//    "timezone": 3600,
//    "id": 2970775,
//    "name": "Arrondissement de Vannes",
//    "cod": 200
//}