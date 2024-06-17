import { gamestate } from "./gamestate.js";
import { renderGamestate } from "./render.js";
export var targets = [];

export function defineTargets(zone, attribute, requirement) {
    targets = [];
  
    for (let i = 0; i < gamestate[zone].length; i++) {
      if (gamestate[zone][i].ready == true) {
        if (requirement[0] == (gamestate[zone][i][attribute]) || requirement[0] == "w") {
          targets.push(zone + i)
          console.log(document.getElementById(zone+i))

        }
      }
      renderGamestate(targets)
    }
  }