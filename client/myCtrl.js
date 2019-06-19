angular.module('citiesApp')
    .controller('myCtrl', ['$rootScope' , '$location', function ($rootScope, $location) {

        self = this;
        $rootScope.inQuiz = false;
        $rootScope.movesQuiz = 0;
        $rootScope.movesQuiz2 = 0;
        $rootScope.movesQuiz3 = 0;
        $rootScope.movesBQ12 = 0;
        $rootScope.movesBQ23 = 0;
        $rootScope.inQuiz2 = false;
        $rootScope.inQuiz3= false;
        $rootScope.inBQ12 = false;
        $rootScope.inBQ23 = false;
        $rootScope.inLearn = false;
        $rootScope.histQ = {};
        $rootScope.histQ2 = {};
        $rootScope.histQ3 = {};
        $rootScope.histBQ12 = {};
        $rootScope.histBQ23 = {};
        $rootScope.token = "shalom";
        $rootScope.firstBox = "Nan";
        $rootScope.firstBox2 = "Nan" ; 
        $rootScope.firstBox3 = "Nan";
        $rootScope.firstBox12 = "Nan";
        $rootScope.firstBox23 = "Nan" ;
        $rootScope.reset = 0;
        $rootScope.reset2 = 0;
        $rootScope.reset3 = 0;
        $rootScope.reset12 = 0;
        $rootScope.reset23 = 0;
        //$rootScope.userName = new Array();
/*
        $scope.$on('$locationChangeStart', function(event, next, current){
                event.preventDefault();            
            });

        $scope.turn = function()
        {
          location.href = '#/consent';
        }
*/
      
    }]);
