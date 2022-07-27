'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


let scores, currentScore, activePlayer, playing;


// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceEl.classList.add('hidden')

  score0El.textContent = 0 
  score1El.textContent = 0
  current0El.textContent = 0
  current1El.textContent = 0

  player0El.classList.remove('player--winner')
  player1El.classList.remove('player--winner')
  player0El.classList.add('player--active')
  player1El.classList.remove('player--active')

  document.querySelector(`.winner-message--0`).classList.add('hidden')
  document.querySelector(`.winner-message--1`).classList.add('hidden')
}

init()

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0
  currentScore = 0
  activePlayer = activePlayer === 0 ? 1 : 0 ; 
  player0El.classList.toggle('player--active')
  player1El.classList.toggle('player--active')
}


const rollDice = () => {
  if(playing){
    const diceNumber = Math.trunc(Math.random() * 6) + 1 
    diceEl.classList.remove('hidden')
    diceEl.src = `dice-${diceNumber}.png`
  
    if(diceNumber !== 1){
        currentScore +=  diceNumber
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      //switch player 
      switchPlayer()  
    } 
  }
}


const holdScore = () => {
    if(playing){
    const finishScore = document.getElementById('scores-selector').value
    scores[activePlayer] += currentScore
    document.getElementById(`current--${activePlayer}`).textContent = scores[activePlayer]
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]

    if(scores[activePlayer] >= finishScore ){
        playing = false
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
        document.querySelector(`.winner-message--${activePlayer}`).classList.remove('hidden')
    }else {
      switchPlayer()
     }
   }
}

const newGame = () => {
  init()
}



btnRoll.addEventListener('click', rollDice)
btnHold.addEventListener('click', holdScore)
btnNew.addEventListener('click', newGame);
