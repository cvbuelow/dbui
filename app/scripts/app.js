'use strict';

angular.module('dbui', [
    'ngRoute',
    'ui.bootstrap',
    'dbui.login',
    'dbui.databases'
  ])

  .config(function ($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/login'
      });
  })

  .run(function ($rootScope, $location, Auth, Session) {

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

  })


  .factory('authInterceptor', function($rootScope, $q, Session) {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        if (Session.token) {
          config.headers.Authorization = 'Bearer ' + Session.token;
        }
        return config;
      },
      responseError: function(response) {
        if([401, 403, 419, 440].indexOf(response.status) !== -1) {
          $rootScope.$broadcast('auth-not-authenticated', response);
        }
        return $q.reject(response);
      }
    };
  })

  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
  })

  .controller('MainCtrl', function($scope, Auth) {
    $scope.logout = Auth.logout;
    $scope.alerts = [];
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
    $scope.alerts.push({
          msg: 'Invalid username or password.',
          type: 'danger'
        });
  });
