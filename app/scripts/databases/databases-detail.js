'use strict';
angular.module('dbui.databases.detail', ['ngRoute', 'dbui.components.api'])

  .config(function ($routeProvider) {
    $routeProvider.when('/databases/:databaseId?', {
      templateUrl: 'scripts/databases/databases-detail.html',
      controller: 'DatabaseCtrl'
    });
  })

  .controller('DatabaseCtrl', function($scope, $routeParams, $location, API) {
    $scope.databaseId = $routeParams.databaseId;

    if ($routeParams.databaseId) {
      $scope.database = API.databases.get($routeParams);
    } else {
      $scope.database = new API.databases();
    }

    $scope.save = function() {
      if ($routeParams.databaseId) {
        $scope.database.$update();
      } else {
        $scope.database.$save(function(res) {
          $location.path('/databases/' + res.role.database + '/tables');
        });
      }
    };

  });
