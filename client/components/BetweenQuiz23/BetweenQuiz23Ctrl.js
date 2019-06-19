
angular.module('citiesApp')
  .controller('BetweenQuiz23Ctrl', ['$location', '$rootScope', '$scope', 'skob', '$http', function ($location, $rootScope, $scope, skob, $http) {
    self = this;
    $rootScope.inBQ23 = true;
    $rootScope.change = false;
    $rootScope.inLearn = false;
    $rootScope.inQuiz = false;
    $rootScope.inQuiz2 = false;
    $rootScope.inQuiz3 = false;
    $rootScope.inBQ12 = false;
    $rootScope.isExpiredBQ23 = false;
    $rootScope.movesBQ23 = 0;
    $rootScope.reset23 = 0;
    $rootScope.firstBox23 = "Nan";
    $rootScope.stopBQ23 = false;
    $rootScope.histBQ23 = new Array();
    $scope.realMoves = 0;
    var serverUrl = 'https://calm-everglades-32154.herokuapp.com/';

    skob.theExp();

    self.checkFirstQ = function () {
      self.secQ = false;
      self.firstQ = true;
    }
    self.checkSecQ = function () {
      self.secQ = true;
      self.thirdQ = false;
    }

    self.focus1 = function () {
      $rootScope.foc = false;
    }

    function makeMeTwoDigits(n) {
      return (n < 10 ? "0" : "") + n;
    }

    self.focus2 = function () {
      $rootScope.foc = true;
    }

    self.reset = function () {
      $scope.realMoves += $rootScope.movesBQ23; 
      $rootScope.movesBQ23 = 0;
      skob.reset();
    }
    self.undo = function () {
      skob.undo();
    }

    var curDate = new Date().getTime();
    var curPlusDate = new Date(curDate + 10 * 60000).getTime();
    var x = setInterval(function () {
      if (!$rootScope.stopBQ23) {
        var now = new Date().getTime();
        var distance = curPlusDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("demo23").innerHTML = makeMeTwoDigits(minutes) + ":" + makeMeTwoDigits(seconds);
        if (distance < 0) {
          clearInterval(x);
          $rootScope.isExpiredBQ23 = true;
          document.getElementById("demo23").innerHTML = "EXPIRED";
          skob.pause();
        }
      }
    }, 1000);

    function saveDetails() {
      $scope.realMoves += $rootScope.movesBQ23; 

      data = {
        "userName": $rootScope.userName,
        "minMoves": $scope.moves,
        "firstBox": $scope.uqf,
        "secBox": $scope.uqs,
        "resetNum": $rootScope.reset23,
        "firstBoxToMove": $rootScope.firstBox23,
        "endTime": document.getElementById("demo23").innerHTML,
        "totalMoves": $scope.realMoves,
        "histMoves": $rootScope.histBQ23.toString(),
      };

      $http.post(serverUrl + "Users/addBQ23A", data)
        .then(function (response) {
        }, function (response) {
        });

    }

    self.moveDmg = function () {
      if (document.getElementById("under_BQ23_first").value != document.getElementById("under_BQ23_sec").value){
        saveDetails();
        $rootScope.stopBQ23 = true;
        $rootScope.isExpiredBQ23 = false;
        $location.path('/quiz3');
        $location.replace();
        }
        else {
          alert("The first and the second boxes can't be the same..");
        }
    }
  }]);