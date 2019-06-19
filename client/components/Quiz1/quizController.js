
angular.module('citiesApp')
  .controller('quizController', ['$location', '$rootScope', '$scope', 'skob', '$http', function ($location, $rootScope, $scope, skob, $http) {
    var serverUrl = 'https://calm-everglades-32154.herokuapp.com/';
    self = this;
    self.contToTOM = true;
    $rootScope.inQuiz = true;
    $rootScope.inLearn = false;
    $rootScope.inQuiz2 = false;
    $rootScope.inQuiz3 = false;
    $rootScope.inBQ12 = false;
    $rootScope.inBQ23 = false;
    $rootScope.movesQuiz = 0;
    $rootScope.reset = 0;
    $rootScope.histQ = new Array();
    $rootScope.firstBox = "Nan";
    $rootScope.stopQuiz = false;
    $rootScope.isExpired = false;
    $rootScope.isBonus = true;
    $scope.realMoves = 0;

    var e = skob.theExp();

    self.focus1 = function () {
      $rootScope.foc = false;
    }

    self.focus2 = function () {
      $rootScope.foc = true;
    }

    self.reset = function () {
      $scope.realMoves += $rootScope.movesQuiz; 
      $rootScope.movesQuiz = 0;
      skob.reset();
    }
    self.undo = function () {
      skob.undo();
    }
    function makeMeTwoDigits(n) {
      return (n < 10 ? "0" : "") + n;
    }
    var curDate = new Date().getTime();
    var curPlusDate = new Date(curDate + 15 * 60000).getTime();
    var x = setInterval(function () {
      if (!$rootScope.stopQuiz) {
        var now = new Date().getTime();
        var distance = curPlusDate - now;
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("demo1").innerHTML = makeMeTwoDigits(minutes) + ":" + makeMeTwoDigits(seconds);
        if (distance < 0) {
          clearInterval(x);
          document.getElementById("demo1").innerHTML = "EXPIRED";
          $rootScope.isExpired = true;
          skob.pause();
        }
      }
    }, 1000);

    function saveDetails() {
      $scope.realMoves += $rootScope.movesQuiz;
      if ($scope.moves < 90 || $scope.moves > 110)
        $rootScope.isBonus = false;

      data = {
        "userName": $rootScope.userName,
        "minMoves": $scope.moves,
        "firstBox": $scope.uqf,
        "secBox": $scope.uqs,
        "hardme": $scope.hardme,
        "hardthem": $scope.hardthem,
        "firstMovesRate": $scope.firstR,
        "secondMovesRate": $scope.secR,
        "thirdMovesRate": $scope.thirdR,
        "forthMovesRate": $scope.forthR,
        "fifthMovesRate": $scope.fiveR,
        "firstBox1Rate": $scope.firstB1,
        "firstBox2Rate": $scope.firstB2,
        "firstBox3Rate": $scope.firstB3,
        "firstBox4Rate": $scope.firstB4,
        "firstBox5Rate": $scope.firstB5,
        "firstBox6Rate": $scope.firstB6,
        "secondBox1Rate": $scope.secondB1,
        "secondBox2Rate": $scope.secondB2,
        "secondBox3Rate": $scope.secondB3,
        "secondBox4Rate": $scope.secondB4,
        "secondBox5Rate": $scope.secondB5,
        "secondBox6Rate": $scope.secondB6,
        "resetNum": $rootScope.reset,
        "firstBoxToMove": $rootScope.firstBox,
        "endTime": document.getElementById("demo1").innerHTML,
        "totalMoves": $scope.realMoves,
        "histMoves": $rootScope.histQ.toString(),
      };

      $http.post(serverUrl + "Users/addQuiz1A", data)
        .then(function (response) {
        }, function (response) {
        });
    }

    self.checkFirstQuiz = function () {
      if (document.getElementById("under_quiz1_first").value != document.getElementById("under_quiz1_sec").value)
        self.contToTOM = false;
      else
        alert("The first and the second boxes can't be the same..");
    }

    function checkDetails() {
      if (
        ($scope.firstR + $scope.secR + $scope.thirdR + $scope.forthR + $scope.fiveR != 100) ||
        ($scope.firstB1 + $scope.firstB2 + $scope.firstB3 + $scope.firstB4 + $scope.firstB5 + $scope.firstB6 != 100) ||
        ($scope.secondB1 + $scope.secondB2 + $scope.secondB3 + $scope.secondB4 + $scope.secondB5 + $scope.secondB6 != 100)
      )
        return false;
      else
        return true;
    }

    function completeTo100Moves() {
      var numToComplete = 0;
      var detailsWeHave = 0;
      if ($scope.firstR == undefined)
        numToComplete++;
      else
        detailsWeHave += $scope.firstR;
      if ($scope.secR == undefined)
        numToComplete++;
      else
        detailsWeHave += $scope.secR;
      if ($scope.thirdR == undefined)
        numToComplete++;
      else
        detailsWeHave += $scope.thirdR;
      if ($scope.forthR == undefined)
        numToComplete++;
      else
        detailsWeHave += $scope.forthR;
      if ($scope.fiveR == undefined)
        numToComplete++;
      else
        detailsWeHave += $scope.fiveR;

      if (Math.floor(detailsWeHave) > 100) {
        return false;
      }
      else {
        detailsWeHave = 100 - detailsWeHave;
        detailsWeHave = detailsWeHave / numToComplete;
        if ($scope.firstR == undefined)
          $scope.firstR = detailsWeHave;
        if ($scope.secR == undefined)
          $scope.secR = detailsWeHave;
        if ($scope.thirdR == undefined)
          $scope.thirdR = detailsWeHave;
        if ($scope.forthR == undefined)
          $scope.forthR = detailsWeHave;
        if ($scope.fiveR == undefined)
          $scope.fiveR = detailsWeHave;
        return true;
      }
    }

    function completeTo100First() {
      var numToComplete = 0;
      var detailsWeHave = 0;
      if ($scope.firstB1 == undefined)
        numToComplete++;
      else
        detailsWeHave += $scope.firstB1;
      if ($scope.firstB2 == undefined)
        numToComplete++;
      else
        detailsWeHave += $scope.firstB2;
      if ($scope.firstB3 == undefined)
        numToComplete++;
      else
        detailsWeHave += $scope.firstB3;
      if ($scope.firstB4 == undefined)
        numToComplete++;
      else
        detailsWeHave += $scope.firstB4;
      if ($scope.firstB5 == undefined)
        numToComplete++;
      else
        detailsWeHave += $scope.firstB5;
      if ($scope.firstB6 == undefined)
        numToComplete++;
      else
        detailsWeHave += $scope.firstB6;

      if (Math.floor(detailsWeHave) > 100) {
        return false;
      }
      else {
        detailsWeHave = 100 - detailsWeHave;
        detailsWeHave = detailsWeHave / numToComplete;
        if ($scope.firstB1 == undefined)
          $scope.firstB1 = detailsWeHave;
        if ($scope.firstB2 == undefined)
          $scope.firstB2 = detailsWeHave;
        if ($scope.firstB3 == undefined)
          $scope.firstB3 = detailsWeHave;
        if ($scope.firstB4 == undefined)
          $scope.firstB4 = detailsWeHave;
        if ($scope.firstB5 == undefined)
          $scope.firstB5 = detailsWeHave;
        if ($scope.firstB6 == undefined)
          $scope.firstB6 = detailsWeHave;
        return true;
      }
    }

    function completeTo100Sec() {
      var numToComplete = 0;
      var detailsWeHave = 0;
      if ($scope.secondB1 == undefined)
        numToComplete++;
      else
        detailsWeHave += $scope.secondB1;
      if ($scope.secondB2 == undefined)
        numToComplete++;
      else
        detailsWeHave += $scope.secondB2;
      if ($scope.secondB3 == undefined)
        numToComplete++;
      else
        detailsWeHave += $scope.secondB3;
      if ($scope.secondB4 == undefined)
        numToComplete++;
      else
        detailsWeHave += $scope.secondB4;
      if ($scope.secondB5 == undefined)
        numToComplete++;
      else
        detailsWeHave += $scope.secondB5;
      if ($scope.secondB6 == undefined)
        numToComplete++;
      else
        detailsWeHave += $scope.secondB6;

      if (Math.floor(detailsWeHave) > 100) {
        return false;
      }
      else {
        detailsWeHave = 100 - detailsWeHave;
        detailsWeHave = detailsWeHave / numToComplete;
        if ($scope.secondB1 == undefined)
          $scope.secondB1 = detailsWeHave;
        if ($scope.secondB2 == undefined)
          $scope.secondB2 = detailsWeHave;
        if ($scope.secondB3 == undefined)
          $scope.secondB3 = detailsWeHave;
        if ($scope.secondB4 == undefined)
          $scope.secondB4 = detailsWeHave;
        if ($scope.secondB5 == undefined)
          $scope.secondB5 = detailsWeHave;
        if ($scope.secondB6 == undefined)
          $scope.secondB6 = detailsWeHave;
        return true;
      }
    }

    function checkAgainFirst() {
      if (document.getElementById("under_quiz1_first").value != document.getElementById("under_quiz1_sec").value &&
        document.getElementById("under_quiz1_first").value != "" && document.getElementById("under_quiz1_sec").value != "" &&
        $scope.moves > 0
      )
        return true;
      else
        return false;
    }

    function completerButUnder100() {
      if (
        (($scope.secondB1 != undefined && $scope.secondB2 != undefined && $scope.secondB3 != undefined && $scope.secondB4 != undefined && $scope.secondB5 != undefined && $scope.secondB6 != undefined) &&
          (Math.floor($scope.secondB1 + $scope.secondB2 + $scope.secondB3 + $scope.secondB4 + $scope.secondB5 + $scope.secondB6100)<100)) ||
        (($scope.firstB1 != undefined && $scope.firstB2 != undefined && $scope.firstB3 != undefined && $scope.firstB4 != undefined && $scope.firstB5 != undefined && $scope.firstB6 != undefined) &&
          (Math.floor($scope.firstB1 + $scope.firstB2 + $scope.firstB3 + $scope.firstB4 + $scope.firstB5 + $scope.firstB6)<100))
        ||
        (($scope.firstR != undefined && $scope.secR != undefined && $scope.thirdR != undefined && $scope.forthR != undefined && $scope.fiveR != undefined) &&
          (Math.floor($scope.firstR + $scope.secR + $scope.thirdR + $scope.forthR + $scope.fiveR)<100)
        ))
        return true;
      else
        return false;
    }

    self.moveDmg = function () {
      if (checkDetails()) {
        if (checkAgainFirst()) {
          saveDetails();
          $rootScope.stopQuiz = true;
          $rootScope.isExpired = false;
          delete e;
          $location.path('/bq12');
          $location.replace();
        }
        else {
          alert("Please fill properly the first section of questions");
        }
      }
      else {
        if (completerButUnder100()) {
          alert("The sum of one (or more) of the filed's precentage is not equal to 100, please check it or clear the fields you had like to fill automatically by the system.");
        }
        else {
          if (confirm(`The sum of one (or more) of the filed's precentage is not equal to 100, Those fields will filled automatically by the rest of the precentages left, equaly.
        Are you sure you want to continue? `)) {
            var checkMoves = completeTo100Moves();
            var checkFirst = completeTo100First();
            var checkSec = completeTo100Sec();

            if (checkMoves && checkFirst && checkSec) {
              if (checkAgainFirst()) {
                saveDetails();
                $rootScope.stopQuiz = true;
                $rootScope.isExpired = false;
                delete e;
                $location.path('/bq12');
                $location.replace();
              }
              else {
                alert("Please fill properly the first section of questions");
              }
            }
            else {
              alert("Process failed - The sum of one (or more) of the field's precentage is above 100");
            }
          }
        }
      }
    }

  }]);
