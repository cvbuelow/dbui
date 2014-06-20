'use strict';
angular.module('dbui.databases', ['ui.router', 'dbui.components.auth'])

.config(function ($stateProvider, USER_ROLES) {
  $stateProvider.state('databases', {
    url: '/databases',
    templateUrl: 'scripts/databases/databases.html',
    data: {
      authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
    }
  });
});
