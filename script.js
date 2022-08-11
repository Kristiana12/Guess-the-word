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

let answer;
let playersWordStatus = null;
let guessed = [];
let heartsNumber = 10;
let isPlaying = true;

const resetBtn = document.querySelector('.reset');
const wordField = document.querySelector('.word-field');
const message = document.querySelector('.message');
const messageLettersUsed = document.querySelector('.bottom-message');
const heartIcons = document.querySelectorAll('.lifes svg > path');

// Choose a random Word from the array
const chooseRandomWord = () => {
  answer = words[Math.floor(Math.random() * words.length)];
};

// Create the UI for the word or show letter if guessed right
const answerUI = () => {
  playersWordStatus = answer
    .split('')
    .map((letter) => (guessed.indexOf(letter) >= 0 ? letter : ' _ '))
    .join('');

  wordField.innerHTML = playersWordStatus;
};

//Check if won
const checkIfWon = () => {
  if (answer === playersWordStatus) {
    message.classList.add('show');
    message.classList.add('win');
    message.innerHTML = `Congratulations you won!`;
    isPlaying = false;
  }
};

//Remove Hearts
const removeHearts = () => {
  heartsNumber--;
  heartIcons[heartsNumber].style.fill = '#393b45';
  console.log(heartsNumber);
};

//Check if lost
const checkIfLost = (chosenLetter) => {
  if (
    !guessed.slice(0, guessed.length - 1).includes(chosenLetter) &&
    !answer.includes(chosenLetter)
  ) {
    removeHearts();
  }

  if (heartsNumber === 0) {
    message.classList.add('show');
    message.classList.add('lose');
    message.innerHTML = `Sorry, you lost! The correct word was "${answer}"`;
    isPlaying = false;
  }
  isPlaying = false;
};

//Push all used letters
const playersChosenLetter = (chosenLetter) => {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  //Show already used letters UI

  messageLettersUsed.innerHTML = `Letters already used: ${guessed}`;
  messageLettersUsed.classList.add('show');

  answerUI();
};

if (isPlaying) {
  chooseRandomWord();
  answerUI();
}

if (isPlaying) {
  document.addEventListener('keydown', function (e) {
    //enable only letters - true
    if (/[a-z]/i.test(e.key)) {
      message.classList.remove('show');
      playersChosenLetter(e.key);
      checkIfLost(e.key);
      checkIfWon();
    } else {
      message.classList.add('show');
      message.innerHTML = 'Please select a letter';
    }
  });
}

const reset = () => {
  playersWordStatus = null;
  guessed = [];
  heartsNumber = 10;
  isPlaying = true;
  message.classList.remove('show');
  messageLettersUsed.classList.remove('show');
  message.classList.remove('win');
  message.classList.remove('lose');

  heartIcons.forEach((heart) => (heart.style.fill = '#E53328'));

  chooseRandomWord();
  answerUI();
};

resetBtn.addEventListener('click', reset);

// INITIAL SOLUTION *with new Set()*

// let isPlaying;
// let totalHeartnumbers;
// let wordLetters;

// let lettersUnique;
// let rightLettersUsed;

// const wordField = document.querySelector('.word-field');
// const heartIcons = document.querySelectorAll('.lifes svg > path');
// const message = document.querySelector('.message');
// const resetBtn = document.querySelector('.reset');

// //Remove styles and Text when user wins or loses or presses reset
// const resetTextAndStyles = () => {
//   wordLetters = [];
//   message.innerHTML = '&nbsp;';
//   message.classList.remove('win');
//   message.classList.remove('lose');
//   wordField.innerHTML = '';
//   heartIcons.forEach((heart) => (heart.style.fill = '#E53328'));
//   totalHeartnumbers = heartIcons.length - 1;
// };

// //Change heart colors when wrong
// const removeHearts = () => {
//   heartIcons[totalHeartnumbers].style.fill = '#393b45';
//   totalHeartnumbers -= 1;
// };

// const init = () => {
//   resetTextAndStyles();

//   // Choose a random Word from the array
//   const chooseRandomWord = () => {
//     isPlaying = true;
//     const randomNumber = Math.floor(Math.random() * words.length);
//     return words[randomNumber];
//   };

//   //  Create the UI for the Word
//   const createUnderscoresEl = () => {
//     for (const letter of chooseRandomWord()) {
//       const createListEl = wordField.appendChild(document.createElement('li'));
//       createListEl.classList.add('letter');
//       wordLetters.push(letter);
//     }
//   };
//   createUnderscoresEl();

//   lettersUnique = new Set(wordLetters);
//   rightLettersUsed = new Set();
//   // console.log(wordLetters);

//   // console.log(rightLettersUsed);
//   // console.log(lettersUnique);

//   //Show if the letter that was pressed is right
//   document.addEventListener('keydown', (e) => {
//     const listEL = document.querySelectorAll('.word-field li');

//     let hasLetter = false;
//     //If word contains letter
//     if (isPlaying) {
//       message.classList.add('show');
//       if (wordLetters.join('').includes(e.key)) {
//         rightLettersUsed.add(e.key);
//         for (const [index, letter] of wordLetters.entries()) {
//           if (e.key === letter) {
//             listEL[index].innerHTML = e.key;
//             listEL[index].classList.add('show');
//             message.innerHTML = `Congrats letter "${e.key}" is included!`;
//             hasLetter = true;
//           }
//         }
//       }
//     }
//     //If unique characters are equal to the used ones : WIN THE GAME
//     if (rightLettersUsed.size === lettersUnique.size) {
//       message.innerHTML = `Congratulations you won!`;
//       message.classList.add('win');
//       isPlaying = false;
//       rightLettersUsed.clear();
//       lettersUnique.clear();
//     }

//     if (isPlaying) {
//       if (!hasLetter) {
//         message.innerHTML = `Oops the letter "${e.key}" is not included, guess again!`;
//         removeHearts();
//         hasLetter = false;
//       }
//     }
//     //Check if user lost the game
//     if (totalHeartnumbers < 0) {
//       message.innerHTML = `Sorry you lost!`;
//       message.classList.add('lose');
//       isPlaying = false;
//       rightLettersUsed.clear();
//       lettersUnique.clear();
//     }
//   });
// };

// init();

// resetBtn.addEventListener('click', init);
