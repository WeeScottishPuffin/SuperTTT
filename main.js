const turnind = document.getElementById("turnname");
const timeele = document.getElementById("timer");
const startbtn = document.getElementById("startbtn");
const btn3s = document.getElementById("button-3s");
const btn5s = document.getElementById("button-5s");
const btn10s = document.getElementById("button-10s");
let timelimit = 3;
let timerloop;
let start = false;
let won = true;
let turn = true; //ture = x, false = o
let placed = 0;
let log_x = [];
let log_o = [];
let timer = Date.now();

timeele.innerHTML = timelimit.toFixed(1);

function start_game(){
    startbtn.disabled = true;
    btn3s.disabled = true;
    btn5s.disabled = true;
    btn10s.disabled = true;
    won = false;
    clear();
    start = true;
    timerloop = setInterval(timeTick,100)
    timer = Date.now();
}

board = ["","","","","","","","",""]

function place(pos){
    if(won){return}
    if(!start){return}
    if(board[pos] == ""){
        placed ++;
        document.getElementById("sq-"+pos).getElementsByClassName("nought")[0].style.width = "80%";
        document.getElementById("sq-"+pos).getElementsByClassName("cross")[0].style.width = "80%";
        board[pos] = turn ? "x" : "o";
        document.getElementById("sq-"+pos).getElementsByClassName(turn ? "cross" : "nought")[0].style.display = "block";

        if (turn){
            log_x.push(pos);
            if (log_x.length > 3){
                remove(log_x.shift())
            }
        } else {
            log_o.push(pos);
            if (log_o.length > 3){
                remove(log_o.shift())
            }   
        }
        
        if (placed > 5){
            document.getElementById("sq-" + log_x[0]).getElementsByClassName("cross")[0].style.width = turn ? "80%" : "50%";
            document.getElementById("sq-" + log_o[0]).getElementsByClassName("nought")[0].style.width = turn ? "50%" : "80%";
        }

        checkwin = check(board);
        if (checkwin == "x"){
            win("X");
            return;
        } else if (checkwin == "o"){
            win("O");
            return;
        }

        turn = !turn;
        turnind.innerHTML = turn ? "X's turn" : "O's turn";
        timer = Date.now();
        return true;
    }
    return false;
}

function remove(pos){
    board[pos] = "";
    document.getElementById("sq-"+pos).getElementsByClassName("nought")[0].style.display = "none";
    document.getElementById("sq-"+pos).getElementsByClassName("cross")[0].style.display = "none";
}

function check(data){ //0 = none
    if(board[0] == board[1] && board[0] == board[2] && board[0] != ""){return board[0];}
    if(board[3] == board[4] && board[3] == board[5] && board[3] != ""){return board[3];}
    if(board[6] == board[7] && board[6] == board[8] && board[6] != ""){return board[6];}
    if(board[0] == board[3] && board[0] == board[6] && board[0] != ""){return board[0];}
    if(board[1] == board[4] && board[1] == board[7] && board[1] != ""){return board[1];}
    if(board[2] == board[5] && board[2] == board[8] && board[2] != ""){return board[2];}
    if(board[0] == board[4] && board[0] == board[8] && board[0] != ""){return board[0];}
    if(board[2] == board[4] && board[2] == board[6] && board[2] != ""){return board[2];}
    return 0;
}

function clear(){
    for (let index = 0; index < 9; index++) {
        remove(index);
    }
    log_o = [];
    log_x = [];
    placed = 0;
}

function win(c){
    won = true;
    startbtn.disabled = false;
    btn3s.disabled = false;
    btn5s.disabled = false;
    btn10s.disabled = false;
    timeele.innerHTML = timelimit.toFixed(1);
    turnind.innerHTML = c + " wins!";
    document.getElementById("sq-" + log_x[0]).getElementsByClassName("cross")[0].style.width = "80%";
    document.getElementById("sq-" + log_o[0]).getElementsByClassName("nought")[0].style.width = "80%";
    clearInterval(timerloop);
}

function timeTick(){
    diff = (Date.now() - timer) / 1000;
    timeele.innerHTML = Math.max(0,timelimit - Math.round(diff*10)/10).toFixed(1);
    if (diff > timelimit){
        clearInterval(timerloop);
        won = true;
        if (placed > 1){
            document.getElementById("sq-" + log_x[0]).getElementsByClassName("cross")[0].style.width = "80%";
            document.getElementById("sq-" + log_o[0]).getElementsByClassName("nought")[0].style.width = "80%";
        }
        startbtn.disabled = false;
        btn3s.disabled = false;
        btn5s.disabled = false;
        btn10s.disabled = false;
        timeele.innerHTML = timelimit.toFixed(1);
        turnind.innerHTML = turn ? "O wins!" : "X wins!";
    }
}

