
angular.module('citiesApp')
  .controller('BetweenQuiz12Ctrl', ['$location', '$rootScope', '$scope', 'skob', '$http', function ($location, $rootScope, $scope, skob, $http) {
    self = this;
    $rootScope.inBQ12 = true;
    $rootScope.change = false;
    $rootScope.inLearn = false;
    $rootScope.inQuiz = false;
    $rootScope.inQuiz2 = false;
    $rootScope.inQuiz3 = false;
    $rootScope.inBQ23 = false;
    $rootScope.movesBQ12 = 0;
    $rootScope.reset12 = 0;
    $rootScope.firstBox12 = "Nan";
    $rootScope.stopBQ12 = false;
    $rootScope.isExpiredBQ12 = false;
    $rootScope.histBQ12 = new Array();
    $scope.realMoves = 0;
    var serverUrl = 'https://calm-everglades-32154.herokuapp.com/';

    skob.theExp();
    self.focus1 = function () {
      $rootScope.foc = false;
    }

    self.focus2 = function () {
      $rootScope.foc = true;
    }
    self.reset = function () {
      $scope.realMoves += $rootScope.movesBQ12; 
      $rootScope.movesBQ12 = 0;
      skob.reset();
    }
    self.undo = function () {
      skob.undo();
    }

    function makeMeTwoDigits(n) {
      return (n < 10 ? "0" : "") + n;
    }

    var curDate = new Date().getTime();
    var curPlusDate = new Date(curDate + 10 * 60000).getTime();
    var x = setInterval(function () {
      if (!$rootScope.stopBQ12) {
        var now = new Date().getTime();
        var distance = curPlusDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("demo12").innerHTML = makeMeTwoDigits(minutes) + ":" + makeMeTwoDigits(seconds);
        if (distance < 0) {
          clearInterval(x);
          $rootScope.isExpiredBQ12 = true;
          document.getElementById("demo12").innerHTML = "EXPIRED";
          skob.pause();
        }
      }
    }, 1000);

    function saveDetails() {
      $scope.realMoves += $rootScope.movesBQ12; 

      data = {
        "userName": $rootScope.userName,
        "minMoves": $scope.moves,
        "firstBox": $scope.uqf,
        "secBox": $scope.uqs,
        "resetNum": $rootScope.reset12,
        "firstBoxToMove": $rootScope.firstBox12,
        "endTime": document.getElementById("demo12").innerHTML,
        "totalMoves": $scope.realMoves,
        "histMoves": $rootScope.histBQ12.toString(),
      };

      $http.post(serverUrl + "Users/addBQ12A", data)
        .then(function (response) {
        }, function (response) {

        });

    }

    self.moveDmg = function () {
      if (document.getElementById("under_BQ12_first").value != document.getElementById("under_BQ12_sec").value) {
        saveDetails();
        $rootScope.isExpiredBQ12 = false;
        $rootScope.stopBQ12 = true;
        $location.path('/quiz2');
        $location.replace();
      }
      else {
        alert("The first and the second boxes can't be the same..");
      }
    }
  }]);