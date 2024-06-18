

export let oppstate = {
    deck: 20,
    hand: 0,
    discard: [],
    board: [],
    turn: 0,
  };

  createTest();
function createTest(){
    oppstate.deck = 10;
    oppstate.hand = 2;
    oppstate.discard = [1,2]
    oppstate.board = [{
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
    position: "front",
    ready: false,
   
    status: "",
    type: "Hero",
    value: 18
}]    
oppstate.board[1].souls = [{value: 5, color: "g"},]
}


