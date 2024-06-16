

export let enemyGamestate = {
    deck: 20,
    hand: 0,
    discard: [],
    board: [],
    turn: 0,
  };

  createTest();
function createTest(){
    enemyGamestate.deck = 10;
    enemyGamestate.hand = 2;
    enemyGamestate.discard = [1,2]
enemyGamestate.board = [{
    color: "g",
    position: "back",
    ready: false,
    souls: [],
    status: "",
    type: "Soul",
    value: 5
},
{
    color: "g",
    position: "back",
    ready: false,
    souls: ['g'],
    status: "",
    type: "Hero",
    value: 18
}]    
}