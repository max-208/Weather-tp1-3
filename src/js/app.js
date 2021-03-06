var app = angular.module("MeteoApp", ["ngRoute"]);
app.config(["$routeProvider",
function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "partials/meteovilles.html",
    controller : "villesCtrl"
  })
  .when("/villes", {
    templateUrl : "partials/villes.html"
  })
  .when("/previsions", {
    templateUrl : "partials/previsions.html"
  });
  
}]);


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

main-container : centre de la page
*/
app.controller('villesCtrl',
  function($scope,$http){
    $scope.element=[];
    $scope.chargeVille=function(city){
      location.href='#!/previsions?city='+city;
    }
    $scope.removeVille=function(city){
      console.log(city);
      var oldItems = JSON.parse(localStorage.getItem('villeList')) || [];
      oldItems = oldItems.filter(function(value, index, arr){ 
        return value != city.toLowerCase();
      });
      localStorage.setItem('villeList', JSON.stringify(oldItems));
      location.href='#!/';
      window.event.stopPropagation();
    }
    var villeList = JSON.parse(localStorage.getItem('villeList')) || [];
    afficheVille(villeList);
    function afficheVille(villes){
      for(let ville of villes){
        $http({
            method : "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?q="+ville+"&APPID=ee07e2bf337034f905cde0bdedae3db8&lang=FR&units=metric"
        }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(response); 
            console.log(response.data); 
            var json = response.data;
            $scope.element.push({
              city : json.name,
              weather_icon : "wi main-icon wi-owm-"+json.weather[0].id,
              temperature : json.main.temp + "°C",
              temperature_min : json.main.temp_min + "°C min",
              temperature_max : json.main.temp_max + "°C max",
              wind_speed : json.wind.speed + "m/s",
              humidity : json.main.humidity + "%",
              pressure : json.main.pressure + "Pa"
            });

          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          })
        }
    }
})


app.controller('addVille',
  function($scope,$http){
    $scope.sumbit=function(form){
      let city = form.$$element[0][0].value.toLowerCase(); //on etrait le nom de la ville du formulaire
      
      console.log(city);
      //on ajoute au localstorage
      var oldItems = JSON.parse(localStorage.getItem('villeList')) || [];
      if(! oldItems.includes(city)){
        oldItems.push(city);
      }
      localStorage.setItem('villeList', JSON.stringify(oldItems));
      
    }
})
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

app.controller('prevision',
  function ($scope, $http) {
    $scope.element = [];
    var ville = JSON.parse(localStorage.getItem('ville')) || [];
    affichePrevisions(ville);
    function affichePrevisions(ville) {

      $http({
        method: "GET",
        url: "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + ville + "&appid=ee07e2bf337034f905cde0bdedae3db8&lang=FR&units=metric"
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        console.log(response);
        console.log(response.data);
        var json = response.data;
        $scope.element.push({
          titrelundi: json.list.dt,
          weather_icon: "wi main-icon wi-owm-" + json.weather[0].id,
          temperature: json.list.temp.day + "°C",
          temperature_min: json.list.temp.min + "°C min",
          temperature_max: json.list.temp.max + "°C max"
        });


      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      })
    }
  }
)