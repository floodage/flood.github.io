
import { cards } from './load.js';
import { renderGamestate } from './render.js';
import { gamestate } from './gamestate.js';
import { targets } from './targets.js';
import { defineTargets } from './targets.js';

// take what is clicked capture all the information
export function renderedClick(location, element, num) {
  // we want remove where something is 
  // move to where it needs to go 
    let parsed = parseInputString(location);
    let { zone, slot } = parsed;


    if (zone == ("board") && gamestate.task == "") { effectGamestate(zone,slot,element.parentElement.id, "move") }
    if (zone == ("hand") && gamestate.task == "") { effectGamestate(zone,slot,element.parentElement.id, "board") }
    if (zone == ("deck") && gamestate.task == "searching") { effectGamestate(zone,slot,element.parentElement.id, "hand") }
    if (zone == ("hand") && gamestate.task == "discarding") { effectGamestate(zone,slot,element.parentElement.id, "discard") }
    if (zone == ("discard") && gamestate.task == "recovering") { effectGamestate(zone,slot,element.parentElement.id, "hand") }
    if (zone == ("hand") && gamestate.task == "shuffling") { effectGamestate(zone,slot,element.parentElement.id, "deck") }
    if (zone == ("board") && gamestate.task == "sacrificing") { effectGamestate(zone,slot,element.parentElement.id, "sacrifice") }
    if (zone == ("oppboard") && gamestate.task == "attacking" ){console.log("target for attack",zone,slot)}
}

function summonUnit(object) {
  gamestate.board.push(object);
  gamestate.task = "";
  gamestate.limbo = [];
  gamestate.cost = [];
}

function unitLimbo(id) {
  var newItem = { value: id };
  newItem.position = "back";
  newItem.color = cards[id].color.charAt(0);
  newItem.status = "";
  newItem.ready = false;
  newItem.type = cards[id].type;
  newItem.souls = [];
  gamestate.limbo = newItem
  if (cards[id].type == "Soul") {
    summonUnit(gamestate.limbo)
  } else if (cards[id].type == "Hero") {
    gamestate.task = "sacrificing";
    gamestate.cost = cards[id].cost.split("");
    defineTargets("board", "color", gamestate.cost)
  }
}


// thhis is just for moving cards in the gamestate

export function effectGamestate(word,number, element, destination){
  if (destination == "board") {
    if (gamestate.board.length < gamestate.boardspace || cards[gamestate[word][number]].type == "Hero") {
      if (cards[gamestate[word][number]].type == "Soul") {
        unitLimbo(gamestate[word][number]);
        gamestate[word].splice(number, 1);

      } else if (cards[gamestate[word][number]].type == "Hero") {
        let readySouls = gamestate.board.filter(item => item.type === "Soul" && item.ready == true).map(item => item.color)
        let requiredCost = (cards[gamestate[word][number]].cost).split("").filter(element => element !== "w")
        const canFulfillRequest = (req, ready) => req.every(item => req.filter(x => x === item).length <= ready.filter(x => x === item).length);

        if (readySouls.length >= (cards[gamestate[word][number]].cost).split("").length && canFulfillRequest(requiredCost,readySouls)) {
          unitLimbo(gamestate[word][number]);
          gamestate[word].splice(number, 1);
        } else {
          console.log("you can't pay that soul cost")
        }
      }
    } else {
      console.log("full")
    }
  }

  if (destination == "hand") {
    gamestate.hand.push(gamestate[word][number]);
    gamestate[word].splice(number, 1);
    gamestate.task = "";
  }

  if (destination == "deck") {
    gamestate.deck.push(gamestate[word][number]);
    gamestate[word].splice(number, 1);
    gamestate.task = "";
  }

  if (destination == "move") {
    if (gamestate[word][number].position === "front") {
      gamestate[word][number].position = "back";
    } else if (gamestate[word][number].position === "back") {
      gamestate[word][number].position = "front";
    }
  }

  if (destination == "discard") {
    gamestate.discard.push(gamestate[word][number])
    gamestate[word].splice(number, 1)
    gamestate.task = "";
  }

  if (destination == "sacrifice") {
    if (gamestate[word][number].type == "Soul"){
    if (gamestate[word][number].color.charAt(0) == gamestate.cost[0] || gamestate.cost[0] == "w") {
      gamestate.limbo.souls.push(gamestate[word][number]) //attach the soul
       gamestate.limbo.souls.position = undefined;
       gamestate.limbo.souls.status = undefined;
       gamestate.limbo.souls.ready = undefined;
      gamestate.cost.shift(); //remove from cost
      gamestate.board.splice(number, 1) //remove the soul from play
      defineTargets("board", "color", gamestate.cost)
    }
    if (gamestate.cost.length == 0) { summonUnit(gamestate.limbo) } //move unit from limbo to board}
  }
} else {
  console.log("you can't sacrifice heroes")
}
renderGamestate(targets);

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
