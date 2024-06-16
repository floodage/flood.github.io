
import { cards } from './load.js';
import { renderGamestate } from './render.js';

export let gamestate = {
  deck: [11, 11, 9, 9, 8, 5, 5, 4, 6, 7, 23, 33, 13, 19, 31, 32, 18, 35, 17, 16],
  hand: [],
  discard: [],
  board: [],
  limbo: [],
  task: "",
  cost: [],
  turn: 0,
  boardspace: 0,
};

export let targets = [];


export function renderedClick(location, newChild) {
  if (location.includes("board") && gamestate.task == "") { effectGamestate(newChild.parentElement.id, "move") }
  if (location.includes("hand") && gamestate.task == "") { effectGamestate(newChild.parentElement.id, "board") }
  if (location.includes("deck") && gamestate.task == "searching") { effectGamestate(newChild.parentElement.id, "hand") }
  if (location.includes("hand") && gamestate.task == "discarding") { effectGamestate(newChild.parentElement.id, "discard") }
  if (location.includes("discard") && gamestate.task == "recovering") { effectGamestate(newChild.parentElement.id, "hand") }
  if (location.includes("hand") && gamestate.task == "shuffling") { effectGamestate(newChild.parentElement.id, "deck") }
  if (location.includes("board") && gamestate.task == "sacrificing") { effectGamestate(newChild.parentElement.id, "sacrificing") }


}

function summonUnit(object) {
  gamestate.board.push(object);
  gamestate.task = "";
  gamestate.limbo = [];
  gamestate.cost = [];
  targets = [];
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

function defineTargets(zone, attribute, requirement) {
  targets = [];

  for (let i = 0; i < gamestate[zone].length; i++) {
    if (gamestate[zone][i].ready == true) {
      if (requirement[0] == (gamestate[zone][i][attribute]) || requirement[0] == "w") {
        targets.push(zone + i)
      }
    }
    renderGamestate(targets)
  }
}

export function effectGamestate(current, goal) {
  let parsed = parseInputString(current);
  let { word, number } = parsed;
  if (goal == "board") {
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

  if (goal == "hand") {
    gamestate.hand.push(gamestate[word][number]);
    gamestate[word].splice(number, 1);
    gamestate.task = "";
  }

  if (goal == "deck") {
    gamestate.deck.push(gamestate[word][number]);
    gamestate[word].splice(number, 1);
    gamestate.task = "";
  }

  if (goal == "move") {
    if (gamestate[word][number].position === "front") {
      gamestate[word][number].position = "back";
    } else if (gamestate[word][number].position === "back") {
      gamestate[word][number].position = "front";
    }
  }

  if (goal == "discard") {
    gamestate.discard.push(gamestate[word][number])
    gamestate[word].splice(number, 1)
    gamestate.task = "";
  }

  if (goal == "sacrificing") {
    if (gamestate[word][number].color.charAt(0) == gamestate.cost[0] || gamestate.cost[0] == "w") {
      gamestate.limbo.souls.push(gamestate[word][number].color.charAt(0)) //attach the soul
      gamestate.cost.shift(); //remove from cost
      gamestate.board.splice(number, 1) //remove the soul from play
      defineTargets("board", "color", gamestate.cost)
    }
    if (gamestate.cost.length == 0) { summonUnit(gamestate.limbo) } //move unit from limbo to board}
  }
  renderGamestate(targets);
}
function parseInputString(inputString) {
  const regex = /^([a-zA-Z]+)(\d+)$/;
  const match = inputString.match(regex);

  if (match) {
    return {
      word: match[1],
      number: parseInt(match[2], 10)
    };
  }
  return null;
}
