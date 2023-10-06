/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

//step 3

const startBtn = document.querySelector('#btn__reset');

//instance of  game
const game = new Game();

//start the game 
startBtn.addEventListener('click', () => {
    game.startGame();
})

//add a click event to keyboard buttons to handle interactions
document.querySelector('#qwerty').addEventListener('click', (event) =>{
    if (event.target.className === 'key') {
      game.handleInteraction(event.target);  
    }
})