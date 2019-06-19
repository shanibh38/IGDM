angular.module('citiesApp')
  .controller('instController', ['$location', '$rootScope', function ($location, $rootScope) {
    self = this;

    self.move = function () {
      $location.path('/learn_game');
      $location.replace();
    }

  }]);