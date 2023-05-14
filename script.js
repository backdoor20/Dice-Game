"use strict";

const btnRoll = document.querySelector(".btn--roll");
const dice = document.querySelector(".dice");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

let currentScore, currentPlayer, score, isGameOn;

const init = function () {
  dice.classList.add("hidden");
  currentScore = 0;
  currentPlayer = 0;
  score = [0, 0];
  document.querySelector(`#score--0`).textContent = currentScore;
  document.querySelector(`#score--1`).textContent = currentScore;
  document.querySelector(`#current--0`).textContent = currentScore;
  document.querySelector(`#current--1`).textContent = currentScore;
  document.querySelector(`.player--0`).classList.remove("player--winner");
  document.querySelector(`.player--1`).classList.remove("player--winner");
  btnHold.classList.remove("hidden");
  btnRoll.classList.remove("hidden");
  isGameOn = true;
};

const gameCompleted = function () {
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add("player--winner");
  document.querySelector(`.dice`).classList.add("hidden");
  btnHold.classList.add("hidden");
  btnRoll.classList.add("hidden");
  isGameOn = false;
};

const swicthPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${currentPlayer}`).textContent =
    currentScore;
  currentPlayer = currentPlayer == 0 ? 1 : 0;
};

init();
btnRoll.addEventListener("click", function () {
  if (isGameOn) {
    // 1. Roll the dice
    const diceCount = Math.trunc(Math.random() * 6) + 1;
    // 2. show the dice
    dice.src = `dice-${diceCount}.png`;
    dice.classList.remove("hidden");

    if (diceCount != 1) {
      //1. Add the diceCoun to the current score
      currentScore += diceCount;
      console.log(currentScore);
      console.log(currentPlayer);
      //2. Display the score on the borad
      document.querySelector(`#current--${currentPlayer}`).textContent =
        currentScore;
    } else {
      swicthPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (isGameOn) {
    score[currentPlayer] += currentScore;
    document.querySelector(`#score--${currentPlayer}`).textContent =
      score[currentPlayer];

    if (score[currentPlayer] >= 100) {
      gameCompleted();
    } else {
      swicthPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
