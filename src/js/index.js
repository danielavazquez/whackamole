const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min); //picks random amount of time moles pop up for used in function peep
};

function randomHole(holes) { //holes is a node list that contains all holes, we hvave to find a random index
  const idx = Math.floor(Math.random() * holes.length); //picks random dirt hole moles come up off
  const hole = holes[idx];

  if (hole === lastHole) {
    // console.log('Ah nah thats the same one bud');
    // run the same function again..
    return randomHole(holes);
  }

  lastHole = hole;
  return hole;
}

//makes moles pop up
function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  // console.log(time, hole);

  hole.classList.add('up');   //after random amount of time (time variable) need to make them come back down
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => timeUp = true, 10000) //after 10 seconds we want to set our time variable to true and that makes them stop appearing
}

function bonk(e) { //when mole appears we need to bonk them on the head
  // console.log(e);
  if (!e.isTrusted) return; //is trusted so we don't fake click and win the game
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk)); //listens for a click on each of the moles


//STEP ONE: RANDOM TIME
//First we need a function to give us a random amount of time for the moles to pop up. This function also used in peep.
// function randomTime(min, max) {
//   return Math.round(Math.random() * (max - min) + min); }
//We use Math.round in order to give us a cleaner look in our console.

//STEP TWO: RANDOM HOLE
//Second we need a function that is going to pick a random hole for mole to pop up from
//It's going to take in a list of holes this is a get me random DOM element function
//holes is a node list that contains all six holes, if we console log randomHole(holes) we get 6
//function randomHole(holes){
//console.log(holes.length);
//}

//function randomHole(holes) { 
// const idx = Math.floor(Math.random() * holes.length); 
// const hole = holes[idx];
// ^ we need to find a random index between 0 and 5 so we use const = idx

//  if (hole === lastHole) {
// console.log('Ah nah thats the same one bud');
// run the same function again..
//return randomHole(holes);
//}
// ^ create this variable so we don't get holes repeated

//STEP THREE: MAKE MOLES POP UP
// function peep() {
//   const time = randomTime(200, 1000);
//   const hole = randomHole(holes);
// ^ use our randomTIme and randomHole functions 
// ^ we take the hole and add a random class of up that will trigger our CSS
// .hole.up.mole { top: 0; }

//after this random amount of time we need to remove this class up from random hole
// setTimeout(() => {
//   hole.classList.remove('up');
//   if (!timeUp) peep();
// }, time);
// once it's done we run peep(); again 
// we use our let timeUp = false;  to run and stop function
//if there is the variable time up continue if its not true it never starts again

//STEP FOUR: SET THE SCOREBOARD
// function startGame() {
//   scoreBoard.textContent = 0;
//   timeUp = false;
//   score = 0;
//   peep();
//   setTimeout(() => timeUp = true, 10000)
// }
//after ten seconds, the timeUp variable we set to false, we want to set it to true
//timeUp will we set to true, stops game after 10 seconds

//STEP FIVE: WHEN MOLE PEEPS, BONK ON HEAD
// function bonk(e) { 
//   if (!e.isTrusted) return; 
//   score++;
//   this.classList.remove('up');
//   scoreBoard.textContent = score;
// }
// ^function bonk takes event and will listen for a click on each of the moles
// we don't want to fake clicks and on all events have something called isTrusted
//If you fake clicking something it will say false and can add that

//if (!e.isTrusted) return;
// score++;
// this.classList.remove('up');
// scoreBoard.textContent = score;
// }
// ^ when someone clicks something give them some type of score
//if they smack them, we change the up class list


//Other things oyu can do, create an ultimate scorboard on local storage
//when someone comes back they can see reload the highest score or add levels