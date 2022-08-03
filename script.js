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

const wordLetters = [];
const rightLettersUsed = new Set();
let isPlaying;

// Choose a random Word from the array
const chooseRandomWord = () => {
  isPlaying = true;
  const randomNum = Math.floor(Math.random() * words.length);
  return words[randomNum];
};

const chosenRandomWord = chooseRandomWord();

//Create the UI for the Word
const createUnderscoresEl = () => {
  const wordField = document.querySelector('.word-field');
  for (const letter of chosenRandomWord) {
    const createListEl = wordField.appendChild(document.createElement('li'));
    createListEl.classList.add('letter');
    wordLetters.push(letter);
  }
};

createUnderscoresEl();
const lettersUnique = new Set(wordLetters);
// console.log(wordLetters);
//Change heart colors when wrong
const heartIcons = document.querySelectorAll('.lifes svg > path');
let totalHeartnumbers = heartIcons.length - 1;

const removeHearts = () => {
  heartIcons[totalHeartnumbers].style.fill = '#393b45';
  totalHeartnumbers--;
};

//Show if the letter that was pressed is right
document.addEventListener('keydown', (e) => {
  const listEL = document.querySelectorAll('.word-field li');
  const errorMessage = document.querySelector('.message');

  let hasLetter = false;
  //If word contains letter
  if (isPlaying) {
    errorMessage.classList.add('show');
    if (wordLetters.join('').includes(e.key)) {
      rightLettersUsed.add(e.key);
      for (const [index, letter] of wordLetters.entries()) {
        if (e.key === letter) {
          listEL[index].innerHTML = e.key;
          listEL[index].classList.add('show');
          errorMessage.innerHTML = `Congrats letter ${e.key} is included!`;
          hasLetter = true;
        }
      }
    }
  }
  //If unique characters are equal to the used ones : WIN
  if (rightLettersUsed.size === lettersUnique.size) {
    errorMessage.innerHTML = `Congratulations you won!`;
    errorMessage.classList.add('win');
    isPlaying = false;
  }

  if (isPlaying) {
    if (!hasLetter) {
      errorMessage.innerHTML = `Oops the letter you chose is not included, guess again!`;
      hasLetter = false;
      removeHearts();
    }
  }
  //Check if user lost the game
  if (totalHeartnumbers < 0) {
    errorMessage.innerHTML = `Sorry you lost!`;
    errorMessage.classList.add('lose');
    isPlaying = false;
  }
});
