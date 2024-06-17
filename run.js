
import { gamestate, } from './gamestate.js';
import { draw } from './effects.js'
import { renderGamestate } from './render.js';
import { targets } from './targets.js';
 

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("endTurn").addEventListener("click", function () {
    document.getElementById("endTurn").innerHTML = "endturn " + gamestate.turn;
    gamestate.turn += 2;
    if (gamestate.board.length != 0){
      gamestate.board[0].ready = true;

    }

    if (gamestate.turn > 2) {
      gamestate.boardspace = 4;

    }

    gamestate.board.forEach(item => {
      item.ready = true;
    });
    renderGamestate(targets)

  });

});


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("startGame").addEventListener("click", function () {

    gamestate.turn = 1;
    gamestate.boardspace = 1;
    draw(5)
    console.log(gamestate.turn)
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("startTurn").addEventListener("click", function () {
    renderGamestate(targets)
    draw(1)
  });
});