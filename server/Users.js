var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var DBManger = require("../DBmysql");
const fs = require('fs');


DBManger.createA();
//get users A
router.get('/getAllUsersA', function (req, res) {
    DBManger.getUsersA((err, rows) => {
        res.send(rows);
    });
});
//register A
router.post('/addDemogA', function (req, res) {
    var userName = req.body.userName;
    var workerID = req.body.workerID;
    var age = req.body.age;
    var gender = req.body.gender;
    var education = req.body.education;

    DBManger.insertUsersA(userName, workerID, age, gender, education);
    res.sendStatus(200);
});

//updateBonus A
router.post('/updateBonusA', function (req, res) {
    var bonus = req.body.bonus;
    var userName = req.body.userName;
    DBManger.updateBonusA(bonus, userName);
    res.sendStatus(200);
});


//add to Quiz1A
router.post('/addQuiz1A', function (req, res) {
    var userName = req.body.userName;
    var minMoves = req.body.minMoves;
    var firstBox = req.body.firstBox;
    var secBox = req.body.secBox;
    var hardme = req.body.hardme;
    var hardthem = req.body.hardthem;
    var firstMovesRate = req.body.firstMovesRate;
    var secondMovesRate = req.body.secondMovesRate;
    var thirdMovesRate = req.body.thirdMovesRate;
    var forthMovesRate = req.body.forthMovesRate;
    var fifthMovesRate = req.body.fifthMovesRate;
    var firstBox1Rate = req.body.firstBox1Rate;
    var firstBox2Rate = req.body.firstBox2Rate;
    var firstBox3Rate = req.body.firstBox3Rate;
    var firstBox4Rate = req.body.firstBox4Rate;
    var firstBox5Rate = req.body.firstBox5Rate;
    var firstBox6Rate = req.body.firstBox6Rate;
    var secondBox1Rate = req.body.secondBox1Rate;
    var secondBox2Rate = req.body.secondBox2Rate;
    var secondBox3Rate = req.body.secondBox3Rate;
    var secondBox4Rate = req.body.secondBox4Rate;
    var secondBox5Rate = req.body.secondBox5Rate;
    var secondBox6Rate = req.body.secondBox6Rate;
    var resetNum = req.body.resetNum;
    var firstBoxToMove = req.body.firstBoxToMove;
    var endTime = req.body.endTime;
    var totalMoves = req.body.totalMoves;
    var histMoves = req.body.histMoves;

    DBManger.insertQuiz1A(userName, minMoves, firstBox, secBox, hardme, hardthem, firstMovesRate, secondMovesRate, thirdMovesRate,
        forthMovesRate, fifthMovesRate, firstBox1Rate, firstBox2Rate, firstBox3Rate, firstBox4Rate,
        firstBox5Rate, firstBox6Rate, secondBox1Rate, secondBox2Rate,
        secondBox3Rate, secondBox4Rate, secondBox5Rate, secondBox6Rate,
        resetNum, firstBoxToMove, endTime, totalMoves, histMoves);
    res.sendStatus(200);

});

//add to Quiz2A
router.post('/addQuiz2A', function (req, res) {
    var userName = req.body.userName;
    var minMoves = req.body.minMoves;
    var firstBox = req.body.firstBox;
    var secBox = req.body.secBox;
    var firstMovesRate = req.body.firstMovesRate;
    var secondMovesRate = req.body.secondMovesRate;
    var thirdMovesRate = req.body.thirdMovesRate;
    var forthMovesRate = req.body.forthMovesRate;
    var fifthMovesRate = req.body.fifthMovesRate;
    var firstBox1Rate = req.body.firstBox1Rate;
    var firstBox2Rate = req.body.firstBox2Rate;
    var firstBox3Rate = req.body.firstBox3Rate;
    var firstBox4Rate = req.body.firstBox4Rate;
    var firstBox5Rate = req.body.firstBox5Rate;
    var firstBox6Rate = req.body.firstBox6Rate;
    var secondBox1Rate = req.body.secondBox1Rate;
    var secondBox2Rate = req.body.secondBox2Rate;
    var secondBox3Rate = req.body.secondBox3Rate;
    var secondBox4Rate = req.body.secondBox4Rate;
    var secondBox5Rate = req.body.secondBox5Rate;
    var secondBox6Rate = req.body.secondBox6Rate;
    var resetNum = req.body.resetNum;
    var firstBoxToMove = req.body.firstBoxToMove;
    var endTime = req.body.endTime;
    var totalMoves = req.body.totalMoves;
    var histMoves = req.body.histMoves;

    DBManger.insertQuiz2A(userName, minMoves, firstBox, secBox, firstMovesRate, secondMovesRate, thirdMovesRate,
        forthMovesRate, fifthMovesRate, firstBox1Rate, firstBox2Rate, firstBox3Rate, firstBox4Rate,
        firstBox5Rate, firstBox6Rate, secondBox1Rate, secondBox2Rate,
        secondBox3Rate, secondBox4Rate, secondBox5Rate, secondBox6Rate,
        resetNum, firstBoxToMove, endTime, totalMoves, histMoves);
    res.sendStatus(200);
});

//add to Quiz3A
router.post('/addQuiz3A', function (req, res) {
    var userName = req.body.userName;
    var minMoves = req.body.minMoves;
    var firstBox = req.body.firstBox;
    var secBox = req.body.secBox;
    var firstMovesRate = req.body.firstMovesRate;
    var secondMovesRate = req.body.secondMovesRate;
    var thirdMovesRate = req.body.thirdMovesRate;
    var forthMovesRate = req.body.forthMovesRate;
    var fifthMovesRate = req.body.fifthMovesRate;
    var firstBox1Rate = req.body.firstBox1Rate;
    var firstBox2Rate = req.body.firstBox2Rate;
    var firstBox3Rate = req.body.firstBox3Rate;
    var firstBox4Rate = req.body.firstBox4Rate;
    var firstBox5Rate = req.body.firstBox5Rate;
    var firstBox6Rate = req.body.firstBox6Rate;
    var secondBox1Rate = req.body.secondBox1Rate;
    var secondBox2Rate = req.body.secondBox2Rate;
    var secondBox3Rate = req.body.secondBox3Rate;
    var secondBox4Rate = req.body.secondBox4Rate;
    var secondBox5Rate = req.body.secondBox5Rate;
    var secondBox6Rate = req.body.secondBox6Rate;
    var resetNum = req.body.resetNum;
    var firstBoxToMove = req.body.firstBoxToMove;
    var endTime = req.body.endTime;
    var totalMoves = req.body.totalMoves;
    var histMoves = req.body.histMoves;

    DBManger.insertQuiz3A(userName, minMoves, firstBox, secBox, firstMovesRate, secondMovesRate, thirdMovesRate,
        forthMovesRate, fifthMovesRate, firstBox1Rate, firstBox2Rate, firstBox3Rate, firstBox4Rate,
        firstBox5Rate, firstBox6Rate, secondBox1Rate, secondBox2Rate,
        secondBox3Rate, secondBox4Rate, secondBox5Rate, secondBox6Rate,
        resetNum, firstBoxToMove, endTime, totalMoves, histMoves);
    res.sendStatus(200);
});

//add to BQ12A
router.post('/addBQ12A', function (req, res) {
    var userName = req.body.userName;
    var minMoves = req.body.minMoves;
    var firstBox = req.body.firstBox;
    var secBox = req.body.secBox;
    var resetNum = req.body.resetNum;
    var firstBoxToMove = req.body.firstBoxToMove;
    var endTime = req.body.endTime;
    var totalMoves = req.body.totalMoves;
    var histMoves = req.body.histMoves;

    DBManger.insertBQ12A(userName, minMoves, firstBox, secBox, resetNum, firstBoxToMove, endTime, totalMoves, histMoves);
    res.sendStatus(200);
});

//add to BQ23A
router.post('/addBQ23A', function (req, res) {
    var userName = req.body.userName;
    var minMoves = req.body.minMoves;
    var firstBox = req.body.firstBox;
    var secBox = req.body.secBox;
    var resetNum = req.body.resetNum;
    var firstBoxToMove = req.body.firstBoxToMove;
    var endTime = req.body.endTime;
    var totalMoves = req.body.totalMoves;
    var histMoves = req.body.histMoves;

    DBManger.insertBQ23A(userName, minMoves, firstBox, secBox, resetNum, firstBoxToMove, endTime, totalMoves, histMoves);
    res.sendStatus(200);

});

module.exports = router;