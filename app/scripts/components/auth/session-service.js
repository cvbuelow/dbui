'use strict';
angular.module('dbui.components.session', ['ngCookies'])
  .service('Session', function ($cookieStore) {

    var self = this;
    var defaultRoles = ['anonymous'];
    this.roles = defaultRoles;

    this.create = function (user) {
      this.token = user.token;
      this.email = user.email;
      this.roles = user.roles;
      $cookieStore.put('user', user);
    };

    this.update = function(user) {
      user.token = this.token;
      this.create(user);
    };

    this.destroy = function () {
      this.token = null;
      this.email = null;
      this.roles = defaultRoles;
      $cookieStore.remove('user');
    };

    this.restore = function() {
      var user = $cookieStore.get('user');
      if (user) {
        this.create(user);
      }
      return user;
    };

    this.isAuthenticated = function() {
      return !!this.token;
    };

    this.isAuthorized = function(authorizedRoles) {
      return !authorizedRoles || authorizedRoles.filter(function(role) {
          return self.roles.indexOf(role) !== -1;
        }).length;
    };
  });
