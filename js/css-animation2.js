// Original JavaScript code by Chirp Internet: www.chirp.com.au // Please acknowledge use of this code by including this header.
var CardGame = function(targetId)
{
  // private variables
  var cards = []
  var card_value = ["1C","2C","3C","4C","5C","6C","7C","8C","1H","2H","3H","4H","5H","6H","7H","8H"];

  var started = false;
  var matches_found = 0;
  var card1 = false, card2 = false;


  // initialize

  var stage = document.getElementById(targetId);
  var felt = document.createElement("div");
  felt.id = "felt";
  stage.appendChild(felt);

  // template for card
  var card = document.createElement("div");
  card.className ="dcard";
  card.innerHTML = "<img src=\"images/cards/back.png\">";

  for(var i=0; i < 16; i++) { //del 0 al 15
    var newCard = card.cloneNode(true);/*  deep Boolean Optional. Specifies whether all descendants of the node should be cloned.
                                               * true - Clone the node, its attributes, and its descendants
                                               * false - Default. Clone only the node and its attributes 
                                               this clone the div + image together if true, otherwise if false only clone the div element*/

    newCard.fromtop = 15 + 120 * Math.floor(i/4); // Redondear un número hacia abajo a su número entero más próximo: ejm: (0.75 a 0), (1.25 a 1)
    newCard.fromleft = 70 + 100 * (i%4); // Modular o Mod
    (function(idx) {
      newCard.addEventListener("click", function() { cardClick(idx); }, false); // captura=true propagacion=false
    })(i);

    felt.appendChild(newCard);
    cards.push(newCard);
  } 

  var cardClick = function(id)
  {
    if(started) {
      showCard(id);
    } else {
      // shuffle and deal cards (BARAJAR Y REPARTIR TARJETAS)
      // ["2C", "1C", "6C", "3H", "4H", "8H", "5C", "8C", "4C", "5H", "6H", "2H", "7C", "7H", "3C", "1H"]
      // ["5C", "5H", "7C", "6H", "1C", "8C", "6C", "3H", "8H", "4H", "2C", "2H", "3C", "1H", "4C", "7H"]
      // ["7H", "1C", "5H", "6C", "2C", "4C", "2H", "1H", "7C", "8C", "4H", "3H", "6H", "3C", "5C", "8H"]
      // ["5H", "7H", "4C", "8C", "2H", "8H", "1H", "7C", "6C", "4H", "2C", "3H", "6H", "3C", "5C", "1C"]
      // ["4H", "2C", "7H", "6H", "8C", "3C", "8H", "2H", "3H", "4C", "7C", "1H", "5H", "5C", "1C", "6C"]
      // ["6H", "1C", "3C", "7H", "6C", "5H", "8C", "2C", "1H", "4H", "2H", "7C", "3H", "5C", "4C", "8H"]

      card_value.sort(function() { return Math.round(Math.random()) - 0.5; }); 
      console.log(card_value);
      for(i=0; i < 16; i++) {
        (function(idx) {
          setTimeout(function() { moveToPlace(idx); }, idx * 100);
        })(i);
      }
      started = true;
    }
  };  

  var hideCard = function(id) // turn card face down 
  {
    cards[id].firstChild.src = "images/cards/back.png";
    with(cards[id].style) {
      WebkitTransform = MozTransform = OTransform = msTransform = "scale(1.0) rotate(180deg)";
    }
  };

  var moveToPack = function(id) // move card to pack
  {
    hideCard(id);
    cards[id].matched = true;
    with(cards[id].style) {
      zIndex = "1000";
      top = "100px";
      left = "-140px";
      WebkitTransform = MozTransform = OTransform = msTransform = "rotate(0deg)";
      zIndex = "0";
    }
  };

  var moveToPlace = function(id) // deal card
  {
    cards[id].matched = false;   
    cards[id].style["z-index"] = "1000";
    cards[id].style["top"] = cards[id].fromtop + "px";
    cards[id].style['left'] = cards[id].fromleft + "px";
    cards[id].style['WebkitTransform'] = MozTransform = OTransform = msTransform = "rotate(180deg)";
    cards[id].style["z-index"] = "0";
    /*with(cards[id].style) {
      zIndex = "1000";
      top = cards[id].fromtop + "px";
      left = cards[id].fromleft + "px";
      WebkitTransform = MozTransform = OTransform = msTransform = "rotate(180deg)";
      zIndex = "0";
    }*/
  };

  var showCard = function(id) // turn card face up, check for match
  {
    if(id === card1) return;
    if(cards[id].matched) return;

    cards[id].firstChild.src = "images/cards/" + card_value[id] + ".png";
    with(cards[id].style) {
      WebkitTransform = MozTransform = OTransform = msTransform = "scale(1.2) rotate(185deg)";
    } 
    if(card1 !== false) { 
      card2 = id;
      if(parseInt(card_value[card1]) == parseInt(card_value[card2])) { // match found
        (function(card1, card2) {
          setTimeout(function() { moveToPack(card1); moveToPack(card2); }, 1000);
        })(card1, card2);
        if(++matches_found == 8) { // game over, reset
          matches_found = 0;
          started = false;
        }
      } else { // no match
        (function(card1, card2) {
          setTimeout(function() { hideCard(card1); hideCard(card2); }, 800);
        })(card1, card2);
      }
      card1 = card2 = false;
    } else { // first card turned over
      card1 = id;
    }
  };



}
