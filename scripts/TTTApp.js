/**
 * Created by nafdeya on 19/03/14.
 */

(function(){
    "use strict"

    function TTTGame(divId , selectId , startId) {
        this.player = {"XXX" : "X" , "OOO" : "O"};
        this.currPlyer  = "X";
        this.winner = "";
        this.cells = [];
        this.rowCount = 0;
        this.selectDropDown = TTTUtil.getObject(selectId);
        this.startButton = TTTUtil.getObject(startId);
        this.board = TTTUtil.getObject(divId);
        TTTUtil.bindEvents(this.startButton,"click" , this.startGame,this);
        TTTUtil.bindEvents(this.selectDropDown,"change" , this.startGame,this);
        this.startGame();
    }

    TTTGame.prototype.startGame = function(){
       this.reSetValues();
    }

    TTTGame.prototype.reSetValues = function(){
        this.rowCount = this.selectDropDown.options[this.selectDropDown.selectedIndex].value;
        this.maxClicks = this.rowCount * this.rowCount;
        this.clicked = 0;
        this.board.innerHTML = "";
        this.cells = [];
        this.winner = "";
        this.currPlyer = "X";
        this.drawBoard();
    }

    TTTGame.prototype.drawBoard = function(){
        var positionCount = [];
        var player1 = "";
        var player2 = "";
        for (var i = 0; i < this.rowCount; i += 1) {
            this.cells[i] = [];
            player1 += "X";
            player2 += "O";

            for (var j = 0; j < this.rowCount; j += 1) {
                var cell = document.createElement("li");
                cell.setAttribute("class" , "cell");
                cell.positionCount = [i,j];
                cell.selected = false;
                cell.appendChild(document.createTextNode(""));
                this.board.appendChild(cell);
                TTTUtil.bindEvents(cell,"click",this.handelClickEvent,this);
                this.cells[i][j] = cell;
            }
        }
        this.board.style.width = (38 *this.rowCount)+"px";
        this.player[player1] =  "X";
        this.player[player2] = "O";
    }

    TTTGame.prototype.handelClickEvent = function(e){


        if(!e.target.selected && !(this.maxClicks == this.clicked)){
            e.target.innerHTML = this.currPlyer;
            this.clicked++;
            this.currPlyer = (this.currPlyer == "X") ? "O" : "X";
            this.checkWinConditions(e.target.positionCount);
            if(this.winner){
                alert("Player " + this.winner + " Won !!");
                this.reSetValues();
            }
        }
        if(this.maxClicks == this.clicked){
            alert("Game Draw !");
            this.reSetValues();
        }
    }

    TTTGame.prototype.checkWinConditions = function(indexes){

       if( this.checkColumns(indexes[0])){
            return ;
       }else if(this.checkRows(indexes[1])){
           return ;
       }
        if (indexes[0] == indexes[1]) {
            return (this.checkDigonals()) ?  true :  false;
        }
        if((indexes[0] + indexes[1]) == (this.rowCount-1)) {
            return (this.checkAntiDigonals()) ?  true :  false;
        }
    }

    TTTGame.prototype.checkColumns = function(columnNum){
        var str = "";
        for(var i = 0 ; i < this.rowCount ;i++){
         str =   str +  this.cells[columnNum][i].innerHTML
        }
       return this.isGameOver(str);

    }

    TTTGame.prototype.checkRows = function(rowNum){
        var str = "";
        for(var i = 0 ; i < this.rowCount ;i++){
            str =   str +  this.cells[i][rowNum].innerHTML
        }
       return this.isGameOver(str);

    }

    TTTGame.prototype.checkDigonals = function(){
        var str = "";
        for(var i = 0 ; i < this.rowCount ;i++){
            str =   str +  this.cells[i][i].innerHTML
        }
       return this.isGameOver(str);

    }

    TTTGame.prototype.checkAntiDigonals = function(){
        var str = "";
        for(var i = 0, j = this.rowCount-1  ; i < this.rowCount ;i++,j--){
                str =   str +  this.cells[i][j].innerHTML
        }
        return this.isGameOver(str);

    }

    TTTGame.prototype.isGameOver = function(str){
        if(str.length == this.rowCount ){
            if(this.player[str]){
                this.winner = this.player[str];
                return true;
            };
        }
        return false;
    }
    window.TTTGame = TTTGame;

})()
window.onload=function(){
    var app  = new TTTGame("board" ,"rowCount" ,"start");
};