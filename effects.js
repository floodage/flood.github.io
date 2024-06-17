import { gamestate } from './gamestate.js';
import { renderGamestate } from './render.js';
import { renderSearchBox } from './render.js';
import { targets } from './targets.js';

function randomize(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}
export function draw(x) {
  for (let i = 0; i < x; i++) {
      if (gamestate.hand.length < 5) {
        randomize(gamestate.deck);
          gamestate.hand.push(gamestate.deck.shift());
          renderGamestate(targets);
      }
  }
}

export function search(){
gamestate.task = "searching";
  
    if (gamestate.hand.length < 5) {
      renderSearchBox("deck","deck")

    
}
}
export function shuffle(){
  gamestate.task = "shuffling";
}

export function discard(){
  gamestate.task = "discarding";
  

}

export function recover(){
  gamestate.task = "recovering"
  if (gamestate.hand.length < 5) {
    renderSearchBox("discard","discard")
}}

export function sortSearch() {
  gamestate.deck.sort((a, b) => a - b);

}



//debug

  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("drawOneButton").addEventListener("click", function() {
      draw(1);
    });
  });

  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("searchButton").addEventListener("click", function() {
      search();
    });
  });

  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("discardButton").addEventListener("click", function() {
      discard();
    });
  });


  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("recoverButton").addEventListener("click", function() {
      recover();
    });
  });

  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("shuffleButton").addEventListener("click", function() {
      shuffle();
    });
  });
