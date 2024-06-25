
import { cards } from './load.js';
import { renderFullCard, renderGamestate } from './render.js';
import { renderSearchBox } from './render.js';
export var gamestate = {
  deck: [],
  hand: [],
  discard: [],
  board:  [
    [],
    [],
    [],
    []
]
};

function removeOneInstance(array, value) {
  const index = array.indexOf(value);
  if (index !== -1) {
      array.splice(index, 1);
  }
}
export var current_card = undefined

export function renderedClick(location, element, num) {
  let parsed = parseInputString(location);
  let { zone, slot } = parsed;
  if (current_card == undefined && zone == "board"){
    console.log("handle click",gamestate.board[slot],num)
    current_card = num;
    removeOneInstance(gamestate.board[slot], num)





  
  } else if (current_card == undefined) {
    current_card = num;
    renderFullCard(num)
    gamestate[zone].splice(slot, 1);

  } else if (current_card != undefined && zone == "board"){
    console.log(gamestate.board[slot], "add to pile")
    gamestate.board[slot].push(current_card)
    current_card = undefined;
    
  }

  renderGamestate()
  event.stopPropagation();
}



function parseInputString(inputString) {
  const regex = /^([a-zA-Z]+)(\d+)$/;
  const match = inputString.match(regex);

  if (match) {
    return {
      zone: match[1],
      slot: parseInt(match[2], 10)
    };
  }
  return null;
}


function randomize(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

var decklist = [11, 11, 9, 9, 8, 5, 5, 4, 6, 7, 23, 33, 13, 19, 31, 32, 18, 35, 17, 16];



document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("deck").addEventListener("contextmenu", function () {
    renderSearchBox("deck", "deck");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("deck").addEventListener("click", function () {
    if (current_card == undefined) {
      current_card = gamestate.deck.shift();
      renderGamestate()

    } else if (current_card != undefined) {
      gamestate.deck.push(current_card);
      current_card = undefined;
      randomize(gamestate.deck)
      renderGamestate()
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("discard").addEventListener("contextmenu", function () {
    renderSearchBox("discard", "discard");
  });
});


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("discard").addEventListener("click", function () {
    if (current_card != undefined) {
      gamestate.discard.push(current_card);
      current_card = undefined;
      renderGamestate()
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("board").addEventListener("click", function () {

    if (current_card != undefined) {
      for (let i = 0; i < 4; i++) {
        if (gamestate.board[i].length == 0) {
          gamestate.board[i].push(current_card);
          current_card = undefined;
          renderGamestate()

            break; // Exit the loop after adding the item to the next array
        }
      }
      

    } else if (current_card == undefined) {
      console.log()
    }
  });
});




export function draw(x) {
  for (let i = 0; i < x; i++) {
    if (gamestate.hand.length < 5) {
      randomize(gamestate.deck);
      gamestate.hand.push(gamestate.deck.shift());
      renderGamestate();
    }
  }
}


document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("getDeck").addEventListener("click", function () {
    
    gamestate.deck = document.getElementById('deckInput').value.split(',')
    draw(5)
    document.getElementById("getDeck").style.display= "none";
    
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("hand").addEventListener("click", function () {
    if (current_card != undefined) {
      gamestate.hand.push(current_card);
      current_card = undefined;
    }
    renderGamestate()
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("themeDeck1").addEventListener("click", function () {
    
    document.getElementById('deckInput').value = "3,2,9,22,33,1,14,3,11,34,17,13,8,35,8,2,9,27,11,10"
    document.getElementById("themeDeck1").style.display= "none";
    
  });
});



