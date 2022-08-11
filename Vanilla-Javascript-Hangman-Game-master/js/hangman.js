var programming_languages = [
  'python',
  'javascript',
  'mongodb',
  'json',
  'java',
  'html',
  'css',
  'c',
  'csharp',
  'golang',
  'kotlin',
  'php',
  'sql',
  'ruby',
];

let answer = '';
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
// let wordStatus = null;
let wordStatus;

document.getElementById('maxWrong').innerHTML = maxWrong;

//Generate the buttons via javascript
const generateButtons = () => {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'
    .split('')
    .map(
      (letter) =>
        `<button
        class="btn btn-lg btn-primary m-2"
        id='` +
        letter +
        `'
         onClick="handleGuess('` +
        letter +
        `')
        "
      >
          ` +
        letter +
        `
      </button>`
    )
    .join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
};

//Get random word from the array
function randomWord() {
  answer =
    programming_languages[
      Math.floor(Math.random() * programming_languages.length)
    ];
  console.log(answer);
}

//Update picture
const updateHangmanPicture = () => {
  document.getElementById('hangmanPic').src = './images/' + mistakes + '.jpg';
};

//Update mistakes UI
const updateMistakes = () => {
  document.getElementById('mistakes').innerHTML = mistakes;
};

//Check if game Won
const checkIfGameWon = () => {
  if (wordStatus === answer) {
    document.getElementById('keyboard').innerHTML = 'You Won! :)';
  }
};

//Check if game Lost
const checkIfGameLost = () => {
  if (mistakes === maxWrong) {
    document.getElementById(
      'wordSpotlight'
    ).innerHTML = `The answer was : ${answer}`;

    document.getElementById('keyboard').innerHTML = 'You Lost! :(';
  }
};

//Checks each letter if it exists if not _
function guessWord() {
  wordStatus = answer
    .split('')
    // //>= is used to get a true of false value [index >= 0]
    .map((letter) => (guessed.indexOf(letter) >= 0 ? letter : ' _ '))
    .join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

//If letter exists then show else do nothing => disable btn
const handleGuess = (chosenLetter) => {
  guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);
  if (answer.indexOf(chosenLetter) >= 0) {
    guessWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) === -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
    console.log(answer.indexOf(chosenLetter));
  }
};

const reset = () => {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = './images/0.jpg';
  randomWord();
  guessWord();
  updateMistakes();
  generateButtons();
};

generateButtons();
randomWord();
guessWord();
