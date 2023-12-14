/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

//step 2
// Generate phrases for the game
class Game {
    constructor() {
        //start from 0, because its counts how many times I've missed
        this.missed = 0;
        //phrase property to store array of phrases
        //each phrase is an instance of phrase class
        this.phrases = [
            new Phrase('Hello World'),
            new Phrase('Have a wonderful day'),
            new Phrase('Smile you are on camera'),
            new Phrase('Somebody loves you'),
            new Phrase('You are awesome'),
            new Phrase('Your best is good enough'),
            new Phrase('The sun will come out')

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

    //retrieves a phrase randomly
    getRandomPhrase() {
        //created variable to retrieve one of the phrases at random
        const randomIndex = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomIndex];
    }

    //matches chosen letter in each phrase and check if I won
    handleInteraction(button) {
        //created variable to retrieve the text on each button 
        const guessLetter = button.innerText;
        if (this.activePhrase.checkLetter(guessLetter)) {
            button.classList.add('chosen');
            this.activePhrase.showMatchedLetter(guessLetter);
            if (this.checkForWin()) {
                setTimeout(() => {
                    this.gameOver(true);
                }, 1600);
            }

        } else {
            button.classList.add('wrong');
            this.removeLife();
        }
    }

    //removes life each time a wrong character is chosen and the missed property incremenated
    removeLife() {
        //select all the liveheart img
        const hearts = document.querySelectorAll('.tries img');
        this.missed++
        //added audio for each heart lost
        if (this.missed >= 5) {
            this.gameOver(false);
        } else {
            hearts[this.missed - 1].src = 'images/lostHeart.png';
        }
        this.playSound();
    }

    //play sound method containing audio for lost hearts and game over
    playSound() {
        let audioElement;
        if (this.missed === 1) {
            audioElement = new Audio("../audio/4-hearts.mp3");
        } else if (this.missed === 2) {
            audioElement = new Audio("../audio/3-hearts.mp3");
        } else if (this.missed === 3) {
            audioElement = new Audio("../audio/2-hearts.mp3");
        } else if (this.missed === 4) {
            audioElement = new Audio("../audio/1-heart.mp3");
        } else {
            audioElement = new Audio("../audio/Game-over.mp3");
        }
        audioElement.play();
    }

    //checks if all the letters are revealed
    checkForWin() {
        const phraseLetters = document.querySelectorAll('.hide');
        if (phraseLetters.length <= 0) {
            return true;
        } else {
            return false;
        }
    }

    //ends the game and the display a win/loss message, and resets the game
    gameOver(outcome) {
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
    resetGame() {
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