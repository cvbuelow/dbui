'use strict';
angular.module('dbui.databases', ['ngRoute', 'dbui.components.auth'])

.config(function ($routeProvider, USER_ROLES) {
  $routeProvider.when('/databases', {
    templateUrl: 'scripts/databases/databases.html',
    data: {
      authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
    }
  });
});
