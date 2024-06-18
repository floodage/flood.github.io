import { cards } from './load.js';
import { renderedClick } from './handle-click.js';
import { sortSearch } from './effects.js';
import { targets } from './targets.js';
import { gamestate } from './gamestate.js';
import { oppstate } from './oppstate.js';

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

export function renderGamestate() {
  renderDeck()
  renderDiscard()
  renderHand()
  clearSearchBox()
  renderRow()
  console.log("gamestate",gamestate,"oppstate",oppstate)
  renderOppstate()
  paintTarget()
  
}

export function renderOppstate(){
  renderOppHand()
  renderOppDeck()
  renderOppRow()
}

export function renderOppHand(){
  const parent = document.getElementById("opphand");
  parent.innerHTML = "";
  for (var i = 0; i < oppstate.hand; i++) {
    const newChild = parent.appendChild(document.createElement("div"));
    newChild.id = "opphand" + i
newChild.classList.add("cardback")  }
 
}

export function renderOppDeck(){
  document.getElementById("oppdeck").innerHTML = oppstate.deck;

}

export function renderOppRow(){
  document.getElementById("opprow").innerHTML = "";

  for (var i = 0; i < oppstate.board.length; i++) {

    const parent = document.getElementById("opprow");
    const newChild = parent.appendChild(document.createElement("div"));
    newChild.id = "oppboard" + i;
    newChild.classList.add("unit"+oppstate.board[i].position)

    renderMiniCard("oppboard" + i, oppstate.board[i].value);
    if (oppstate.board[i].souls.length != 0) {
      const parent = document.getElementById("oppboard" + i)
        const newChild = parent.appendChild(document.createElement("div"));
        newChild.id ="oppboard"+i+"attached"

      for (var x = 0; x < oppstate.board[i].souls.length; x++) {
        const parent = document.getElementById("oppboard" + i+"attached")
        const newChild = parent.appendChild(document.createElement("div"));
        newChild.classList.add("soul", oppstate.board[i].souls[x].color.charAt(0), "attached")
      }


    }

    if (oppstate.board[i].ready == true && oppstate.board[i].type == "Soul") {
      document.getElementById("oppboard" + [i]).children[0].children[0].children[0].classList.add("ready");
    }


  }
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
function paintTarget() {
  for (let i = 0; i < targets.length; i++) {
    if (document.getElementById(targets[i]) != undefined) {
      document.getElementById(targets[i]).classList.add("target");
      console.log(targets[i],"is a target")
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
  document.getElementById("row").innerHTML = "";

  for (var i = 0; i < gamestate.board.length; i++) {

    const parent = document.getElementById("row");
    const newChild = parent.appendChild(document.createElement("div"));
    newChild.id = "board" + i;
    newChild.classList.add("unit"+gamestate.board[i].position)

    renderMiniCard("board" + i, gamestate.board[i].value);
    if (gamestate.board[i].souls.length != 0) {
      const parent = document.getElementById("board" + i)
        const newChild = parent.appendChild(document.createElement("div"));
        newChild.id ="board"+i+"attached"
      for (var x = 0; x < gamestate.board[i].souls.length; x++) {
        const parent = document.getElementById("board" + i+"attached")
        const newChild = parent.appendChild(document.createElement("div"));
        newChild.classList.add("soul", gamestate.board[i].souls[x].color.charAt(0), "attached")
      }


    }

    if (gamestate.board[i].ready == true && gamestate.board[i].type == "Soul") {
      document.getElementById("board" + [i]).children[0].children[0].children[0].classList.add("ready");
    }


  }
}
