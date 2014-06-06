'use strict';

/**
 * @ngdoc overview
 * @name dbuiApp
 * @description
 * # dbuiApp
 *
 * Main module of the application.
 */
angular
  .module('dbuiApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
