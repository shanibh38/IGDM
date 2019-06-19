angular.module('citiesApp')
    .controller('LearnController', ['$location', '$rootScope', '$scope', 'skob', '$http', function ($location, $rootScope, $scope, skob, $http) {
        var serverUrl = 'https://calm-everglades-32154.herokuapp.com/';
        self = this;
        $rootScope.foc = false;
        $rootScope.inLearn = true;
        $rootScope.inQuiz = false;
        $rootScope.inQuiz2 = false;
        $rootScope.inQuiz3 = false;
        $rootScope.inBQ12 = false;
        $rootScope.inBQ23 = false;

        skob.theExp();

        self.submit_learn = function () {
            if (document.getElementById("under_quiz_1").value != "Lose" ||
                document.getElementById("under_quiz_2").value != "Win" ||
                document.getElementById("under_quiz_3").value != "Lose" ||
                document.getElementById("under_quiz_4").value != "Lose") {
                alert("One of your answers are wrong..");
            }
            else {
                $location.path('/quiz');
                $location.replace();
            }
        }

        self.reset = function () {
            skob.reset();
        }

        self.undo = function () {
            skob.undo();
        }

        self.focus1 = function () {
            $rootScope.foc = false;
        }

        self.focus2 = function () {
            $rootScope.foc = true;
        }

    }]);