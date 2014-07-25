'use strict';
angular.module('dbui.components.http', ['dbui.components.session'])

  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }
    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
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
  });

