'use strict';
angular.module('dbui.components.api', ['ngResource'])
  .service('API', function($resource) {
    var baseUrl = 'http://localhost:3000';
    var actions = {
      update: { method: 'PUT' }
    };
    this.databases = $resource(baseUrl + '/databases/:databaseId', null, actions);
    this.tables = $resource(baseUrl + '/databases/:databaseId/tables/:tableId', null, actions);
    this.fields = $resource(baseUrl + '/tables/:tableId/fields/:fieldId', null, actions);
    this.records = $resource(baseUrl + '/tables/:tableId/records/:recordId', null, actions);

  });
