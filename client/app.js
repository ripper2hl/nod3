'use strict';

angular.module('nod3', [
  'ngRoute',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate'
])
  .config(function ($routeProvider, $locationProvider) {

    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

  });
