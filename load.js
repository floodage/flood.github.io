import { renderFullCard } from "./render.js";
export let cards = [];

var url =
  "https://script.google.com/macros/s/AKfycbwjSmI_tuT9g_spEjwaJCwNlj5AgXrHHIp-525iN6VJFyCbXGtAf4YtiqejxZbbnmR63g/exec";
  let totalCards = 36*3; //total cards in the set
  let css = []; // css to format all off the cards
  let starter = 36*0; 
  //var url = "cards.json"; 


  export function load() {
    fetch(url)
      .then((d) => d.json())
      .then((d) => {
        d[0].data.forEach((card) => {
          cards.push(card);
        });
  
        for (let i = starter; i < totalCards; i++) {
          css.push(cards[i]["css"]);
        }
        let s = document.createElement("style");
        s.innerHTML = css.join(" ");
        document.getElementsByTagName("head")[0].appendChild(s);
        console.log(
          "%c🔮Soul Database Downloaded",
          "background: teal; color: white; font-size: 1.5rem;"
        );
        document.getElementById("debugMenu").style.display = "flex";
      });
      console.log(cards)
  }
  document.addEventListener("DOMContentLoaded", function() {
    load();
});

export function printAll() {
    for (let num = 0; num < totalCards; num++) {
      var clone = document.getElementById("clone").cloneNode(true);
      clone.id = "";
      clone.classList.add("card" + num, cards[num]["type"], cards[num]["color"]);
      document.body.appendChild(clone);
      renderFullCard(num);
  
    }
    document.getElementById("gameContainer").remove();
  }
  



  document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("printAllButton").addEventListener("click", function () {
      
      printAll()
      
    });
  });
