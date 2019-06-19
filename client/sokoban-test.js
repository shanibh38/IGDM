
logger_url = "../logger/logger.py"
experiment = "sokoban"

E = {}
E.startTime = 0
E.endTime = 0
E.debugMode = false;
E.condition = ''
E.timerDone = false
E.solvedCorrect = false;
E.difficulty = "easy";
E.validation = false;
E.actionsSolve = 0;
E.actionsValidation = 0;
E.solutionTime = 0;
E.validationTime = 0;
E.numClicksPractice = 0;
E.interval = undefined;


E.board_sokoban = {
    canvasContainerDiv : "#canvas-container",
    nrows : 6,
    ncols : 6,
    cellSize: 46,
    position: [
        [0,2,0,1,0,0],
        [0,1,2,2,0,0],
        [2,1,1,1,2,0],
        [1,0,2,2,1,0],
        [2,0,1,1,0,0],
        [0,0,0,0,0,0]
    ],
    nextPlayer: 2,
    streak:4,
    turns: 4
}



function ternaryToPosition(tern, nrows, ncols){

    var position = []
    for(r=0; r<nrows; r++){
        position.push([])
        for(c=0; c<ncols; c++){
            ch = tern[r*ncols + c]
            position[r][c] = parseInt(ch)
        }
    }

    return position;
}



function showCode() {

    $(".code").text(E.userid);

}



function show_page_real()
{
    $("#real.page").show()
}

function show_page_final(){

    $("#final.page").show()

    $("#btnContinue").hide()
    showCode();
}

function submit_demographics() {
    var gender=document.getElementById("gender").options[document.getElementById("gender").selectedIndex].value;
    var education=document.getElementById("education").options[document.getElementById("education").selectedIndex].value;
    var age=document.getElementById("age").value;

    servlog("gender", gender);
    servlog("education", education);
    servlog("age", age);
}

function submit_quiz() {


    var q1 = $("#q1").val()
    var q2 = $("#q2").val()
    var q3 = $("#q3").val()
    var q4 = $("#q4").val()
    var q5 = $("#q5").val()
    var q6 = $("#q6").val()
    var q6v = $("#q6v").val()


    servlog("quiz1", q1);
    servlog("quiz2", q2);
    servlog("quiz3", q3);
    servlog("quiz4", q4);
    servlog("quiz5", q5);
    servlog("quiz6", q6);
    servlog("quiz6v", q6v)

    var passed = false;
    if( q1 == '2' && q2 == '2' && q3 =='3' && q4 == 'c1' && q5=='b4'){
        if(E.condition=="verify") {
            if (q6v=="yes") {
                passed = true;
            }
        }
        else if( q6=='b3')
        {
            passed = true;
        }
    }


    servlog("passedQuiz", passed);

    if (passed == false & E.debugMode == false)
    {
        alert("Sorry, you did not pass the quiz. You will now be shown the tutorial again, when you're ready to re-take the quiz click continue.");
        onContinue.curPage = 2;
        onContinue();
    }
}

function submit_strategy() {
    var exp = $("#exp").val();
    servlog("strategy", exp);
}
function submit_solution() {

    var move = $("#bestmove").val();
    E.move = move;
    var conf = $('input[name=confidence]:checked', '#experiment').val()
    var ver = $("#verification").val()
    var nextmove = $("#nextmove").val()
    servlog("next_move", nextmove);
    // if(typeof conf != 'undefined')
    // {
    // var solution = $("#solution").val();
    servlog("best_move", move);
    if (conf!=undefined)
    {
        servlog("confidence", conf);
    }
    servlog("verification_answer", ver);
    // }

    if (E.condition=="full" | E.condition=="pruned") {
        // alert(move)
        if (E.configuration.winMove.indexOf(move) > -1)
        {
            E.solvedCorrect = true;
        }
        // else { //TODO: move from submit solution to screen
        //     alert("Sorry, your solution is incorrect. The correct solution was "+E.configuration.winMove[0] +". In the next screen you will" +
        //         "receive a verification code to paste in your HIT submission.")
        // }
    }
    else {
        if (ver=="yes") {
            if (E.configuration.nextMove.indexOf(nextmove) > -1 ) {
                E.solvedCorrect = true;
            }
        }

        // else  //TODO: move from submit solution to screen
        // {
        //     alert("Sorry, your solution is incorrect. The move for X was indeed a winning move. In the next screen you will" +
        //         "receive a verification code to paste in your HIT submission.")
        // }
    }
    servlog("correct",E.solvedCorrect);


}

function suggest_solution(){


    $("#group.page").show()

    $("#widget-container").prependTo($("#suggest"))

    E.widget.reset();
    $("#own").html(E.move)
}

function log_vote(){

    voteOwn = $("#cbown").prop('checked')
    voteA = $("#cba").prop('checked')
    voteB = $("#cbb").prop('checked')

    explanationVote = $("#explanationVote").val()

    servlog("vote.own", voteOwn)
    servlog("vote.A", voteA)
    servlog("vote.B", voteB)
    servlog("explanationVote", explanationVote )

}

function onContinue() {

    if( typeof onContinue.curPage == 'undefined')
        onContinue.curPage = 0;
    onContinue.curPage++;

    //blank all pages
  //  $(".page").hide();

    // E.size = getUrlVars()['size']

    //run_block()
    $("#experiment.page").show()
    //return

    //for debug:
    onContinue.curPage=5; //!!!!!!!!!!!!!!!!!!!!!!!!!!
    E.debugMode=true;//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    E.numClicksPractice =2;//!!!!!!!!!!!!!!!!

            if (onContinue.curPage==5)
            {

                E.startTime=msTime();
                run_block();
                // if (E.configuration.nextPlayer == 1) {
                // }
                // else {
                //    $('.player').text('O');
                // }

                $("#experiment.page").show()



                $(window).scrollTop(0,0);
                // Update the count down every 1 second







    }
}


//TODO check for screen size