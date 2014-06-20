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

  .run(function ($rootScope, AUTH_EVENTS, Auth, Session, $location) {

    // Try to restore session
    Session.restore();

    $rootScope.$on('$locationChangeStart', function (event, next) {
      console.log($location.search(next));
      var authorizedRoles = next.data.authorizedRoles;
      if (!Auth.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        if (Auth.isAuthenticated()) {
          // user is not allowed
          $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
        } else {
          // user is not logged in
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }
      }
    });

  })


  .factory('authInterceptor', function($rootScope, $q, Session, AUTH_EVENTS) {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        if (Session.token) {
          config.headers.Authorization = 'Bearer ' + Session.token;
        }
        return config;
      },
      responseError: function(response) {
        if (response.status === 401) {
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, response);
        }
        if (response.status === 403) {
          $rootScope.$broadcast(AUTH_EVENTS.notAuthorized, response);
        }
        if (response.status === 419 || response.status === 440) {
          $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout, response);
        }
        return $q.reject(response);
      }
    };
  })

  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
