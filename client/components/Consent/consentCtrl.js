angular.module('citiesApp')
  .controller('consentCtrl', ['$location', '$scope', '$rootScope',  function ( $location, $scope, $rootScope) {
    self = this;

    self.moveDmg = function () {
      $location.path('/demog');
      $location.replace();
    }

  }]);
