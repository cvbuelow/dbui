'use strict';

/**
 * @ngdoc function
 * @name dbuiApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dbuiApp
 */
angular.module('dbuiApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
