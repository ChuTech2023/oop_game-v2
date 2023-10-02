/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

//step 1 
class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    addPhraseToDisplay() {
        const phraseContainer = document.querySelector('#phrase ul');

        let lis = "";
        //loop to loop over phrase word
        for (const char of this.phrase) {
            if (char === " ") {
                lis += '<li class="space"> </li>';
            } else {
                // create a class with hidden class and the character
                lis += ` <li class="hide letter ${char}">${char}</li>`;
            }
        }
        phraseContainer.innerHTML = lis;
    }

    checkLetter(letter) {
        if (this.phrase.includes(letter)) {
            return true;
        } else {
            return false;
        }
    }

    showMatchedLetter(letter) {
        const letters = document.querySelectorAll('.hide'); 

        //loop to see which li contained a certain letter
        letters.forEach(li => {
            if (li.innerText === letter) {
                li.classList.add('show');
                li.classList.remove('hide');
            }
        });
    }
}

