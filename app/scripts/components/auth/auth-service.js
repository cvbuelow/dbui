'use strict';
angular.module('dbui.components.auth', ['ngCookies'])

  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })

  .constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    guest: 'guest'
  })

  .service('Auth', function($http, $state, $rootScope, $cookieStore, Session) {
      $rootScope.currentUser = $cookieStore.get('user');
      $cookieStore.remove('user');

      return {
        login: function(user) {
          return $http.post('http://localhost:3000/login', user)
            .then(Session.create);
        },
        /*signup: function(user) {
          return $http.post('/api/signup', user)
            .success(function() {
              $state.go('login');

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
          //TODO: actully don't need a logout call. just detroy the session
          return $http.get('/logout').success(function() {
            Session.destroy();
            /*$alert({
              content: 'You have been logged out.',
              placement: 'top-right',
              type: 'info',
              duration: 3
            });*/
          });
        },

        isAuthenticated: function () {
          return !!Session.token;
        },
        isAuthorized: function (authorizedRoles) {
          if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
          }
          return (this.isAuthenticated() &&
            authorizedRoles.indexOf(Session.userRole) !== -1);
        }
      };
    })

  .service('Session', function ($cookieStore) {

    this.create = function (user) {
      this.token = user.token;
      this.email = user.email;
      $cookieStore.put('user', user);
    };

    this.destroy = function () {
      this.token = null;
      this.email = null;
      $cookieStore.remove('user');
    };

    this.restore = function() {
      var user = $cookieStore.get('user');
      if (user) {
        this.create(user);
      }
      return user;
    };

    return this;
  });
