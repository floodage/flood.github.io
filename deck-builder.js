
var searchBox = document.getElementById("cardbox")
var deckBox = document.getElementById("deckbox");
var totalCards = 72;
var decklist = []

import { cards } from "./load.js";

function renderBuilder(){
   searchBox.innerHTML = "";
   deckBox.innerHTML = "";
   decklist.sort((a, b) => a - b);

    printCards()
    printDeck()
    document.getElementById("deckCount").innerHTML = decklist.length;
}

function printDeck(){
    for (let i = 0; i < decklist.length; i++) {
        renderMiniCard("deckbox",decklist[i])
    }
    document.getElementById("deckInput").value = decklist;
}
function printCards(){
    for (let num = 0; num < totalCards; num++) {
        renderMiniCard("cardbox",num)
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("start").addEventListener("click", function () {
      
     renderBuilder()
      
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("import").addEventListener("click", function () {
      decklist = document.getElementById("deckInput").value.split(',')
      renderBuilder()
      
    });
  });


  function renderMiniCard(location ,num) {
    const parent = document.getElementById(location);
    const newChild = parent.appendChild(document.createElement("div"));
    newChild.id = num;
    newChild.onclick = function () {
      if (location == "cardbox"){
        decklist.push(num)
      } else if (location == "deckbox"){
        decklist.splice(decklist.indexOf(num), 1);

    }
      renderBuilder()
    }
  
    newChild.addEventListener('contextmenu', function (event) {
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
  