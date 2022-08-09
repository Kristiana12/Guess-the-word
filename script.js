const words = [
  'elephant',
  'tiger',
  'cat',
  'dog',
  'leopard',
  'gorilla',
  'ape',
  'whale',
  'fish',
  'shark',
  'ant',
  'wolf',
  'horse',
  'cow',
  'lion',
  'snake',
  'panda',
  'cricket',
  'bear',
  'giraffe',
  'turtle',
  'deer',
];

let isPlaying;
let totalHeartnumbers;
let wordLetters;

let lettersUnique;
let rightLettersUsed;

const wordField = document.querySelector('.word-field');
const heartIcons = document.querySelectorAll('.lifes svg > path');
const message = document.querySelector('.message');
const resetBtn = document.querySelector('.reset');

//Remove styles and Text when user wins or loses or presses reset
const resetTextAndStyles = () => {
  wordLetters = [];
  message.innerHTML = '&nbsp;';
  message.classList.remove('win');
  message.classList.remove('lose');
  wordField.innerHTML = '';
  heartIcons.forEach((heart) => (heart.style.fill = '#E53328'));
  totalHeartnumbers = heartIcons.length - 1;
};

//Change heart colors when wrong
const removeHearts = () => {
  heartIcons[totalHeartnumbers].style.fill = '#393b45';
  totalHeartnumbers -= 1;
};

const init = () => {
  resetTextAndStyles();

  // Choose a random Word from the array
  const chooseRandomWord = () => {
    isPlaying = true;
    const randomNumber = Math.floor(Math.random() * words.length);
    return words[randomNumber];
  };

  //  Create the UI for the Word
  const createUnderscoresEl = () => {
    for (const letter of chooseRandomWord()) {
      const createListEl = wordField.appendChild(document.createElement('li'));
      createListEl.classList.add('letter');
      wordLetters.push(letter);
    }
  };
  createUnderscoresEl();

  lettersUnique = new Set(wordLetters);
  rightLettersUsed = new Set();
  console.log(wordLetters);

  // console.log(rightLettersUsed);
  // console.log(lettersUnique);

  //Show if the letter that was pressed is right
  document.addEventListener('keydown', (e) => {
    const listEL = document.querySelectorAll('.word-field li');

    let hasLetter = false;
    //If word contains letter
    if (isPlaying) {
      message.classList.add('show');
      if (wordLetters.join('').includes(e.key)) {
        rightLettersUsed.add(e.key);
        for (const [index, letter] of wordLetters.entries()) {
          if (e.key === letter) {
            listEL[index].innerHTML = e.key;
            listEL[index].classList.add('show');
            message.innerHTML = `Congrats letter "${e.key}" is included!`;
            hasLetter = true;
          }
        }
      }
    }
    //If unique characters are equal to the used ones : WIN THE GAME
    if (rightLettersUsed.size === lettersUnique.sized) {
      message.innerHTML = `Congratulations you won!`;
      message.classList.add('win');
      isPlaying = false;
      rightLettersUsed.clear();
      lettersUnique.clear();
    }

    if (isPlaying) {
      if (!hasLetter) {
        message.innerHTML = `Oops the letter "${e.key}" is not included, guess again!`;
        removeHearts();
        console.log(totalHeartnumbers);
        hasLetter = false;
      }
    }
    //Check if user lost the game
    if (totalHeartnumbers < 0) {
      message.innerHTML = `Sorry you lost!`;
      message.classList.add('lose');
      isPlaying = false;
      rightLettersUsed.clear();
      lettersUnique.clear();
    }
  });
};

init();

resetBtn.addEventListener('click', init);
