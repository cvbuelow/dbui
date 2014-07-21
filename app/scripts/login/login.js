'use strict';
angular.module('dbui.login', ['ngRoute', 'dbui.components.auth'])

.config(function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'scripts/login/login.html',
    controller: 'LoginCtrl'
  });
})

.controller('LoginCtrl', function($scope, Auth) {
console.log($scope);
  $scope.login = function() {
    Auth.login({
      email: $scope.email,
      password: $scope.password
    }).then(null, function() {
        $scope.alerts = [{
          msg: 'Invalid username or password.',
          type: 'danger'
        }];
      });
  };

});
