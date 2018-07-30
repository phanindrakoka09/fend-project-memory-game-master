/*
 * Create a list that holds all of your cards
 */
const icons = ["fa fa-diamond" , "fa fa-diamond" , "fa fa-paper-plane-o" , 
               "fa fa-paper-plane-o" , "fa fa-anchor" , 
               "fa fa-anchor" , 
               "fa fa-bolt" , "fa fa-bolt" , 
               "fa fa-cube" , "fa fa-cube" , "fa fa-leaf" , 
               "fa fa-leaf" , "fa fa-bicycle" , "fa fa-bicycle" , 
               "fa fa-bomb" , "fa fa-bomb"];

/*
* Create cards
*/

const cardsContainer = document.querySelector(".deck");
let openedCards = [];
let matchedCards = [];

//This will start the game  

function init (){

    let openedCards = shuffle(icons);
    openedCards = [];
    for (let i = 0; i < icons.length; i++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<i class = "${icons[i]}"></i>`;
        cardsContainer.appendChild(card);
        click(card);
    } 

}
//End of this will start the game 

//Click event

function click (card){  
    //Card click event 
    card.addEventListener("click" , function () {
        const currentCard = this;
        const previousCard = openedCards[0];
        //We have an existing opened card
    if (openedCards.length === 1 ) {
            
            
            card.classList.add("open" , "show" , "disable")
            openedCards.push(this);

        //We should compare our   2 opened card
        if(currentCard.innerHTML === previousCard.innerHTML){
            //Matched
          currentCard.classList.add("match")
          previousCard.classList.add("match")

          matchedCards.push(currentCard,previousCard);
        openedCards = [];

            //Check if the game is over
            isOver();

        //Here we dont have an opened card 
        }else {

            //Wait 500ms then do this 
            setTimeout (function(){
                currentCard.classList.remove("open" , "show", "disable");
           previousCard.classList.remove("open" , "show" , "disable");

            }, 500);

          openedCards = [];
          addMove();
        }

        }else {

        currentCard.classList.add("open" , "show", "disable")
         openedCards.push(this);
 
        }
      
    });
    

}

//Add moves 
const movesContainer = document.querySelector(".moves"); 
let moves = 0;  
movesContainer.innerHTML = 0

function addMove(){
    moves++;
    movesContainer.innerHTML = moves;
    //End of adding moves 

//rating 
rating();
}


//Reset button 

const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click" , function () {
    //Delete all cards 
    cardsContainer.innerHTML = "";
    //Call init to create new cards 
    init ();
    //Reset new related variables 
    matchedCards = [];
    moves=0;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`;
    //Create new cards 
})
//rating

const starsContainer = document.querySelector(".stars");
function rating (){
    if (moves > 5 ){
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>`
    }else if(moves >10) {
        starsContainer.innerHTML = ``
        

    }
}


//Game over function

function isOver(){
    if (matchedCards.length === icons.length){
        alert("game over!")
    }
}

//Start the game for the first time 
init();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
