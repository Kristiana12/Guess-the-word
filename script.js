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

const chooseRandomWord = () => {
  const randomNum = Math.floor(Math.random() * words.length);
  repeatingWords.push(words[randomNum]);
  console.log(words[randomNum]);
};

const createLetterEl = () => {
  const wordField = document.querySelector('.word-field');
  wordField.appendChild(document.createElement('span'));
};

createLetterEl();
chooseRandomWord();
console.log(repeatingWords);
