angular.module('citiesApp')
  .controller('finalController', ['$location', '$rootScope', '$scope', '$http', function ($location, $rootScope, $scope,$http) {
    self = this;
    var serverUrl = 'https://calm-everglades-32154.herokuapp.com/';

    function saveDetails() {
      data = {
        "bonus": "bonus",
        "userName": $rootScope.userName
      };

      $http.post(serverUrl + "Users/updateBonusA", data)
        .then(function (response) {
        }, function (response) {
        });

      }

      function checkIFGetBonus(){
        if ($rootScope.isBonus)
          saveDetails();
      }
      checkIFGetBonus();
        /*
    $scope.$on('$routeChangeSuccess ', function (event, next, current) {
      event.preventDefault();
    });
*/
  }]);