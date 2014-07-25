'use strict';
angular.module('dbui.login', ['ngRoute', 'dbui.components.auth'])

  .config(function($routeProvider) {
    $routeProvider.when('/login', {
      templateUrl: 'scripts/login/login.html',
      controller: 'LoginCtrl'
    });
  })

  .controller('LoginCtrl', function($scope, Auth) {
    $scope.login = function() {
      Auth.login($scope.user).then(null, function() {
        $scope.alerts.push({
          msg: 'Invalid username or password.',
          type: 'danger'
        });
      });
    };
  });
