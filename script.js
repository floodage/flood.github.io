var url =
  "https://script.google.com/macros/s/AKfycbwjSmI_tuT9g_spEjwaJCwNlj5AgXrHHIp-525iN6VJFyCbXGtAf4YtiqejxZbbnmR63g/exec";
var cards = []; // json of all cards
var totalCards = 36; //total cards in the set
var css = []; // css to format all off the cards
var current_card;
var gamestate = {
  deck: [23, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10],
  hand: [],
  discard: [],
  board: [],
};
var url = "cards.json"; // this is to stop it from fetching the API every time

// in board it would have 1/4 units > informs 'slot' 1-4 on the board
// 1/x souls attached > cards/souls rendered under the card
// a single effect (hex, stun, ready) > informs rotation css
// a position front/back > informs position on board

function Load() {
  fetch(url)
    .then((d) => d.json())
    .then((d) => {
      cards = d[0].data;
      for (var i = 0; i < totalCards; i++) {
        css.push(cards[i]["css"]);
      }
      var s = document.createElement("style");
      s.innerHTML = css.join(" ");
      document.getElementsByTagName("head")[0].appendChild(s);
      document.getElementById("button").remove();
      console.log(
        "%c🔮Soul Database Downloaded",
        "background: teal; color: white; font-size: 1.5rem;"
      );
    });
}

function rightClick(location) {
  if (location == "discard" && current_card == undefined) {
    renderSearchBox(location);
  } else if (location == "deck" && current_card == undefined) {
    renderSearchBox(location);
  }
}

function leftClick(location) {

  if (current_card == undefined) {
    if (location == "deck") { current_card = gamestate.deck.shift(); }
    if (location == "hand") { current_card = gamestate.hand.shift() }
  } else if (current_card != undefined) {
    if (location == "deck") { gamestate.deck.push(current_card); }
    if (location == "discard") { gamestate.discard.push(current_card); renderMiniCard(location, current_card) }
    if (location == "hand") { gamestate.hand.push(current_card) }
    if (location.includes("row") ) {
      const newItem = { value: current_card };
      newItem.position = "back";
      gamestate.board.push(newItem);
    }
    current_card = undefined;
    renderHand();
    renderRow();
  }
  if (current_card != undefined) {
    document.body.style.cursor = "grab";
  } else {
    document.body.style.cursor = "pointer";
  }
  console.log("leftclick",gamestate,location,current_card)
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function startMulligan() {
  for (var i = 0; i < 5; i++) {
    gamestate.hand[i] = gamestate.deck.shift();
    renderHand();
  }
}

function renderSearchBox(location) {
  const parent = document.getElementById("searchbox");
  for (let i = 0; i < gamestate[location].length; i++) {
    const newChild = parent.appendChild(document.createElement("div"));
    newChild.id = "deck" + i;

    renderMiniCard("deck" + i, gamestate[location][i]);
  }
}
function clearSearchBox() {
  document.getElementById("searchbox").innerHTML = "";
}
function renderHand() {


  const parent = document.getElementById("hand");
  parent.innerHTML="";
  for (var i = 0; i < gamestate.hand.length; i++) {
    const newChild = parent.appendChild(document.createElement("div"));
    newChild.id = "hand" + i

    renderMiniCard(newChild.id, gamestate.hand[i])
  }
}

function renderRow() {
  document.getElementById("frontrow").innerHTML = "";
  document.getElementById("backrow").innerHTML = "";

  for (var i = 0; i < gamestate.board.length; i++) {
    if (gamestate.board[0].position == "front") {
      const parent = document.getElementById("frontrow");
      const newChild = parent.appendChild(document.createElement("div"));
      newChild.id = "board" + i;
    } else if (gamestate.board[0].position == "back") {
      const parent = document.getElementById("backrow");
      const newChild = parent.appendChild(document.createElement("div"));
      newChild.id = "board" + i;
    }
    renderMiniCard("board" + i, gamestate.board[i].value);
  }
}
function effectBoardstate(inputString) {
  // Regular expression to match the word and number parts
  const regex = /^([a-zA-Z]+)(\d+)$/;
  const match = inputString.match(regex);

  if (match) {
      const word = match[1];
      const number = parseInt(match[2], 10); // Convert the number part to an integer
      (gamestate[word]).splice(number,1)
      renderHand();
    
  } 
}


function renderMiniCard(location, num) {

  const parent = document.getElementById(location);
  parent.innerHTML = "";
  const newChild = parent.appendChild(document.createElement("div"));
  newChild.id = num;
  newChild.onclick = function () {
    if (current_card == undefined){
    event.stopPropagation();

    console.log(this.id)
    current_card=this.id;
    effectBoardstate(newChild.parentElement.id)
  }
  }

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
      document
        .querySelector(".card" + num + " .soul-block")
        .children[i].classList.add(cost[i]);
    }
  }
}

function renderFullCard(num) {
  var clone = document.getElementById("clone").cloneNode(true);
  clone.id = "";
  clone.classList.add("card" + num, cards[num]["type"], cards[num]["color"]);
  document.body.appendChild(clone);

  document
    .querySelector(".card" + num + " .effect")
    .classList.add(cards[num]["effect"]);

  if (cards[num]["type"] != "Soul") {
    var cost = cards[num]["cost"].split("");
    for (let i = 0; i < 2; i++) {
      document
        .querySelector(".card" + num + " .soul-block")
        .children[i].classList.add(cost[i]);
    }
  }
}

function print() {
  for (let num = 0; num < totalCards; num++) {
    renderFullCard(num);
  }

  document.getElementById("clone").remove();
  document.getElementById("button").remove();
  document.getElementById("button").remove();
}
