'use strict';
angular.module('dbui.components.auth', ['ngCookies'])
  .service('Auth', function($http, $location, $rootScope, $cookieStore) {
      $rootScope.currentUser = $cookieStore.get('user');
      $cookieStore.remove('user');

      return {
        login: function(user) {
          return $http.post('http://localhost:3000/login', user);
        },
        /*signup: function(user) {
          return $http.post('/api/signup', user)
            .success(function() {
              $location.path('/login');

              $alert({
                title: 'Congratulations!',
                content: 'Your account has been created.',
                placement: 'top-right',
                type: 'success',
                duration: 3
              });
            })
            .error(function(response) {
              $alert({
                title: 'Error!',
                content: response.data,
                placement: 'top-right',
                type: 'danger',
                duration: 3
              });
            });
        },*/
        logout: function() {
          return $http.get('/logout').success(function() {
            $rootScope.currentUser = null;
            $cookieStore.remove('user');
            /*$alert({
              content: 'You have been logged out.',
              placement: 'top-right',
              type: 'info',
              duration: 3
            });*/
          });
        }
      };
    });
