'use strict';
angular.module('dbui.databases', ['ngRoute', 'dbui.components.auth'])

  .config(function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'scripts/databases/databases.html',
      controller: 'DatabasesCtrl'
    });
  })

  .controller('DatabasesCtrl', function() {

  });
