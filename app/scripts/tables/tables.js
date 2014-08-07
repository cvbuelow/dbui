'use strict';
angular.module('dbui.tables', [
    'ngRoute',
    'dbui.components.auth',
    'dbui.components.api',
    'dbui.tables.detail'
  ])

  .config(function ($routeProvider) {
    $routeProvider.when('/databases/:databaseId/tables', {
      templateUrl: 'scripts/tables/tables.html',
      controller: 'TablesCtrl'
    });
  })

  .controller('TablesCtrl', function($scope, API) {
    var getTables = function() {
      $scope.tables = API.tables.query();
    };
    getTables();

    $scope.deleteTable = function(table) {
      API.tables.delete({databaseId: table.database, tableId: table._id}, getTables);
    };
  });
