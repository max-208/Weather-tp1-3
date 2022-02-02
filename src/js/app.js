var app = angular.module("MeteoApp", ["ngRoute"]);
app.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "partials/meteovilles.html"
  })
  .when("/villes", {
    templateUrl : "partials/villes.html"
  })
  .when("/previsions", {
    templateUrl : "partials/previsions.html"
  });
  
});

