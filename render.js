import { cards } from './load.js';
import { renderedClick } from './handle-click.js';
import { gamestate } from './handle-click.js';
import { current_card} from './handle-click.js'

function renderMiniCard(location, num) {
  const parent = document.getElementById(location);
  const newChild = parent.appendChild(document.createElement("div"));
  newChild.id = num;
  newChild.onclick = function () {
    renderedClick(location, newChild, num)
  }

  newChild.addEventListener('contextmenu', function (event) {
    event.preventDefault(); // Prevent the default context menu from appearing
    document.getElementById("cardspot").innerHTML = "";

    var clone = document.getElementById("clone").cloneNode(true);
    clone.id = "";
    clone.classList.add("card" + num, cards[num]["type"], cards[num]["color"]);

    document.getElementById("cardspot").appendChild(clone);
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
    console.log(cards[num].effect)
    if (cards[num].effect != ""){
      element.classList.add(cards[num]["effect"]);

    }
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
  renderBoard()
  console.log("gamestate",gamestate, current_card)
  
}

export function clearSearchBox() {
  document.getElementById("searchbox").innerHTML = "";
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

function renderDeck() {
  document.getElementById("deck").innerHTML = gamestate.deck.length;
}

function renderDiscard() {
  document.getElementById("discard").innerHTML = gamestate.discard.length;

}



function renderBoard() {
  document.getElementById("board").innerHTML = "";
  for (var i = 0; i < gamestate.board.length; i++) {
    //console.log("gamestate.boardi0",gamestate.board[i][0])

    if (gamestate.board[i][0] !=undefined){
      const parent = document.getElementById("board");
      const newChild = parent.appendChild(document.createElement("div"));
      newChild.id = "board"+i
        for (var x = 0; x < gamestate.board[i].length; x++){
        renderMiniCard("board"+i,gamestate.board[i][x]);
        }
       
    }
 

  }
   

  }



function sortSearch() {
  gamestate.deck.sort((a, b) => a - b);

}
