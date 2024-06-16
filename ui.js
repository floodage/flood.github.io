import { clearSearchBox, renderSearchBox } from "./render.js";

export function viewPile(location) {
    clearSearchBox()
    if (location == "discard") {
      renderSearchBox(location,"view");
    } else if (location == "deck") {
      renderSearchBox(location,"view");
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("deck").addEventListener("click", function() {
      viewPile("deck");
    });
  });

  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("discard").addEventListener("click", function() {
      viewPile("discard");
    });
  });