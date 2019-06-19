let app = angular.module('citiesApp', ["ngRoute"]);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider)  {


    $locationProvider.hashPrefix('');

    $routeProvider.when('/', {
        templateUrl: './components/Consent/consent.html',
        controller : 'consentCtrl as consentCtrl'
    })
        .when('/demog', {
            templateUrl: './components/Demog/demog.html',
            controller : 'demogController as dmgCtrl'
        })
        .when('/final', {
            templateUrl: './components/Final/final.html',
            controller : 'finalController as fnlCtrl'
        })
        .when('/consent', {
            templateUrl: './components/consent/consent.html',
            controller : 'consentCtrl as consentCtrl'
        })
        .when('/instructions', {
            templateUrl: './components/Instructions/instructions.html',
            controller : 'instController as instCtrl'
        })
        .when('/learn_game', {
            templateUrl: './components/LearnGame/LearnGame.html',
            controller : 'LearnController as lrnCtrl'
        })
        .when('/quiz', {
            templateUrl: './components/Quiz1/quiz.html',
            controller : 'quizController as quizCtrl'
        })
        .when('/quiz2', {
            templateUrl: './components/Quiz2/quiz2.html',
            controller : 'quizController2 as quizCtrl2'
        })
        .when('/quiz3', {
            templateUrl: './components/Quiz3/quiz3.html',
            controller : 'quizController3 as quizCtrl3'
        })
        .when('/bq12', {
            templateUrl: './components/BetweenQuiz12/BetweenQuiz12.html',
            controller : 'BetweenQuiz12Ctrl as BQ12'
        })
        .when('/bq23', {
            templateUrl: './components/BetweenQuiz23/BetweenQuiz23.html',
            controller : 'BetweenQuiz23Ctrl as BQ23'
        })
        .otherwise({ redirectTo: '/consent' });

        
}])
;