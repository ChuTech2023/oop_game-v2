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
    startGame() {
       const overlay = document.querySelector('.overlay');
       overlay.style.display = 'none';
       this.activePhrase = this.getRandomPhrase();
       this.activePhrase.addPhraseToDisplay();
    }

    getRandomPhrase() {
        //created variable to retrive one of the phrases at random
        const randomIndex = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomIndex];
    }

    handleInteraction (button) {
        //created variable to retrive the text on each button 
      const guessLetter = button.innerText;
      if (this.activePhrase.checkLetter(guessLetter)) {
        button.classList.add('chosen');
        this.activePhrase.showMatchedLetter(guessLetter);
        if (this.checkForWin()) {
            this.gameOver();
        }

      } else {
        button.classList.add('wrong');
        this.removeLife();
      }
    }
}