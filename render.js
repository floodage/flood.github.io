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

export function renderGamestate(array) {
  renderDeck()
  renderDiscard()
  renderHand()
  clearSearchBox()
  renderRow()
  console.log("gamestate",gamestate,"oppstate",oppstate)
  paintTarget(array)

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

function renderReady(c) {


}