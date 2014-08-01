'use strict';
angular.module('dbui.tables.detail', ['ngRoute', 'dbui.components.api'])

  .config(function ($routeProvider) {
    $routeProvider.when('/databases/:databaseId/tables/:tableId?', {
      templateUrl: 'scripts/tables/tables-detail.html',
      controller: 'TableCtrl'
    });
  })

  .controller('TableCtrl', function($scope, $routeParams, $location, API) {
    $scope.databaseId = $routeParams.databaseId;

    if ($routeParams.databaseId) {
      $scope.table = API.tables.get($routeParams);
    } else {
      $scope.table = new API.tables();
    }

    $scope.save = function() {
      if ($routeParams.databaseId) {
        $scope.table.$update();
      } else {
        $scope.table.$save(function(res) {
          $location.path('/tables/' + res.id + '/fields');
        });
      }
    };

  });
