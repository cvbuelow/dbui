'use strict';
angular.module('dbui.databases', [
    'ngRoute',
    'dbui.components.auth',
    'dbui.components.api',
    'dbui.databases.detail'
  ])

  .config(function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'scripts/databases/databases.html',
      controller: 'DatabasesCtrl'
    });
  })

  .controller('DatabasesCtrl', function($scope, API) {
    $scope.databases = API.databases.query();
    $scope.deleteDatabase = function(db) {
      API.databases.delete(db);
    };
  });
