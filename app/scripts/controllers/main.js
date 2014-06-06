'use strict';

/**
 * @ngdoc function
 * @name dbuiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dbuiApp
 */
angular.module('dbuiApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
