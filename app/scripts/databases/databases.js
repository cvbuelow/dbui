'use strict';
angular.module('dbui.databases', ['ngRoute', 'dbui.components.auth'])

  .config(function ($routeProvider) {
    $routeProvider.when('/databases', {
      templateUrl: 'scripts/databases/databases.html',
      controller: 'DatabasesCtrl',
      roles: ['admin', 'user']
    });
  })

  .controller('DatabasesCtrl', function() {

  });
