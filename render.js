import { cards } from './load.js';
import { gamestate, renderedClick, targets } from './alpha.js';
import { sortSearch } from './effects.js';

import { enemyGamestate } from './alpha_enemy.js';

function renderMiniCard(location, num) {

  const parent = document.getElementById(location);
  parent.innerHTML = "";
  const newChild = parent.appendChild(document.createElement("div"));
  newChild.id = num;
  newChild.onclick = function () {
    renderedClick(location, newChild, num)
  }

  newChild.addEventListener('contextmenu', function (event) {
    event.preventDefault(); // Prevent the default context menu from appearing
    document.getElementById("searchbox").innerHTML = "";

    var clone = document.getElementById("clone").cloneNode(true);
    clone.id = "";
    clone.classList.add("card" + num, cards[num]["type"], cards[num]["color"]);

    document.getElementById("searchbox").appendChild(clone);
    renderFullCard(newChild.id);
  });

  var clone = document.getElementById("miniclone").cloneNode(true);
  clone.id = "";
  clone.classList.add("card" + num, cards[num]["type"], cards[num]["color"]);
  newChild.appendChild(clone);

  const elements = document.querySelectorAll(".card" + num + " .effect");

  elements.forEach((element) => {
    element.classList.add(cards[num]["effect"]);
  });

  if (cards[num]["type"] != "Soul") {
    var cost = cards[num]["cost"].split("");
    for (let i = 0; i < 2; i++) {



      const elements = document.querySelectorAll(".card" + num + " .soul-block")

      elements.forEach((element) => {
        element.children[i].classList.add(cost[i]);
      });

    }
  }
}

export function renderFullCard(num) {

  const elements = document.querySelectorAll(".card" + num + " .effect");

  elements.forEach((element) => {
    element.classList.add(cards[num]["effect"]);
  });

  if (cards[num]["type"] != "Soul") {
    var cost = cards[num]["cost"].split("");
    for (let i = 0; i < 2; i++) {



      const elements = document.querySelectorAll(".card" + num + " .soul-block")

      elements.forEach((element) => {
        element.children[i].classList.add(cost[i]);
      });

    }
  }
}




export function renderGamestate(array) {
  renderDeck()
  renderDiscard()
  renderHand()
  renderRow()
  console.log(gamestate)
  console.log("enemy",enemyGamestate)
  paintTarget(array)
  clearSearchBox()

}

export function clearSearchBox() {
  document.getElementById("searchbox").innerHTML = "";
  document.getElementById("searchbox").style.display = "none"
}

export function renderSearchBox(location, type) {
  const parent = document.getElementById("searchbox");
  
  clearSearchBox()
  document.getElementById("searchbox").style.display = "flex"
  sortSearch();
  for (let i = 0; i < gamestate[location].length; i++) {
    const newChild = parent.appendChild(document.createElement("div"));
    newChild.id = type + i;
    renderMiniCard(type + i, gamestate[location][i]);

  }
}

function renderHand() {
  const parent = document.getElementById("hand");
  parent.innerHTML = "";
  for (var i = 0; i < gamestate.hand.length; i++) {
    const newChild = parent.appendChild(document.createElement("div"));
    newChild.id = "hand" + i
    renderMiniCard(newChild.id, gamestate.hand[i])
  }
}
function paintTarget(array) {
  for (let i = 0; i < array.length; i++) {
    if (document.getElementById(array[i]) != undefined) {
      document.getElementById(array[i]).classList.add("target");
    }
  }
}


function renderDeck() {
  document.getElementById("deck").innerHTML = gamestate.deck.length;
}

function renderDiscard() {
  document.getElementById("discard").innerHTML = gamestate.discard.length;

}



function renderRow() {
  document.getElementById("frontrow").innerHTML = "";
  document.getElementById("backrow").innerHTML = "";

  for (var i = 0; i < gamestate.board.length; i++) {


    if (gamestate.board[i].position == "front") {
      const parent = document.getElementById("frontrow");
      const newChild = parent.appendChild(document.createElement("div"));
      newChild.id = "board" + i;

    } else if (gamestate.board[i].position == "back") {
      const parent = document.getElementById("backrow");
      const newChild = parent.appendChild(document.createElement("div"));
      newChild.id = "board" + i;
    }
    renderMiniCard("board" + i, gamestate.board[i].value);
    if (gamestate.board[i].souls.length != 0) {
      for (var x = 0; x < gamestate.board[i].souls.length; x++) {
        const parent = document.getElementById("board" + i)
        const newChild = parent.appendChild(document.createElement("div"));
        newChild.classList.add("soul", gamestate.board[i].souls[x], "attached")
      }


    }

    if (gamestate.board[i].ready == true) {
      document.getElementById("board" + [i]).children[0].children[0].children[0].classList.add("ready");
    }


  }
}

function renderReady(c) {


}