/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

//step 2
// Generate phrasses for the game
class Game {
    constructor () {
        this.missed = 0;
        this.phrases = [
            new Phrase('Hello World'),
            new Phrase('Have a lovely day'),
            new Phrase('Smile you are on camera'),
            new Phrase('Somebody loves you'),
            new Phrase('You are a winner')
            
        ];
        
        this.activePhrase = null;
    }
    //hiding the overlay screen , then generate a random phrase and display phrase to the page
    startGame() {
       const overlay = document.querySelector('#overlay');
       overlay.style.display = 'none';
       this.activePhrase = this.getRandomPhrase();
       this.activePhrase.addPhraseToDisplay();
    }

    //retrives a phrase randomly
    getRandomPhrase() {
        //created variable to retrive one of the phrases at random
        const randomIndex = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomIndex];
    }

    //matches chosen letter in each phrase and check if I won
    handleInteraction (button) {
        //created variable to retrive the text on each button 
      const guessLetter = button.innerText;
      if (this.activePhrase.checkLetter(guessLetter)) {
        button.classList.add('chosen');
        this.activePhrase.showMatchedLetter(guessLetter);
        if (this.checkForWin()) {
            this.gameOver(true);
        }

      } else {
        button.classList.add('wrong');
        this.removeLife();
      }
    }

    //removes life each time a wrong character is chosen and the missed property incremenated
    removeLife () {
        //select all the liveheart img
       const hearts = document.querySelectorAll('.tries img');
       this.missed++
       if (this.missed >= 5) {
            this.gameOver(false);
       } else {
        hearts[this.missed - 1].src = 'images/lostHeart.png';
       }
    }

    //ckecks if all the letters are revealed
    checkForWin () {
        const phraseLetters = document.querySelectorAll('.hide');
        if (phraseLetters.length <= 0) {
            return true;
        } else {
            return false;
        }
    }

    //ends the game and the display a win/loss message, and resets the game
    gameOver (outcome) {
        const overlay = document.querySelector('#overlay');
        const gameOverMessage = document.querySelector('#game-over-message');
        overlay.style.display = 'block';
        overlay.classList.remove('start');
        if (outcome) {
           overlay.className = 'win';
           gameOverMessage.innerText = 'You are a winner!';
        } else {
           overlay.className = 'lose';
           gameOverMessage.innerText = 'Try Again!';
        }
        this.resetGame();
    }

    //step 4, reset the game by resetting missed to 0 
    resetGame () {
        document.querySelector('#phrase ul').innerHTML = '';
        const qwertyBtns = document.querySelectorAll('#qwerty button');
        qwertyBtns.forEach(btn => {
            btn.className = 'key';
            btn.disabled = false;
        });

        this.missed = 0;
        const hearts = document.querySelectorAll('.tries img');
        hearts.forEach(ht => {
            ht.src = 'images/liveHeart.png';
        })
        
    }
}