angular.module('citiesApp')
    .service('skob', ['$rootScope', '$location', function ($rootScope, $location) {

        self = this;
        self.E;

        self.theExp = function () {
            if (E.widget == undefined) {
                E.widget = new SokobanWidget(E.board_sokoban);
            }
            E.widget.run();
        }

        self.reset = function () {
            E.widget.reset();
            if ($rootScope.inQuiz) {
                $rootScope.reset++;
            }
            else if ($rootScope.inQuiz2) {
                $rootScope.reset2++;
            }
            else if ($rootScope.inQuiz3) {
                $rootScope.reset3++;
            }
            else if ($rootScope.inBQ12) {
                $rootScope.reset12++;
            }
            else if ($rootScope.inBQ23) {
                $rootScope.reset23++;
            }
            //   $rootScope.$apply();
        }
        self.undo = function () {
            E.widget.undo();
        }

        self.pause = function () {
            E.widget.pause();
        }

        function SokobanWidget(init) {
            var canvasContainerDiv = init.canvasContainerDiv;
            var winPath = init.winPath;
            var losePath = init.losePath;
            var dontmove = false;
            var undo;
            var prevX = 0;
            var prevY = 0;
            var prevLev = [];
            var sokoban;
            sokoban = {
                CELL_SIZE: 30,
                _isLevelChanged: true, // re-parse level only id needed, not for each animation frame
                isInitialized: false,
                curLevel: 0,
                loadLevels: function () {

                    sokoban.levels =
                        [
                            [
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "D", "D", "D", "D", "D", "D", "D", "D", "D", "G"],
                                ["G", "D", "*", "B1", "-", "-", "-", "B3", "*", "D", "G"],
                                ["G", "D", "@", "-", "-", "-", "-", "-", "-", "D", "G"],
                                ["G", "D", "-", "B2", "*", "-", "-", "-", "-", "D", "G"],
                                ["G", "D", "-", "-", "-", "-", "-", "-", "-", "D", "G"],
                                ["G", "D", "-", "-", "D", "D", "D", "-", "-", "D", "G"],
                                ["G", "D", "-", "-", "-", "-", "-", "-", "-", "D", "G"],
                                ["G", "D", "-", "-", "-", "-", "-", "-", "-", "D", "G"],
                                ["G", "D", "-", "_", "-", "-", "-", "-", "-", "D", "G"],
                                ["G", "D", "D", "D", "D", "D", "D", "D", "D", "D", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"]
                            ],
                            [
                                ["G", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "D", "D", "D", "D", "D", "D", "G"],
                                ["G", "D", "@", "-", "-", "-", "D", "G"],
                                ["G", "D", "-", "B1", "B2", "-", "D", "G"],
                                ["G", "D", "-", "B3", "-", "-", "D", "G"],
                                ["G", "D", "-", "-", "-", "-", "D", "G"],
                                ["G", "D", "D", "D", "D", "*", "D", "G"],
                                ["G", "G", "G", "G", "D", "*", "D", "G"],
                                ["G", "G", "G", "G", "D", "*", "D", "G"],
                                ["G", "G", "G", "G", "D", "D", "D", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "G"]
                            ],
                            [
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "D", "D", "D", "D", "D", "D", "D", "D", "D", "G"],
                                ["G", "D", "-", "-", "-", "-", "*", "*", "*", "D", "G"],
                                ["G", "D", "-", "D", "-", "D", "*", "D", "*", "D", "G"],
                                ["G", "D", "-", "D", "-", "-", "*", "*", "*", "D", "G"],
                                ["G", "D", "-", "B2", "B1", "B1", "-", "D", "-", "D", "G"],
                                ["G", "D", "-", "B1", "@", "B1", "-", "-", "-", "D", "G"],
                                ["G", "D", "-", "B2", "B2", "B2", "D", "D", "-", "D", "G"],
                                ["G", "D", "-", "-", "-", "-", "-", "-", "-", "D", "G"],
                                ["G", "D", "D", "D", "D", "D", "D", "D", "D", "D", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"]
                            ],


                            [
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "G", "G", "D", "D", "D", "D", "D", "D", "D", "G"],
                                ["G", "G", "G", "D", "-", "-", "-", "-", "-", "D", "G"],
                                ["G", "G", "G", "D", "-", "-", "-", "-", "-", "D", "G"],
                                ["G", "D", "D", "D", "-", "-", "-", "B", "-", "D", "G"],
                                ["G", "D", "-", "*", "-", "-", "-", "B", "-", "D", "G"],
                                ["G", "D", "-", "-", "-", "D", "D", "-", "-", "D", "G"],
                                ["G", "D", "-", "-", "-", "D", "D", "-", "-", "D", "G"],
                                ["G", "D", "-", "B", "-", "-", "*", "-", "-", "D", "G"],
                                ["G", "D", "-", "-", "-", "-", "-", "-", "-", "D", "G"],
                                ["G", "D", "-", "@", "-", "-", "-", "-", "-", "D", "G"],
                                ["G", "D", "-", "-", "-", "-", "-", "-", "*", "D", "G"],
                                ["G", "D", "-", "-", "-", "-", "-", "D", "D", "D", "G"],
                                ["G", "D", "-", "-", "-", "-", "-", "D", "G", "G", "G"],
                                ["G", "D", "-", "-", "D", "D", "D", "D", "G", "G", "G"],
                                ["G", "D", "D", "D", "D", "G", "G", "G", "G", "G", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"]
                            ],

                            [
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "D", "D", "D", "D", "D", "D", "D", "D", "D", "G"],
                                ["G", "D", "-", "-", "-", "-", "*", "*", "*", "D", "G"],
                                ["G", "D", "-", "D", "-", "D", "*", "D", "*", "D", "G"],
                                ["G", "D", "-", "D", "-", "-", "*", "*", "*", "D", "G"],
                                ["G", "D", "-", "B", "B", "B", "-", "D", "-", "D", "G"],
                                ["G", "D", "-", "B", "@", "B", "*", "-", "-", "D", "G"],
                                ["G", "D", "-", "B", "B", "B", "D", "D", "-", "D", "G"],
                                ["G", "D", "-", "-", "-", "-", "-", "-", "-", "D", "G"],
                                ["G", "D", "D", "D", "D", "D", "D", "D", "D", "D", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"]
                            ],

                            [
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "G", "G", "D", "D", "D", "D", "D", "D", "D", "G"],
                                ["G", "G", "G", "D", "-", "-", "-", "-", "-", "D", "G"],
                                ["G", "D", "D", "D", "-", "-", "-", "-", "-", "D", "G"],
                                ["G", "D", "-", "-", "-", "-", "-", "-", "-", "D", "G"],
                                ["G", "D", "-", "-", "-", "-", "-", "-", "-", "D", "G"],
                                ["G", "D", "-", "-", "D", "D", "D", "-", "-", "D", "G"],
                                ["G", "D", "-", "B", "-", "-", "*", "-", "-", "D", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                            ],
                            [
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "G", "G", "G", "D", "D", "D", "D", "D", "D", "G"],
                                ["G", "D", "D", "D", "D", "D", "*", "-", "@", "D", "G"],
                                ["G", "D", "-", "-", "D", "D", "D", "-", "-", "D", "G"],
                                ["G", "D", "-", "-", "B1", "-", "*", "-", "D", "D", "G"],
                                ["G", "D", "-", "B2", "D", "B3", "D", "-", "D", "G", "G"],
                                ["G", "D", "D", "-", "-", "-", "D", "-", "D", "G", "G"],
                                ["G", "G", "D", "-", "-", "-", "*", "-", "D", "G", "G"],
                                ["G", "G", "D", "D", "D", "D", "D", "D", "D", "G", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                            ],
                            [
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "D", "D", "D", "D", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "D", "-", "-", "D", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "D", "-", "B1", "D", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "D", "-", "-", "D", "D", "D", "D", "D", "G", "G", "G"],
                                ["G", "D", "-", "B3", "B5", "-", "-", "D", "D", "G", "G", "G"],
                                ["G", "D", "-", "-", "D", "-", "B6", "D", "D", "G", "G", "G"],
                                ["G", "D", "-", "-", "D", "-", "-", "D", "D", "D", "D", "G"],
                                ["G", "D", "-", "B7", "B4", "-", "B2", "B8", "@", "-", "D", "G"],
                                ["G", "D", "*", "*", "*", "*", "*", "*", "*", "*", "D", "G"],
                                ["G", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                            ],
                            [
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "G"],
                                ["G", "D", "*", "*", "*", "*", "*", "*", "*", "*", "D", "G"],
                                ["G", "D", "-", "@", "B8", "B3", "-", "B2", "B7", "-", "D", "G"],
                                ["G", "D", "D", "D", "D", "-", "-", "D", "-", "-", "D", "G"],
                                ["G", "G", "G", "G", "D", "B4", "-", "D", "-", "-", "D", "G"],
                                ["G", "G", "G", "G", "D", "-", "-", "B6", "B5", "-", "D", "G"],
                                ["G", "G", "G", "G", "D", "D", "D", "D", "-", "-", "D", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "D", "B1", "-", "D", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "D", "-", "-", "D", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "D", "D", "D", "D", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                            ],
                            /*
                            [
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "G"],
                                ["G", "D", "*", "*", "*", "*", "*", "*", "*", "*", "D", "G"],
                                ["G", "D", "-", "@", "B", "B", "-", "B", "B", "-", "D", "G"],
                                ["G", "D", "D", "D", "D", "-", "-", "D", "-", "-", "D", "G"],
                                ["G", "G", "G", "G", "D", "B", "-", "D", "-", "-", "D", "G"],
                                ["G", "G", "G", "G", "D", "-", "-", "B", "B", "-", "D", "G"],
                                ["G", "G", "G", "G", "D", "D", "D", "D", "-", "-", "D", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "D", "B", "-", "D", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "D", "-", "-", "D", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "D", "D", "D", "D", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                            ],*/
                            [
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "D", "D", "D", "D", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "D", "-", "*", "D", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "D", "@", "*", "D", "G"],
                                ["G", "G", "G", "G", "D", "D", "D", "D", "B4", "*", "D", "G"],
                                ["G", "G", "G", "G", "D", "-", "B7", "-", "B2", "*", "D", "G"],
                                ["G", "G", "G", "G", "D", "-", "-", "-", "-", "*", "D", "G"],
                                ["G", "D", "D", "D", "D", "B8", "D", "D", "B5", "*", "D", "G"],
                                ["G", "D", "-", "B6", "-", "B3", "-", "-", "B1", "*", "D", "G"],
                                ["G", "D", "-", "-", "-", "-", "-", "-", "-", "*", "D", "G"],
                                ["G", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                            ],
                            [
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "D", "D", "D", "D", "D", "D", "D", "D", "D", "G"],
                                ["G", "D", "-", "*", "*", "*", "-", "*", "*", "D", "G"],
                                ["G", "D", "-", "D", "D", "-", "-", "-", "-", "D", "G"],
                                ["G", "D", "-", "D", "-", "-", "-", "D", "-", "D", "G"],
                                ["G", "D", "-", "B1", "B2", "B3", "B4", "B5", "-", "D", "G"],
                                ["G", "D", "-", "B8", "@", "-", "-", "B6", "*", "D", "G"],
                                ["G", "D", "-", "B8", "B8", "B8", "B8", "B7", "*", "D", "G"],
                                ["G", "D", "-", "*", "*", "*", "*", "*", "D", "D", "G"],
                                ["G", "D", "D", "D", "D", "D", "D", "D", "D", "D", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                            ],
                            [
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "G", "G", "D", "D", "D", "D", "D", "D", "D", "G", "G"],
                                ["G", "G", "D", "D", "-", "*", "-", "-", "-", "D", "G", "G"],
                                ["G", "G", "D", "D", "-", "D", "-", "-", "-", "D", "D", "G"],
                                ["G", "G", "G", "D", "-", "D", "B3", "D", "B2", "-", "D", "G"],
                                ["G", "D", "D", "D", "-", "*", "-", "B1", "-", "-", "D", "G"],
                                ["G", "D", "-", "-", "-", "D", "D", "D", "-", "-", "D", "G"],
                                ["G", "D", "-", "@", "-", "*", "D", "D", "D", "D", "D", "G"],
                                ["G", "D", "-", "-", "D", "D", "D", "G", "G", "G", "G", "G"],
                                ["G", "D", "D", "D", "D", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                            ],
                            [
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "G", "G", "G", "D", "D", "D", "D", "D", "D", "G"],
                                ["G", "D", "D", "D", "D", "D", "*", "B5", "*", "D", "G"],
                                ["G", "D", "-", "-", "-", "D", "-", "D", "D", "D", "G"],
                                ["G", "D", "$4", "D", "@", "B2", "-", "D", "D", "D", "G"],
                                ["G", "D", "*", "*", "D", "-", "B1", "-", "-", "D", "G"],
                                ["G", "D", "-", "-", "-", "-", "B3", "*", "-", "D", "G"],
                                ["G", "D", "-", "-", "-", "-", "-", "B6", "-", "D", "G"],
                                ["G", "D", "-", "-", "-", "-", "-", "D", "D", "D", "G"],
                                ["G", "D", "D", "D", "D", "D", "D", "D", "G", "G", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                            ],
                            [
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "G", "D", "D", "D", "D", "D", "D", "D", "D", "G", "G", "G"],
                                ["G", "G", "D", "-", "-", "-", "*", "$1", "-", "D", "D", "G", "G"],
                                ["G", "D", "D", "-", "-", "-", "*", "D", "-", "D", "D", "D", "G"],
                                ["G", "D", "D", "-", "-", "-", "D", "@", "-", "D", "D", "D", "G"],
                                ["G", "G", "D", "-", "-", "-", "-", "B4", "D", "D", "D", "G", "G"],
                                ["G", "D", "D", "-", "-", "B3", "B2", "-", "-", "*", "D", "G", "G"],
                                ["G", "D", "D", "D", "B6", "*", "-", "D", "D", "B5", "D", "D", "G"],
                                ["G", "G", "D", "D", "-", "-", "-", "D", "D", "*", "D", "D", "G"],
                                ["G", "G", "G", "D", "D", "D", "D", "D", "D", "D", "D", "G", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                            ],
                            [
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "D", "D", "D", "G", "G", "G", "G"],
                                ["G", "G", "G", "G", "G", "G", "D", "D", "G", "G", "G", "G", "G", "G"],
                                ["G", "G", "G", "G", "G", "D", "G", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "G", "D", "D", "D", "D", "D", "D", "D", "D", "G", "G", "G", "G"],
                                ["G", "D", "D", "*", "D", "D", "-", "-", "-", "D", "G", "G", "G", "G"],
                                ["G", "D", "D", "B6", "D", "D", "-", "*", "B1", "D", "D", "G", "G", "G"],
                                ["G", "D", "D", "*", "-", "-", "B4", "B2", "-", "-", "D", "D", "D", "G"],
                                ["G", "G", "D", "D", "D", "B5", "-", "-", "-", "-", "D", "D", "G", "G"],
                                ["G", "G", "G", "D", "-", "@", "D", "-", "-", "-", "D", "G", "G", "G"],
                                ["G", "G", "G", "D", "-", "D", "*", "-", "-", "-", "D", "G", "G", "G"],
                                ["G", "G", "G", "D", "-", "$3", "*", "-", "-", "-", "D", "G", "G", "G"],
                                ["G", "G", "G", "D", "D", "D", "D", "D", "D", "D", "D", "G", "G", "G"],
                                ["G", "G", "G", "G", "G", "D", "G", "G", "D", "G", "G", "G", "G", "G"],
                                ["G", "G", "G", "G", "G", "D", "D", "G", "D", "D", "G", "G", "G", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                            ],
                            [
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "D", "D", "D", "D", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "D", "-", "-", "D", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "D", "-", "B1", "D", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "D", "-", "-", "D", "D", "D", "D", "D", "G", "G", "G"],
                                ["G", "D", "-", "B3", "B5", "-", "-", "D", "D", "G", "G", "G"],
                                ["G", "D", "-", "-", "D", "-", "B6", "D", "D", "G", "G", "G"],
                                ["G", "D", "-", "-", "D", "-", "-", "D", "D", "D", "D", "G"],
                                ["G", "D", "-", "B7", "B4", "-", "B2", "B8", "@", "-", "D", "G"],
                                ["G", "D", "*", "*", "*", "*", "*", "*", "*", "*", "D", "G"],
                                ["G", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                            ],
                            [
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "D", "D", "D", "D", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "D", "-", "*", "D", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "D", "@", "*", "D", "G"],
                                ["G", "G", "G", "G", "D", "D", "D", "D", "B4", "*", "D", "G"],
                                ["G", "G", "G", "G", "D", "-", "B7", "-", "B2", "*", "D", "G"],
                                ["G", "G", "G", "G", "D", "-", "-", "-", "-", "*", "D", "G"],
                                ["G", "D", "D", "D", "D", "B8", "D", "D", "B5", "*", "D", "G"],
                                ["G", "D", "-", "B6", "-", "B3", "-", "-", "B1", "*", "D", "G"],
                                ["G", "D", "-", "-", "-", "-", "-", "-", "-", "*", "D", "G"],
                                ["G", "D", "D", "D", "D", "D", "D", "D", "D", "D", "D", "G"],
                                ["G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G", "G"],
                            ],
                        ];

                    sokoban.originalSpots =
                        [
                            [
                                ["4", "4"],
                                ["2", "2"],
                                ["2", "8"],
                            ],
                            [
                                ["6", "5"],
                                ["7", "5"],
                                ["8", "5"],
                            ],
                            [
                                ["2", "6"],
                                ["2", "7"],
                                ["2", "8"],
                                ["3", "6"],
                                ["3", "8"],
                                ["4", "6"],
                                ["4", "7"],
                                ["4", "8"],
                            ],
                            [
                                ["4", "4"],
                                ["2", "2"],
                                ["2", "8"],
                            ],
                            [
                                ["6", "5"],
                                ["7", "5"],
                                ["8", "5"],
                            ],
                            [
                                ["2", "6"],
                                ["2", "7"],
                                ["2", "8"],
                                ["3", "6"],
                                ["3", "8"],
                                ["4", "6"],
                                ["4", "7"],
                                ["4", "8"],
                            ],
                            [
                                ["2", "6"],
                                ["4", "6"],
                                ["7", "6"],
                            ],
                            [
                                ["9", "2"],
                                ["9", "3"],
                                ["9", "4"],
                                ["9", "5"],
                                ["9", "6"],
                                ["9", "7"],
                                ["9", "8"],
                                ["9", "9"],

                            ],
                            [
                                ["2", "2"],
                                ["2", "3"],
                                ["2", "4"],
                                ["2", "5"],
                                ["2", "6"],
                                ["2", "7"],
                                ["2", "8"],
                                ["2", "9"],

                            ],
                            [
                                ["2", "9"],
                                ["3", "9"],
                                ["4", "9"],
                                ["5", "9"],
                                ["6", "9"],
                                ["7", "9"],
                                ["8", "9"],
                                ["9", "9"],

                            ],
                            [
                                ["2", "3"],
                                ["2", "4"],
                                ["2", "5"],
                                ["2", "7"],
                                ["2", "8"],
                                ["8", "3"],
                                ["8", "4"],
                                ["8", "5"],
                                ["8", "6"],
                                ["8", "7"],
                                ["6", "8"],
                                ["7", "8"],
                            ],
                            [
                                ["2", "5"],
                                ["5", "5"],
                                ["7", "5"],
                            ],
                            [
                                ["5", "2"],
                                ["5", "3"],
                                ["4", "2"],
                                ["2", "6"],
                                ["2", "8"],
                                ["6", "7"],
                            ],
                            [
                                ["6", "9"],
                                ["2", "7"],
                                ["2", "6"],
                                ["3", "6"],
                                ["7", "5"],
                                ["8", "9"],
                            ],
                            [
                                ["5", "3"],
                                ["11", "5"],
                                ["11", "6"],
                                ["10", "6"],
                                ["7", "3"],
                                ["6", "7"],
                            ],
                            ///////
                            [
                                ["9", "2"],
                                ["9", "3"],
                                ["9", "4"],
                                ["9", "5"],
                                ["9", "6"],
                                ["9", "7"],
                                ["9", "8"],
                                ["9", "9"],

                            ], [
                                ["2", "9"],
                                ["3", "9"],
                                ["4", "9"],
                                ["5", "9"],
                                ["6", "9"],
                                ["7", "9"],
                                ["8", "9"],
                                ["9", "9"],

                            ],
                            ////////
                        ];
                },


                loadLevel: function (level) {
                    sokoban.level = sokoban.levels[level];
                    sokoban.xLength = sokoban.level.length;
                    sokoban.yLength = sokoban.level[0].length;

                    if (sokoban.isInitialized) {
                        sokoban.setCanvasSize();
                        sokoban._isLevelChanged = true;
                        sokoban.renderView();
                    }
                },

                getPlayerPosition: function () {
                    for (var i = 0; i < sokoban.xLength; i++) {
                        for (var j = 0; j < sokoban.yLength; j++) {
                            if (sokoban.level[i][j] === "@") {
                                var position = {};
                                position.x = j;
                                position.y = i;
                                return position;
                            }
                        }
                    }
                },

                setPlayerPosition: function (position) {
                    prevX = sokoban.getPlayerPosition().x;
                    prevY = sokoban.getPlayerPosition().y;
                    // delete old player position from map array
                    var numberOfBoxes = 0;
                    for (var i = 0; i < sokoban.xLength; i++) {
                        for (var j = 0; j < sokoban.yLength; j++) {
                            if (sokoban.level[i][j].includes("B")) {
                                numberOfBoxes++;
                            }
                            if (sokoban.level[i][j] === "@") {
                                sokoban.level[i][j] = "-";
                            }
                        }
                    }


                    if (numberOfBoxes < 1) {
                        window.removeEventListener('keydown', sokoban.keyDown, false);
                        if ($rootScope.inQuiz) {
                            $rootScope.stopQuiz = true;
                        }
                        else if ($rootScope.inQuiz2) {
                            $rootScope.stopQuiz2 = true;
                        }
                        else if ($rootScope.inQuiz3) {
                            $rootScope.stopQuiz3 = true;
                        }
                        else if ($rootScope.inBQ12) {
                            $rootScope.stopBQ12 = true;
                        }
                        else if ($rootScope.inBQ23) {
                            $rootScope.stopBQ23 = true;
                        }
                    }
                    sokoban.level[position.y][position.x] = "@";
                    sokoban.isOnSpot = false;
                    sokoban.isPushFromSpot = false;
                    sokoban.resetSpots();
                    // and re-render the view
                    sokoban.renderView();

                },

                resetSpots: function () {
                    var i = 0;
                    for (i = 0; i < sokoban.originalSpots[sokoban.curLevel].length; i++) {
                        var tmp = sokoban.originalSpots[sokoban.curLevel][i];
                        if (sokoban.level[tmp[0]][tmp[1]] == "-")
                            sokoban.level[tmp[0]][tmp[1]] = "*";
                    }
                },

                goUp: function () {
                    sokoban._isLevelChanged = true;
                    var curPosition = sokoban.getPlayerPosition();
                    var isPushed = false;

                    // check for upper map border
                    if (curPosition.y > 0) {
                        // check for obsticles
                        if (sokoban.level[curPosition.y - 1][curPosition.x] !== "-" &&
                            sokoban.level[curPosition.y - 1][curPosition.x] !== "*" &&
                            !(sokoban.level[curPosition.y - 1][curPosition.x].includes("$"))

                        ) {
                            // box and empty space ahead
                            if (sokoban.level[curPosition.y - 1][curPosition.x].includes("B") &&
                                curPosition.y - 1 > 0 &&
                                sokoban.level[curPosition.y - 2][curPosition.x] === "*" &&
                                !isPushed
                            ) {
                                this.checkTheFirst(sokoban.level[curPosition.y - 1][curPosition.x]);
                                var boxNumber = sokoban.level[curPosition.y - 1][curPosition.x];
                                sokoban.level[curPosition.y - 1][curPosition.x] = "-";
                                sokoban.level[curPosition.y - 2][curPosition.x] = "$" + boxNumber.substring(1);
                                curPosition.y--;
                                sokoban.setPlayerPosition(curPosition);
                                sokoban.addToMoves("up");
                            }
                            else if (sokoban.level[curPosition.y - 1][curPosition.x].includes("B") &&
                                curPosition.y - 1 > 0 &&
                                sokoban.level[curPosition.y - 2][curPosition.x] === "-"

                            ) {
                                this.checkTheFirst(sokoban.level[curPosition.y - 1][curPosition.x]);
                                var boxNumber = sokoban.level[curPosition.y - 1][curPosition.x];
                                sokoban.level[curPosition.y - 1][curPosition.x] = "-";
                                sokoban.level[curPosition.y - 2][curPosition.x] = boxNumber;
                                curPosition.y--;
                                sokoban.setPlayerPosition(curPosition);
                                isPushed = true;
                                sokoban.addToMoves("up");
                            }
                        }
                        else if (sokoban.level[curPosition.y - 1][curPosition.x].includes("B") &&
                            curPosition.y - 1 > 0 &&
                            sokoban.level[curPosition.y - 2][curPosition.x].includes("$")
                        ) {
                            this.checkTheFirst(sokoban.level[curPosition.y - 1][curPosition.x]);
                        }
                        else { // no obsticles on top
                            // move player to spot
                            if (sokoban.level[curPosition.y - 1][curPosition.x] === "*") {
                                sokoban.isOnSpot = true;
                            }
                            else if (sokoban.level[curPosition.y - 1][curPosition.x].includes("$")
                                && sokoban.level[curPosition.y - 2][curPosition.x] !== "D"
                            ) {
                                this.checkTheFirst(sokoban.level[curPosition.y - 1][curPosition.x]);
                                if (sokoban.level[curPosition.y - 2][curPosition.x] === "*") {
                                    sokoban.level[curPosition.y - 2][curPosition.x] = sokoban.level[curPosition.y - 1][curPosition.x];
                                    sokoban.isPushFromSpot = true;
                                }
                                else if (sokoban.level[curPosition.y - 2][curPosition.x] === "-") {
                                    var boxNumber = sokoban.level[curPosition.y - 1][curPosition.x];
                                    sokoban.level[curPosition.y - 2][curPosition.x] = "B" + boxNumber.substring(1);
                                    sokoban.isPushFromSpot = true;
                                }
                                else if (sokoban.level[curPosition.y - 2][curPosition.x].includes("$") || sokoban.level[curPosition.y - 2][curPosition.x].includes("B")) {
                                    dontmove = true;
                                }
                            }

                            // dont pushbox from spot into wall
                            else if (sokoban.level[curPosition.y - 1][curPosition.x].includes("$")
                                && sokoban.level[curPosition.y - 2][curPosition.x] === "D"
                            ) {
                                this.checkTheFirst(sokoban.level[curPosition.y - 1][curPosition.x]);
                                curPosition.y++;
                                dontmove = true;
                            }
                            if (!dontmove) {
                                curPosition.y--;
                                sokoban.setPlayerPosition(curPosition);
                                sokoban.addToMoves("up");
                            }
                            dontmove = false;
                        }

                    }
                    sokoban._isLevelChanged = true;
                    sokoban.renderView();
                },

                goDown: function () {
                    var curPosition = sokoban.getPlayerPosition();
                    var isPushed = false;

                    if (curPosition.y < sokoban.xLength - 1) {
                        // check for obsticles
                        if (
                            sokoban.level[curPosition.y + 1][curPosition.x] !== "-" &&
                            sokoban.level[curPosition.y + 1][curPosition.x] !== "*" &&
                            !(sokoban.level[curPosition.y + 1][curPosition.x].includes("$"))

                        ) {
                            // box
                            if (sokoban.level[curPosition.y + 1][curPosition.x].includes("B") &&
                                curPosition.y + 1 < sokoban.xLength - 1 &&
                                sokoban.level[curPosition.y + 2][curPosition.x] === "-"

                            ) {
                                this.checkTheFirst(sokoban.level[curPosition.y + 1][curPosition.x]);
                                var boxNumber = sokoban.level[curPosition.y + 1][curPosition.x];
                                sokoban.level[curPosition.y + 1][curPosition.x] = "-";
                                sokoban.level[curPosition.y + 2][curPosition.x] = boxNumber;
                                curPosition.y++;
                                sokoban.setPlayerPosition(curPosition);
                                isPushed = true;
                                sokoban.addToMoves("down");
                            }

                            // push box to spot
                            if (sokoban.level[curPosition.y + 1][curPosition.x].includes("B") &&
                                curPosition.y + 1 < sokoban.xLength - 1 &&
                                sokoban.level[curPosition.y + 2][curPosition.x] === "*" &&
                                !isPushed
                            ) {
                                this.checkTheFirst(sokoban.level[curPosition.y + 1][curPosition.x]);
                                var boxNumber = sokoban.level[curPosition.y + 1][curPosition.x];
                                sokoban.level[curPosition.y + 1][curPosition.x] = "-";
                                sokoban.level[curPosition.y + 2][curPosition.x] = "$" + boxNumber.substring(1);
                                curPosition.y++;
                                sokoban.setPlayerPosition(curPosition);
                                sokoban.renderView();
                                sokoban.addToMoves("down");
                            }
                        }
                        else { // no obsticles on top
                            // move player to spot
                            if (sokoban.level[curPosition.y + 1][curPosition.x] === "*") {
                                sokoban.isOnSpot = true;
                            }
                            if (sokoban.level[curPosition.y + 1][curPosition.x].includes("$")
                                && sokoban.level[curPosition.y + 2][curPosition.x] !== "D"
                            ) {
                                this.checkTheFirst(sokoban.level[curPosition.y + 1][curPosition.x]);
                                // push from spot to next spot
                                if (sokoban.level[curPosition.y + 2][curPosition.x] === "*") {
                                    sokoban.level[curPosition.y + 2][curPosition.x] = sokoban.level[curPosition.y + 1][curPosition.x];
                                }

                                // push from spot to empty cell
                                else if (sokoban.level[curPosition.y + 2][curPosition.x] === "-") {
                                    var boxNumber = sokoban.level[curPosition.y + 1][curPosition.x];
                                    sokoban.level[curPosition.y + 2][curPosition.x] = "B" + boxNumber.substring(1);
                                }
                                else if (sokoban.level[curPosition.y + 2][curPosition.x].includes("$") || sokoban.level[curPosition.y + 2][curPosition.x].includes("B")) {
                                    dontmove = true;
                                }
                                sokoban.isPushFromSpot = true;
                            }

                            // dont pushbox from spot into wall
                            if (sokoban.level[curPosition.y + 1][curPosition.x].includes("$")
                                && sokoban.level[curPosition.y + 2][curPosition.x] === "D"
                            ) {
                                this.checkTheFirst(sokoban.level[curPosition.y + 1][curPosition.x]);
                                dontmove = true;
                                curPosition.y--;
                            }
                            if (!dontmove) {
                                curPosition.y++;
                                sokoban.setPlayerPosition(curPosition);
                                sokoban.addToMoves("down");
                            }
                            dontmove = false;
                        }
                    }
                    sokoban._isLevelChanged = true;
                    sokoban.renderView();
                },

                goRight: function () {
                    var curPosition = sokoban.getPlayerPosition();
                    var isPushed = false;
                    // check for map right border
                    if (curPosition.x < sokoban.yLength - 1) {
                        // check for obsticles
                        if (sokoban.level[curPosition.y][curPosition.x + 1] !== "-" &&
                            sokoban.level[curPosition.y][curPosition.x + 1] !== "*" &&
                            !(sokoban.level[curPosition.y][curPosition.x + 1].includes("$"))
                        ) {
                            // box
                            if (sokoban.level[curPosition.y][curPosition.x + 1].includes("B") &&
                                curPosition.x + 1 > 0 &&
                                sokoban.level[curPosition.y][curPosition.x + 2] === "-"
                            ) {
                                this.checkTheFirst(sokoban.level[curPosition.y][curPosition.x + 1]);
                                var boxNumber = sokoban.level[curPosition.y][curPosition.x + 1];
                                sokoban.level[curPosition.y][curPosition.x + 1] = "-";
                                sokoban.level[curPosition.y][curPosition.x + 2] = boxNumber;
                                curPosition.x++;
                                sokoban.setPlayerPosition(curPosition);
                                isPushed = true;
                                sokoban.addToMoves("right");
                            }

                            // push box to spot
                            else if (sokoban.level[curPosition.y][curPosition.x + 1].includes("B") &&
                                curPosition.x + 1 > 0 &&
                                sokoban.level[curPosition.y][curPosition.x + 2] === "*" &&
                                !isPushed
                            ) {
                                this.checkTheFirst(sokoban.level[curPosition.y][curPosition.x + 1]);
                                var boxNumber = sokoban.level[curPosition.y][curPosition.x + 1];
                                sokoban.level[curPosition.y][curPosition.x + 1] = "-";
                                sokoban.level[curPosition.y][curPosition.x + 2] = "$" + boxNumber.substring(1);
                                curPosition.x++;
                                sokoban.setPlayerPosition(curPosition);
                                sokoban.addToMoves("right");
                            }

                        } else { // no obsticles at right
                            // move player to spot
                            if (sokoban.level[curPosition.y][curPosition.x + 1] === "*") {
                                sokoban.isOnSpot = true;
                            }
                            else if (sokoban.level[curPosition.y][curPosition.x + 1].includes("$") &&
                                sokoban.level[curPosition.y][curPosition.x + 2] !== "D"
                            ) {
                                this.checkTheFirst(sokoban.level[curPosition.y][curPosition.x + 1]);
                                if (sokoban.level[curPosition.y][curPosition.x + 2] === "*") {
                                    sokoban.level[curPosition.y][curPosition.x + 2] = sokoban.level[curPosition.y][curPosition.x + 1];
                                    sokoban.isPushFromSpot = true;
                                }
                                else if (sokoban.level[curPosition.y][curPosition.x + 2] === "-") {
                                    var boxNumber = sokoban.level[curPosition.y][curPosition.x + 1];
                                    sokoban.level[curPosition.y][curPosition.x + 2] = "B" + boxNumber.substring(1);
                                    sokoban.isPushFromSpot = true;
                                }
                                else if (sokoban.level[curPosition.y][curPosition.x + 2].includes("$") || sokoban.level[curPosition.y][curPosition.x + 2].includes("B")) {
                                    dontmove = true;

                                }
                            }

                            // dont pushbox from spot into wall
                            else if (sokoban.level[curPosition.y][curPosition.x + 1].includes("$") &&
                                sokoban.level[curPosition.y][curPosition.x + 2] === "D"
                            ) {
                                this.checkTheFirst(sokoban.level[curPosition.y][curPosition.x + 1]);
                                dontmove = true;
                                curPosition.x--;
                            }
                            if (!dontmove) {
                                curPosition.x++;
                                sokoban.setPlayerPosition(curPosition);
                                sokoban.addToMoves("right");
                            }
                            dontmove = false;
                        }

                    }
                    // canvas redraw needed
                    sokoban._isLevelChanged = true;
                    sokoban.renderView();
                },

                goLeft: function () {
                    var curPosition = sokoban.getPlayerPosition();
                    var isPushed = false;
                    if (curPosition.x > 0) {
                        // check for obsticles
                        if (sokoban.level[curPosition.y][curPosition.x - 1] !== "-" &&
                            sokoban.level[curPosition.y][curPosition.x - 1] !== "*" &&
                            !(sokoban.level[curPosition.y][curPosition.x - 1].includes("$"))
                        ) {
                            // push box to empty space
                            if (sokoban.level[curPosition.y][curPosition.x - 1].includes("B") &&
                                curPosition.x - 1 > 0 &&
                                sokoban.level[curPosition.y][curPosition.x - 2] === "-" &&
                                sokoban.level[curPosition.y][curPosition.x - 2] !== "*"
                            ) {
                                this.checkTheFirst(sokoban.level[curPosition.y][curPosition.x - 1]);
                                var boxNumber = sokoban.level[curPosition.y][curPosition.x - 1];
                                sokoban.level[curPosition.y][curPosition.x - 1] = "-";
                                sokoban.level[curPosition.y][curPosition.x - 2] = boxNumber;
                                curPosition.x--;
                                isPushed = true;
                                sokoban.setPlayerPosition(curPosition);
                                sokoban.addToMoves("left");
                            }

                            // push box to spot
                            if (sokoban.level[curPosition.y][curPosition.x - 1].includes("B") &&
                                sokoban.level[curPosition.y][curPosition.x - 2] === "*" &&
                                !isPushed
                            ) {
                                this.checkTheFirst(sokoban.level[curPosition.y][curPosition.x - 1]);
                                var boxNumber = sokoban.level[curPosition.y][curPosition.x - 1];
                                sokoban.level[curPosition.y][curPosition.x - 1] = "-";
                                sokoban.level[curPosition.y][curPosition.x - 2] = "$" + boxNumber.substring(1);
                                curPosition.x--;
                                sokoban.setPlayerPosition(curPosition);
                                sokoban.addToMoves("left");
                            }
                        }

                        else {
                            // move player to spot
                            if (sokoban.level[curPosition.y][curPosition.x - 1] === "*") {
                                sokoban.isOnSpot = true;
                            }
                            else if (sokoban.level[curPosition.y][curPosition.x - 1].includes("$") &&
                                sokoban.level[curPosition.y][curPosition.x - 2] !== "D"
                            ) {
                                this.checkTheFirst(sokoban.level[curPosition.y][curPosition.x - 1]);
                                if (sokoban.level[curPosition.y][curPosition.x - 2] === "*") {
                                    var boxNumber = sokoban.level[curPosition.y][curPosition.x - 1];
                                    sokoban.level[curPosition.y][curPosition.x - 2] = boxNumber;
                                    sokoban.isPushFromSpot = true;
                                }
                                else if (sokoban.level[curPosition.y][curPosition.x - 2] === "-") {
                                    var boxNumber = sokoban.level[curPosition.y][curPosition.x - 1];
                                    sokoban.level[curPosition.y][curPosition.x - 2] = "B" + boxNumber.substring(1);
                                    sokoban.isPushFromSpot = true;
                                }
                                else if (sokoban.level[curPosition.y][curPosition.x - 2].includes("$") || sokoban.level[curPosition.y][curPosition.x - 2].includes("B")) {
                                    dontmove = true;
                                }
                            }

                            // dont pushbox from spot into wall
                            else if (sokoban.level[curPosition.y][curPosition.x - 1].includes("$") &&
                                sokoban.level[curPosition.y][curPosition.x - 2] === "D"
                            ) {
                                this.checkTheFirst(sokoban.level[curPosition.y][curPosition.x - 1]);
                                var hayyy = sokoban.level[curPosition.y - 1][curPosition.x].includes("$");
                                dontmove = true;
                                curPosition.x++;
                            }
                            if (!dontmove) {
                                prevX = sokoban.getPlayerPosition().x;
                                prevY = sokoban.getPlayerPosition().y;
                                curPosition.x--;
                                sokoban.setPlayerPosition(curPosition, true);
                                sokoban.addToMoves("left");
                            }
                            dontmove = false;
                        }
                    }
                    // canvas redraw needed
                    sokoban._isLevelChanged = true;
                    sokoban.renderView();
                },

                renderView: function () {
                    var htmlView = "";
                    // render html view
                    for (var i = 0; i < sokoban.xLength; i++) {
                        for (var j = 0; j < sokoban.yLength; j++) {
                            htmlView += sokoban.level[i][j] + " ";
                            if (j === sokoban.level[i].length - 1) {
                                htmlView += "<br>";
                            }
                        }
                    }
                    $('code').html(htmlView);

                    // render canvas view
                    var curPosition = sokoban.getPlayerPosition();
                    sokoban.player.x = curPosition.x * sokoban.CELL_SIZE;
                    sokoban.player.y = curPosition.y * sokoban.CELL_SIZE;

                    if (sokoban._isLevelChanged) {
                        sokoban.updateCanvasView();
                    }
                },

                updateCanvasView: function () {
                    sokoban._isLevelChanged = false;

                    // clean scene's objects
                    sokoban.scene.nodes = [];

                    // create bg blocks
                    var bg_blocks = [];
                    sokoban.boxes = [];
                    sokoban.blocks = [];
                    sokoban.grass = [];
                    sokoban.spots = [];
                    sokoban.bspots = [];

                    sokoban.scene.add(sokoban.player);

                    for (var i = 0; i < sokoban.xLength; i++) {
                        for (var j = 0; j < sokoban.yLength; j++) {
                            var cur_x = j * sokoban.CELL_SIZE;
                            var cur_y = i * sokoban.CELL_SIZE;
                            let tmp;
                            if ($rootScope.inQuiz)
                                tmp = 'gfx/floor.png';
                            else
                                tmp = 'gfx/floor.png';

                            var cur_block = new plant.Sprite({
                                src: tmp,
                                x: cur_x,
                                y: cur_y
                            });

                            bg_blocks.push(cur_block);
                            sokoban.scene.add(bg_blocks[bg_blocks.length - 1]);

                            // box
                            let boxFigure;

                            if (sokoban.level[i][j] === "B1") {
                                if ($rootScope.inQuiz || $rootScope.inBQ23)
                                    boxFigure = 'gfx/purpBox1.png';
                                else
                                    boxFigure = 'gfx/orangeBox1.png';
                                var box = new plant.Sprite({
                                    src: boxFigure,
                                    zindex: 10,
                                    x: cur_x,
                                    y: cur_y,
                                    width: sokoban.CELL_SIZE,
                                    height: sokoban.CELL_SIZE
                                });

                                box.xCell = j;
                                box.yCell = i;

                                sokoban.boxes.push(box);
                                sokoban.scene.add(sokoban.boxes[sokoban.boxes.length - 1]);
                            }

                            else if (sokoban.level[i][j] === "B2") {
                                if ($rootScope.inQuiz || $rootScope.inBQ23)
                                    boxFigure = 'gfx/purpBox2.png';
                                else
                                    boxFigure = 'gfx/orangeBox2.png';
                                var box = new plant.Sprite({
                                    src: boxFigure,
                                    zindex: 10,
                                    x: cur_x,
                                    y: cur_y,
                                    width: sokoban.CELL_SIZE,
                                    height: sokoban.CELL_SIZE
                                });

                                box.xCell = j;
                                box.yCell = i;

                                sokoban.boxes.push(box);
                                sokoban.scene.add(sokoban.boxes[sokoban.boxes.length - 1]);
                            }

                            else if (sokoban.level[i][j] === "B3") {
                                if ($rootScope.inQuiz || $rootScope.inBQ23)
                                    boxFigure = 'gfx/purpBox3.png';
                                else
                                    boxFigure = 'gfx/orangeBox3.png';
                                var box = new plant.Sprite({
                                    src: boxFigure,
                                    zindex: 10,
                                    x: cur_x,
                                    y: cur_y,
                                    width: sokoban.CELL_SIZE,
                                    height: sokoban.CELL_SIZE
                                });

                                box.xCell = j;
                                box.yCell = i;

                                sokoban.boxes.push(box);
                                sokoban.scene.add(sokoban.boxes[sokoban.boxes.length - 1]);
                            }

                            else if (sokoban.level[i][j] === "B4") {
                                if ($rootScope.inQuiz || $rootScope.inBQ23)
                                    boxFigure = 'gfx/purpBox4.png';
                                else
                                    boxFigure = 'gfx/orangeBox4.png';
                                var box = new plant.Sprite({
                                    src: boxFigure,
                                    zindex: 10,
                                    x: cur_x,
                                    y: cur_y,
                                    width: sokoban.CELL_SIZE,
                                    height: sokoban.CELL_SIZE
                                });

                                box.xCell = j;
                                box.yCell = i;

                                sokoban.boxes.push(box);
                                sokoban.scene.add(sokoban.boxes[sokoban.boxes.length - 1]);
                            }

                            else if (sokoban.level[i][j] === "B5") {
                                if ($rootScope.inQuiz || $rootScope.inBQ23)
                                    boxFigure = 'gfx/purpBox5.png';
                                else
                                    boxFigure = 'gfx/orangeBox5.png';
                                var box = new plant.Sprite({
                                    src: boxFigure,
                                    zindex: 10,
                                    x: cur_x,
                                    y: cur_y,
                                    width: sokoban.CELL_SIZE,
                                    height: sokoban.CELL_SIZE
                                });

                                box.xCell = j;
                                box.yCell = i;

                                sokoban.boxes.push(box);
                                sokoban.scene.add(sokoban.boxes[sokoban.boxes.length - 1]);
                            }

                            else if (sokoban.level[i][j] === "B6") {
                                if ($rootScope.inQuiz || $rootScope.inBQ23)
                                    boxFigure = 'gfx/purpBox6.png';
                                else
                                    boxFigure = 'gfx/orangeBox6.png';
                                var box = new plant.Sprite({
                                    src: boxFigure,
                                    zindex: 10,
                                    x: cur_x,
                                    y: cur_y,
                                    width: sokoban.CELL_SIZE,
                                    height: sokoban.CELL_SIZE
                                });

                                box.xCell = j;
                                box.yCell = i;

                                sokoban.boxes.push(box);
                                sokoban.scene.add(sokoban.boxes[sokoban.boxes.length - 1]);
                            }
                            else if (sokoban.level[i][j] === "B7") {
                                if ($rootScope.inQuiz || $rootScope.inBQ23)
                                    boxFigure = 'gfx/purpBox7.png';
                                else
                                    boxFigure = 'gfx/orangeBox7.png';
                                var box = new plant.Sprite({
                                    src: boxFigure,
                                    zindex: 10,
                                    x: cur_x,
                                    y: cur_y,
                                    width: sokoban.CELL_SIZE,
                                    height: sokoban.CELL_SIZE
                                });

                                box.xCell = j;
                                box.yCell = i;

                                sokoban.boxes.push(box);
                                sokoban.scene.add(sokoban.boxes[sokoban.boxes.length - 1]);
                            }
                            else if (sokoban.level[i][j] === "B8") {
                                if ($rootScope.inQuiz || $rootScope.inBQ23)
                                    boxFigure = 'gfx/purpBox8.png';
                                else
                                    boxFigure = 'gfx/orangeBox8.png';
                                var box = new plant.Sprite({
                                    src: boxFigure,
                                    zindex: 10,
                                    x: cur_x,
                                    y: cur_y,
                                    width: sokoban.CELL_SIZE,
                                    height: sokoban.CELL_SIZE
                                });

                                box.xCell = j;
                                box.yCell = i;

                                sokoban.boxes.push(box);
                                sokoban.scene.add(sokoban.boxes[sokoban.boxes.length - 1]);
                            }
                            // grass
                            let grassFigure;
                            if ($rootScope.inQuiz || $rootScope.inQuiz2)
                                grassFigure = 'gfx/grass2.png';
                            else
                                grassFigure = 'gfx/grass.png';
                            if (sokoban.level[i][j] === "G") {
                                var grass = new plant.Sprite({
                                    src: grassFigure,
                                    zindex: 10,
                                    x: cur_x,
                                    y: cur_y
                                });

                                grass.xCell = j;
                                grass.yCell = i;

                                sokoban.grass.push(grass);
                                sokoban.scene.add(sokoban.grass[sokoban.grass.length - 1]);
                            }
                            // block
                            let blockFigure;
                            if ($rootScope.inQuiz || $rootScope.inBQ23)
                                blockFigure = 'gfx/block2.png';
                            else
                                blockFigure = 'gfx/block.png';
                            if (sokoban.level[i][j] === "D") {
                                var block = new plant.Sprite({
                                    src: blockFigure,
                                    zindex: 10,
                                    x: cur_x,
                                    y: cur_y
                                });

                                block.xCell = j;
                                block.yCell = i;

                                sokoban.blocks.push(block);
                                sokoban.scene.add(sokoban.blocks[sokoban.blocks.length - 1]);
                            }

                            // spot
                            let spotFigure;
                            if ($rootScope.inQuiz || $rootScope.inQuiz2 || $rootScope.inQuiz3)
                                spotFigure = 'gfx/spot2.png';
                            else
                                spotFigure = 'gfx/spot.png';
                            if (sokoban.level[i][j] === "*") {
                                var spot = new plant.Sprite({
                                    src: spotFigure,
                                    x: cur_x,
                                    y: cur_y,
                                    width: sokoban.CELL_SIZE,
                                    height: sokoban.CELL_SIZE
                                });
                                sokoban.spots.push(spot);
                                sokoban.scene.add(sokoban.spots[sokoban.spots.length - 1]);
                            }

                            // box on spot
                            let bspotFigure;

                            if (sokoban.level[i][j] === "$1") {
                                if ($rootScope.inQuiz || $rootScope.inBQ23)
                                    bspotFigure = 'gfx/b_purp_spot1.png';
                                else
                                    bspotFigure = 'gfx/b_orange_spot1.png';
                                var bspot = new plant.Sprite({
                                    src: bspotFigure,
                                    x: cur_x,
                                    y: cur_y,
                                    zindex: 100,
                                    width: sokoban.CELL_SIZE,
                                    height: sokoban.CELL_SIZE
                                });
                                sokoban.bspots.push(bspot);
                                sokoban.scene.add(sokoban.bspots[sokoban.bspots.length - 1]);
                            }
                            else if (sokoban.level[i][j] === "$2") {
                                if ($rootScope.inQuiz || $rootScope.inBQ23)
                                    bspotFigure = 'gfx/b_purp_spot2.png';
                                else
                                    bspotFigure = 'gfx/b_orange_spot2.png';
                                var bspot = new plant.Sprite({
                                    src: bspotFigure,
                                    x: cur_x,
                                    y: cur_y,
                                    zindex: 100,
                                    width: sokoban.CELL_SIZE,
                                    height: sokoban.CELL_SIZE
                                });
                                sokoban.bspots.push(bspot);
                                sokoban.scene.add(sokoban.bspots[sokoban.bspots.length - 1]);
                            }

                            else if (sokoban.level[i][j] === "$3") {
                                if ($rootScope.inQuiz || $rootScope.inBQ23)
                                    bspotFigure = 'gfx/b_purp_spot3.png';
                                else
                                    bspotFigure = 'gfx/b_orange_spot3.png';
                                var bspot = new plant.Sprite({
                                    src: bspotFigure,
                                    x: cur_x,
                                    y: cur_y,
                                    zindex: 100,
                                    width: sokoban.CELL_SIZE,
                                    height: sokoban.CELL_SIZE
                                });
                                sokoban.bspots.push(bspot);
                                sokoban.scene.add(sokoban.bspots[sokoban.bspots.length - 1]);
                            }
                            else if (sokoban.level[i][j] === "$4") {
                                if ($rootScope.inQuiz || $rootScope.inBQ23)
                                    bspotFigure = 'gfx/b_purp_spot4.png';
                                else
                                    bspotFigure = 'gfx/b_orange_spot4.png';
                                var bspot = new plant.Sprite({
                                    src: bspotFigure,
                                    x: cur_x,
                                    y: cur_y,
                                    zindex: 100,
                                    width: sokoban.CELL_SIZE,
                                    height: sokoban.CELL_SIZE
                                });
                                sokoban.bspots.push(bspot);
                                sokoban.scene.add(sokoban.bspots[sokoban.bspots.length - 1]);
                            }
                            else if (sokoban.level[i][j] === "$5") {
                                if ($rootScope.inQuiz || $rootScope.inBQ23)
                                    bspotFigure = 'gfx/b_purp_spot5.png';
                                else
                                    bspotFigure = 'gfx/b_orange_spot5.png';
                                var bspot = new plant.Sprite({
                                    src: bspotFigure,
                                    x: cur_x,
                                    y: cur_y,
                                    zindex: 100,
                                    width: sokoban.CELL_SIZE,
                                    height: sokoban.CELL_SIZE
                                });
                                sokoban.bspots.push(bspot);
                                sokoban.scene.add(sokoban.bspots[sokoban.bspots.length - 1]);
                            }
                            else if (sokoban.level[i][j] === "$6") {
                                if ($rootScope.inQuiz || $rootScope.inBQ23)
                                    bspotFigure = 'gfx/b_purp_spot6.png';
                                else
                                    bspotFigure = 'gfx/b_orange_spot6.png';
                                var bspot = new plant.Sprite({
                                    src: bspotFigure,
                                    x: cur_x,
                                    y: cur_y,
                                    zindex: 100,
                                    width: sokoban.CELL_SIZE,
                                    height: sokoban.CELL_SIZE
                                });
                                sokoban.bspots.push(bspot);
                                sokoban.scene.add(sokoban.bspots[sokoban.bspots.length - 1]);
                            }
                            else if (sokoban.level[i][j] === "$7") {
                                if ($rootScope.inQuiz || $rootScope.inBQ23)
                                    bspotFigure = 'gfx/b_purp_spot7.png';
                                else
                                    bspotFigure = 'gfx/b_orange_spot7.png';
                                var bspot = new plant.Sprite({
                                    src: bspotFigure,
                                    x: cur_x,
                                    y: cur_y,
                                    zindex: 100,
                                    width: sokoban.CELL_SIZE,
                                    height: sokoban.CELL_SIZE
                                });
                                sokoban.bspots.push(bspot);
                                sokoban.scene.add(sokoban.bspots[sokoban.bspots.length - 1]);
                            }

                            else if (sokoban.level[i][j] === "$8") {
                                if ($rootScope.inQuiz || $rootScope.inBQ23)
                                    bspotFigure = 'gfx/b_purp_spot8.png';
                                else
                                    bspotFigure = 'gfx/b_orange_spot8.png';
                                var bspot = new plant.Sprite({
                                    src: bspotFigure,
                                    x: cur_x,
                                    y: cur_y,
                                    zindex: 100,
                                    width: sokoban.CELL_SIZE,
                                    height: sokoban.CELL_SIZE
                                });
                                sokoban.bspots.push(bspot);
                                sokoban.scene.add(sokoban.bspots[sokoban.bspots.length - 1]);
                            }
                        }
                    }
                    /*
                                        if (($rootScope.inFin == true && $rootScope.change == false)) {
                                            angular.element(document.getElementById('experiment2')).scope().hay();
                                        }
                                        else if (($rootScope.inQuiz == true && $rootScope.change == true)) {
                                            angular.element(document.getElementById('experiment1')).scope().hat();
                                        }
                                        else if (($rootScope.inLearn == true && $rootScope.changeLearn == false)) {
                                            angular.element(document.getElementById('experiment3')).scope().hatt();
                                        }*/
                },

                setCanvasSize: function () {
                    var sceneWidth = sokoban.CELL_SIZE * sokoban.yLength - 1;
                    var sceneHeight = sokoban.CELL_SIZE * sokoban.xLength - 1;
                    sokoban.scene.htmlNode.width = sceneWidth;
                    sokoban.scene.htmlNode.height = sceneHeight;
                },

                checkTheFirst: function (boxName) {
                    if ($rootScope.inQuiz) {
                        if ($rootScope.firstBox == "Nan") {
                            $rootScope.firstBox = boxName;
                        }
                    }
                    else if ($rootScope.inQuiz2) {
                        if ($rootScope.firstBox2 == "Nan") {
                            $rootScope.firstBox2 = boxName;
                        }
                    } else if ($rootScope.inQuiz3) {
                        if ($rootScope.firstBox3 == "Nan") {
                            $rootScope.firstBox3 = boxName;
                        }
                    } else if ($rootScope.inBQ12) {
                        if ($rootScope.firstBox12 == "Nan") {
                            $rootScope.firstBox12 = boxName;
                        }
                    } else if ($rootScope.inBQ23) {
                        if ($rootScope.firstBox23 == "Nan") {
                            $rootScope.firstBox23 = boxName;
                        }
                    }
                },

                onLoad: function () {
                    var options = { //fill:
                        canvasContainerDiv: canvasContainerDiv,
                        canvas: 'canvas'
                    };

                    sokoban.scene = new plant.Scene(options);
                    sokoban.setCanvasSize();

                    // calculate player's position on canvas
                    var curPosition = sokoban.getPlayerPosition();
                    sokoban.curPositionCanvX = curPosition.x * sokoban.CELL_SIZE;
                    sokoban.curPositionCanvY = curPosition.y * sokoban.CELL_SIZE;

                    sokoban.player = new plant.Sprite({
                        src: "gfx/player.png",
                        zindex: 101,
                        width: sokoban.CELL_SIZE,
                        height: sokoban.CELL_SIZE,
                        x: sokoban.curPositionCanvX,
                        y: sokoban.curPositionCanvY
                    });

                    sokoban.plantGameLoop = new plant.GameLoop({
                        scene: sokoban.scene,
                        interval: 50
                    });

                    sokoban.plantGameLoop.code = function () {
                        sokoban.scene.update();
                        requestAnimationFrame(sokoban.plantGameLoop.code);
                    };

                    sokoban.plantGameLoop.start(sokoban.scene);
                    sokoban.renderView();
                    sokoban.isInitialized = true;
                },

                areEq: function (curLev, prevLev) {
                    for (let i = 0; i < curLev.length; i++) {
                        for (let j = 0; j < curLev[i].length; j++) {
                            if (curLev[i][j] != prevLev[i][j])
                                return false;
                        }
                    }
                    return true;
                },

                keyDown: function (e) {
                    //    if (prevLev != undefined && prevLev.length > 0) {
                    //        if (sokoban.areEq(sokoban.level, prevLev) == false) {
                    prevLev = JSON.parse(JSON.stringify(sokoban.level));
                    prevLev[sokoban.getPlayerPosition().y][sokoban.getPlayerPosition().x] = "@";
                    //       }
                    //  }

                    var x = e.keyCode;

                    if ($rootScope.foc)
                        e.preventDefault();

                    //log actions
                    if (x === 38) {
                        sokoban.goUp();
                    }
                    if (x === 37) {
                        sokoban.goLeft();
                    }
                    if (x === 39) {
                        sokoban.goRight();
                    }
                    if (x === 40) {
                        sokoban.goDown();
                    }

                    sokoban.renderView();


                },

                addToMoves: function (side) {
                    if ($rootScope.inQuiz) {
                        $rootScope.movesQuiz++;
                        $rootScope.histQ.push(side);
                    }
                    else if ($rootScope.inQuiz2) {
                        $rootScope.movesQuiz2++;
                        $rootScope.histQ2.push(side);
                    }
                    else if ($rootScope.inQuiz3) {
                        $rootScope.movesQuiz3++;
                        $rootScope.histQ3.push(side);
                    }
                    else if ($rootScope.inBQ12) {
                        $rootScope.movesBQ12++;
                        $rootScope.histBQ12.push(side);
                    }
                    else if ($rootScope.inBQ23) {
                        $rootScope.movesBQ23++;
                        $rootScope.histBQ23.push(side);
                    }
                    $rootScope.$apply();
                }

            };

            this.reset = function () {
                if ($rootScope.inQuiz) {
                    $rootScope.histQ.push("reset");
                }
                else if ($rootScope.inQuiz2) {
                    $rootScope.histQ2.push("reset");
                }
                else if ($rootScope.inQuiz3) {
                    $rootScope.histQ3.push("reset");
                }
                else if ($rootScope.inBQ12) {
                    $rootScope.histBQ12.push("reset");
                }
                else if ($rootScope.inBQ23) {
                    $rootScope.histBQ23.push("reset");
                }
                //  $rootScope.$apply();
                window.addEventListener('keydown', sokoban.keyDown, false);
                sokoban.loadLevels();
                sokoban.loadLevel(sokoban.curLevel);
                prevLev = JSON.parse(JSON.stringify(sokoban.level));

            }

            this.pause = function () {
                window.removeEventListener('keydown', sokoban.keyDown, false);
            }


            this.undo = function () {
                if ($rootScope.inQuiz) {
                    $rootScope.histQ.push("undo");
                }
                else if ($rootScope.inQuiz2) {
                    $rootScope.histQ2.push("undo");
                }
                else if ($rootScope.inQuiz3) {
                    $rootScope.histQ3.push("undo");
                }
                else if ($rootScope.inBQ12) {
                    $rootScope.histBQ12.push("undo");
                }
                else if ($rootScope.inBQ23) {
                    $rootScope.histBQ23.push("undo");
                }
                // if (prevLev != undefined && prevLev.length > 0) {
                //     if (sokoban.areEq(sokoban.level, prevLev) == false) {
                sokoban.level = prevLev;
                sokoban.renderView();
                sokoban.updateCanvasView();
                //    }
                // }
            }



            this.run = function () {
                sokoban.isInitialized = false;
                if ($rootScope.inLearn)
                    sokoban.curLevel = 1;
                else if ($rootScope.inQuiz)
                    sokoban.curLevel = 12;
                else if ($rootScope.inQuiz2)
                    sokoban.curLevel = 14;
                else if ($rootScope.inQuiz3)
                    sokoban.curLevel = 13;
                    else if ($rootScope.inBQ12)
                    sokoban.curLevel = 16;
                else if ($rootScope.inBQ23)
                    sokoban.curLevel = 15;
                    /*
                else if ($rootScope.inBQ12)
                    sokoban.curLevel = 11;
                else if ($rootScope.inBQ23)
                    sokoban.curLevel = 6;
*/
                sokoban._isLevelChanged = true;
                sokoban.loadLevels();
                sokoban.loadLevel(sokoban.curLevel);
                prevLev = JSON.parse(JSON.stringify(sokoban.level));
                sokoban.onLoad();
                window.addEventListener('keydown', sokoban.keyDown, false);
            }

            window.addEventListener('keydown', sokoban.keyDown, false);


        }

    }])