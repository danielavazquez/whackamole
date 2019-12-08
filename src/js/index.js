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