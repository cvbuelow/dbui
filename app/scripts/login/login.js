'use strict';
angular.module('dbui.login', ['ui.router', 'dbui.components.auth'])

.config(function($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'scripts/login/login.html',
    controller: 'LoginCtrl'
  });
})

.controller('LoginCtrl', function($rootScope, $scope, Auth, AUTH_EVENTS) {

  $scope.login = function() {
    Auth.login({
      email: $scope.email,
      password: $scope.password
    })
      .success(function(data) {
        console.log(data);
        //$rootScope.currentUser = data;
        //$location.path('/');
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);

        $scope.alerts = [{
          msg: 'You have successfully logged in.',
          type: 'success'
        }];
      })
      .error(function() {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);

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
