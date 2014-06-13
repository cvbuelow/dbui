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
    Auth.login({
      email: $scope.email,
      password: $scope.password
    })
      .success(function(data) {
        console.log(data);
        //$rootScope.currentUser = data;
        //$location.path('/');

        $scope.alerts = [{
          msg: 'You have successfully logged in.',
          type: 'success'
        }];
      })
      .error(function() {
        $scope.alerts = [{
          msg: 'Invalid username or password.',
          type: 'danger'
        }];
      });

  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };
});
