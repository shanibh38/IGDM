var mysql = require('mysql');

var con = mysql.createConnection({
  host: "quizagdm.coxqxrjsrdck.us-east-1.rds.amazonaws.com",
  port: "3306",
  user: "admin",
  password: "admingdma",
  database: "gdma"
});

function createA() {

  con.connect(function (err) {
    if (err) {
      console.log("Error Connecting to GDMA DB - " + err.message + "\n");
    }
    else {
      console.log("Connecting to GDMA DB\n");
    }
    con.query("CREATE TABLE IF NOT EXISTS UsersA (userName varchar(10) PRIMARY KEY, workerID varchar(50), age integer, gender varchar(7),education varchar(50), bonus varchar(5))", function (err, result) {
      if (err) {
        console.log("Error create Quiz1A - " + err.message + "\n");
      }
      else {
        console.log("Table UsersA created\n");
      }
    });
    con.query(`CREATE TABLE IF NOT EXISTS Quiz1A (userName varchar(10) PRIMARY KEY,minMoves integer, firstBox varchar(10), secBox varchar(10),hardme integer,hardthem integer,
      firstMovesRate DOUBLE, secondMovesRate DOUBLE, thirdMovesRate DOUBLE,forthMovesRate DOUBLE,fifthMovesRate DOUBLE,
      firstBox1Rate DOUBLE, firstBox2Rate DOUBLE, firstBox3Rate DOUBLE, firstBox4Rate DOUBLE,firstBox5Rate DOUBLE,firstBox6Rate DOUBLE,
      secondBox1Rate DOUBLE, secondBox2Rate DOUBLE, secondBox3Rate DOUBLE, secondBox4Rate DOUBLE,secondBox5Rate DOUBLE,secondBox6Rate DOUBLE,
      resetNum integer,firstBoxToMove varchar(10),endTime varchar(10),totalMoves integer,histMoves MEDIUMTEXT)`,
      function (err, result) {
        if (err) {
          console.log("Error create Quiz1A - " + err.message + "\n");
        }
        else {
          console.log("Table Quiz1A created\n");
        }
      });
    con.query(`CREATE TABLE IF NOT EXISTS Quiz2A (userName varchar(10) PRIMARY KEY,minMoves integer, firstBox varchar(10), secBox varchar(10),
      firstMovesRate DOUBLE, secondMovesRate DOUBLE, thirdMovesRate DOUBLE,forthMovesRate DOUBLE,fifthMovesRate DOUBLE,
      firstBox1Rate DOUBLE, firstBox2Rate DOUBLE, firstBox3Rate DOUBLE, firstBox4Rate DOUBLE,firstBox5Rate DOUBLE,firstBox6Rate DOUBLE,
      secondBox1Rate DOUBLE, secondBox2Rate DOUBLE, secondBox3Rate DOUBLE, secondBox4Rate DOUBLE,secondBox5Rate DOUBLE,secondBox6Rate DOUBLE,
      resetNum integer,firstBoxToMove varchar(10),endTime varchar(10),totalMoves integer,histMoves MEDIUMTEXT)`,
      function (err, result) {
        if (err) {
          console.log("Error create Quiz2A - " + err.message + "\n");
        }
        else {
          console.log("Table Quiz2A created\n");
        }
      });
    con.query(`CREATE TABLE IF NOT EXISTS Quiz3A (userName varchar(10) PRIMARY KEY,minMoves integer, firstBox varchar(10), secBox varchar(10),
      firstMovesRate DOUBLE, secondMovesRate DOUBLE, thirdMovesRate DOUBLE,forthMovesRate DOUBLE,fifthMovesRate DOUBLE,
      firstBox1Rate DOUBLE, firstBox2Rate DOUBLE, firstBox3Rate DOUBLE, firstBox4Rate DOUBLE,firstBox5Rate DOUBLE,firstBox6Rate DOUBLE,
      secondBox1Rate DOUBLE, secondBox2Rate DOUBLE, secondBox3Rate DOUBLE, secondBox4Rate DOUBLE,secondBox5Rate DOUBLE,secondBox6Rate DOUBLE,
      resetNum integer,firstBoxToMove varchar(10),endTime varchar(10),totalMoves integer,histMoves MEDIUMTEXT)`,
      function (err, result) {
        if (err) {
          console.log("Error create Quiz3A - " + err.message + "\n");
        }
        else {
          console.log("Table Quiz3A created\n");
        }
      });
    con.query(`CREATE TABLE IF NOT EXISTS BQ12A (userName varchar(50) PRIMARY KEY,minMoves integer, firstBox varchar(10), secBox varchar(10),
      resetNum integer,firstBoxToMove varchar(10),endTime varchar(10),totalMoves integer,histMoves MEDIUMTEXT)`,
      function (err, result) {
        if (err) {
          console.log("Error create BQ12A - " + err.message + "\n");
        }
        else {
          console.log("Table BQ12A created\n");
        }
      });
    con.query(`CREATE TABLE IF NOT EXISTS BQ23A (userName varchar(50) PRIMARY KEY,minMoves integer, firstBox varchar(10), secBox varchar(10),
      resetNum integer,firstBoxToMove varchar(10),endTime varchar(10),totalMoves integer,histMoves MEDIUMTEXT)`,
      function (err, result) {
        if (err) {
          console.log("Error create BQ23A - " + err.message + "\n");
        }
        else {
          console.log("Table BQ23A created\n");
        }
      });
  });

  //con.end();
}


function getUsersA(callback) {
  con.connect(function (err) {
    if (err) {
      console.log("Error Connecting to GDMA DB - " + err.message + "\n");
    }
    else {
      console.log("Connecting to GDMA DB\n");
    }
    let sql = `SELECT userName From UsersA`;
    con.query(sql, function (err, result) {
      if (err) {
        console.log("Error return users from 'getUsersA' function - " + err.message + "\n");
      }
      else {
        console.log("Successed return users from 'getUsersA' function\n");
        callback(null, result);
      }
    });
  });
  //con.end();
}

function insertUsersA(userName, workerID, age, gender, education) {

  con.connect(function (err) {
    if (err) {
      console.log("Error Connecting to GDMA DB - " + err.message + "\n");
    }
    else {
      console.log("Connecting to GDMA DB\n");
    }
    let sql = `INSERT INTO UsersA (userName ,workerID ,age , gender ,education)
    VALUES  (?,?,?,?,?)`;
    con.query(sql, [userName, workerID, age, gender, education], function (err, result) {
      if (err) {
        console.log("Error insertion user from 'insertUsersA' function - " + err.message + "\n");
      }
      else {
        console.log("Successed insertion user from 'insertUsersA' function\n");
      }
    });
  });

}


function insertQuiz1A(userName, minMoves, firstBox, secBox, hardme, hardthem, firstMovesRate, secondMovesRate, thirdMovesRate,
  forthMovesRate, fifthMovesRate, firstBox1Rate, firstBox2Rate, firstBox3Rate, firstBox4Rate,
  firstBox5Rate, firstBox6Rate, secondBox1Rate, secondBox2Rate,
  secondBox3Rate, secondBox4Rate, secondBox5Rate, secondBox6Rate,
  resetNum, firstBoxToMove, endTime, totalMoves, histMoves) {
    con.connect(function (err) {
      if (err) {
        console.log("Error Connecting to GDMA DB - " + err.message + "\n");
      }
      else {
        console.log("Connecting to GDMA DB\n");
      }
      let sql = `INSERT INTO Quiz1A (userName, minMoves, firstBox, secBox, hardme, hardthem, firstMovesRate, secondMovesRate, thirdMovesRate,
        forthMovesRate, fifthMovesRate, firstBox1Rate, firstBox2Rate, firstBox3Rate, firstBox4Rate,
        firstBox5Rate, firstBox6Rate, secondBox1Rate, secondBox2Rate,
        secondBox3Rate, secondBox4Rate, secondBox5Rate, secondBox6Rate,
        resetNum, firstBoxToMove, endTime, totalMoves, histMoves)
                VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
      con.query(sql, [userName, minMoves, firstBox, secBox, hardme, hardthem, firstMovesRate, secondMovesRate, thirdMovesRate,
        forthMovesRate, fifthMovesRate, firstBox1Rate, firstBox2Rate, firstBox3Rate, firstBox4Rate,
        firstBox5Rate, firstBox6Rate, secondBox1Rate, secondBox2Rate,
        secondBox3Rate, secondBox4Rate, secondBox5Rate, secondBox6Rate,
        resetNum, firstBoxToMove, endTime, totalMoves, histMoves], function (err, result) {
        if (err) {
          console.log("Error insertion Quiz1A details from 'insertQuiz1A' function - " + err.message + "\n");
        }
        else {
          console.log("Successed insertion Quiz1A details from 'insertQuiz1A' function\n");
        }
      });
    });
  }

  function insertQuiz2A(userName, minMoves, firstBox, secBox, firstMovesRate, secondMovesRate, thirdMovesRate,
    forthMovesRate, fifthMovesRate, firstBox1Rate, firstBox2Rate, firstBox3Rate, firstBox4Rate,
    firstBox5Rate, firstBox6Rate, secondBox1Rate, secondBox2Rate,
    secondBox3Rate, secondBox4Rate, secondBox5Rate, secondBox6Rate,
    resetNum, firstBoxToMove, endTime, totalMoves, histMoves) {
      con.connect(function (err) {
        if (err) {
          console.log("Error Connecting to GDMA DB - " + err.message + "\n");
        }
        else {
          console.log("Connecting to GDMA DB\n");
        }
        let sql = `INSERT INTO Quiz2A (userName, minMoves, firstBox, secBox, firstMovesRate, secondMovesRate, thirdMovesRate,
          forthMovesRate, fifthMovesRate, firstBox1Rate, firstBox2Rate, firstBox3Rate, firstBox4Rate,
          firstBox5Rate, firstBox6Rate, secondBox1Rate, secondBox2Rate,
          secondBox3Rate, secondBox4Rate, secondBox5Rate, secondBox6Rate,
          resetNum, firstBoxToMove, endTime, totalMoves, histMoves)
                  VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        con.query(sql, [userName, minMoves, firstBox, secBox, firstMovesRate, secondMovesRate, thirdMovesRate,
          forthMovesRate, fifthMovesRate, firstBox1Rate, firstBox2Rate, firstBox3Rate, firstBox4Rate,
          firstBox5Rate, firstBox6Rate, secondBox1Rate, secondBox2Rate,
          secondBox3Rate, secondBox4Rate, secondBox5Rate, secondBox6Rate,
          resetNum, firstBoxToMove, endTime, totalMoves, histMoves], function (err, result) {
          if (err) {
            console.log("Error insertion Quiz2A details from 'insertQuiz2A' function - " + err.message + "\n");
          }
          else {
            console.log("Successed insertion Quiz2A details from 'insertQuiz2A' function\n");
          }
        });
      });
    }
    function insertQuiz3A(userName, minMoves, firstBox, secBox, firstMovesRate, secondMovesRate, thirdMovesRate,
      forthMovesRate, fifthMovesRate, firstBox1Rate, firstBox2Rate, firstBox3Rate, firstBox4Rate,
      firstBox5Rate, firstBox6Rate, secondBox1Rate, secondBox2Rate,
      secondBox3Rate, secondBox4Rate, secondBox5Rate, secondBox6Rate,
      resetNum, firstBoxToMove, endTime, totalMoves, histMoves) {
        con.connect(function (err) {
          if (err) {
            console.log("Error Connecting to GDMA DB - " + err.message + "\n");
          }
          else {
            console.log("Connecting to GDMA DB\n");
          }
          let sql = `INSERT INTO Quiz3A (userName, minMoves, firstBox, secBox, firstMovesRate, secondMovesRate, thirdMovesRate,
            forthMovesRate, fifthMovesRate, firstBox1Rate, firstBox2Rate, firstBox3Rate, firstBox4Rate,
            firstBox5Rate, firstBox6Rate, secondBox1Rate, secondBox2Rate,
            secondBox3Rate, secondBox4Rate, secondBox5Rate, secondBox6Rate,
            resetNum, firstBoxToMove, endTime, totalMoves, histMoves)
                    VALUES  (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
          con.query(sql, [userName, minMoves, firstBox, secBox, firstMovesRate, secondMovesRate, thirdMovesRate,
            forthMovesRate, fifthMovesRate, firstBox1Rate, firstBox2Rate, firstBox3Rate, firstBox4Rate,
            firstBox5Rate, firstBox6Rate, secondBox1Rate, secondBox2Rate,
            secondBox3Rate, secondBox4Rate, secondBox5Rate, secondBox6Rate,
            resetNum, firstBoxToMove, endTime, totalMoves, histMoves], function (err, result) {
            if (err) {
              console.log("Error insertion Quiz3A details from 'insertQuiz3A' function - " + err.message + "\n");
            }
            else {
              console.log("Successed insertion Quiz3A details from 'insertQuiz3A' function\n");
            }
          });
        });
      }

      function insertBQ12A(userName, minMoves, firstBox, secBox, resetNum, firstBoxToMove, endTime, totalMoves, histMoves) {

        con.connect(function (err) {
          if (err) {
            console.log("Error Connecting to GDMA DB - " + err.message + "\n");
          }
          else {
            console.log("Connecting to GDMA DB\n");
          }
          let sql = `INSERT INTO BQ12A (userName, minMoves, firstBox, secBox, resetNum, firstBoxToMove, endTime, totalMoves, histMoves)
          VALUES  (?,?,?,?,?,?,?,?,?)`;
          con.query(sql, [userName, minMoves, firstBox, secBox, resetNum, firstBoxToMove, endTime, totalMoves, histMoves], function (err, result) {
            if (err) {
              console.log("Error insertion BQ12A details from 'insertBQ12A' function - " + err.message + "\n");
            }
            else {
              console.log("Successed insertion BQ12A details from 'insertBQ12A' function\n");
            }
          });
        });
      
      }
      
      function insertBQ23A(userName, minMoves, firstBox, secBox, resetNum, firstBoxToMove, endTime, totalMoves, histMoves) {

        con.connect(function (err) {
          if (err) {
            console.log("Error Connecting to GDMA DB - " + err.message + "\n");
          }
          else {
            console.log("Connecting to GDMA DB\n");
          }
          let sql = `INSERT INTO BQ23A (userName, minMoves, firstBox, secBox, resetNum, firstBoxToMove, endTime, totalMoves, histMoves)
          VALUES  (?,?,?,?,?,?,?,?,?)`;
          con.query(sql, [userName, minMoves, firstBox, secBox, resetNum, firstBoxToMove, endTime, totalMoves, histMoves], function (err, result) {
            if (err) {
              console.log("Error insertion BQ23A details from 'insertBQ23A' function - " + err.message + "\n");
            }
            else {
              console.log("Successed insertion BQ23A details from 'insertBQ23A' function\n");
            }
          });
        });
      
      }

      
      function updateBonusA(bonus, userName){

        con.connect(function (err) {
          if (err) {
            console.log("Error Connecting to GDMA DB - " + err.message + "\n");
          }
          else {
            console.log("Connecting to GDMA DB\n");
          }
          let sql = `UPDATE UsersA SET bonus = ? WHERE userName = ?`;
          con.query(sql,[bonus, userName], function (err, result) {
            if (err) {
              console.log("Error update Users bonus from 'updateBonusA' function - " + err.message + "\n");
            }
            else {
              console.log("Successed update Users bonus from 'updateBonusA' function\n");
            }
          });
        });
        con.end();
      
      }

module.exports = { createA, getUsersA,insertUsersA,insertQuiz1A,insertQuiz2A,insertQuiz3A,insertBQ12A,insertBQ23A ,updateBonusA};
