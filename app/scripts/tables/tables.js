'use strict';
angular.module('dbui.tables', [
    'ngRoute',
    'dbui.components.auth',
    'dbui.components.api',
    'dbui.tables.detail'
  ])

  .config(function ($routeProvider) {
    $routeProvider.when('/databases/:databaseId/list-tables', {
      templateUrl: 'scripts/tables/tables.html',
      controller: 'TablesCtrl'
    });
  })

  .controller('TablesCtrl', function($scope, $routeParams, API) {
    var getTables = function() {
      $scope.tables = API.tables.query($routeParams);
    };
    getTables();

    $scope.databaseId = $routeParams.databaseId;

    $scope.deleteTable = function(table) {
      API.tables.delete({databaseId: table.database, tableId: table._id}, getTables);
    };
  });
