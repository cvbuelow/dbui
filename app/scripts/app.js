'use strict';

angular.module('dbui', [
    'ngRoute',
    'ui.bootstrap',
    'dbui.components.auth',
    'dbui.login',
    'dbui.databases'
  ])

  .config(function($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/login'
      });
  })

  .controller('AppCtrl', function($scope, $rootScope, $location, Auth, Session) {

    // Try to restore session
    Session.restore();

    var gotoLogin = function() {
      $location.path('/login');
    };
    var gotoDash = function() {
      $location.path('/');
    };

    $rootScope.$on('auth-login-success', gotoDash);
    $rootScope.$on('auth-not-authorized', gotoDash);

    $rootScope.$on('auth-logout-success', gotoLogin);
    $rootScope.$on('auth-not-authenticated', Auth.logout);

    $rootScope.$on('$routeChangeStart', function (event, next) {
      // Restrict access per roles defined on route
      if (!Session.isAuthenticated()) {
        $rootScope.$broadcast('auth-not-authenticated');
      } else if (!Session.isAuthorized(next.roles)) {
        $rootScope.$broadcast('auth-not-authorized');
      }
    });

    $scope.logout = Auth.logout;
    $scope.alerts = [];
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  });
