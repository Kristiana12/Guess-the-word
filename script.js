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

const repeatingWords = [];

// Choose a random Word from the array
const chooseRandomWord = () => {
  const randomNum = Math.floor(Math.random() * words.length);
  repeatingWords.push(words[randomNum]);
  return words[randomNum];
};

const chosenRandomWord = chooseRandomWord();

//Create the UI for the Word
const createLetterEl = () => {
  const wordField = document.querySelector('.word-field');
  for (const letter of chosenRandomWord) {
    const createListEl = wordField.appendChild(document.createElement('li'));
    createListEl.classList.add('letter');
    const createSpanEl = createListEl.appendChild(
      document.createElement('span')
    );
    createSpanEl.innerHTML = letter;
  }
};

//Show if the letter that was pressed is right
document.addEventListener('keydown', (e) => {
  const spanEL = document.querySelectorAll('.word-field span');
  const heartIcons = document.querySelectorAll('.lifes svg');
  const errorMessage = document.querySelector('.message-error');

  for (let i = 0; i < spanEL.length; i++) {
    if (spanEL[i].innerHTML === e.key) {
      spanEL[i].classList.add('show');
      errorMessage.classList.remove('show');
    }
  }

  // for (const [index, span] of spanEL.entries()) {
  //   console.log(span[index]);
  //   // if (span[index].innerHTML === e.key) {
  //   //   span.classList.add('show');
  //   //   errorMessage.classList.remove('show');
  //   // } else {
  //   //   errorMessage.classList.add('show');
  //   // }
  // }
});

createLetterEl();
console.log(repeatingWords);
