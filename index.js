#!/usr/bin/env node
/* eslint no-restricted-syntax: ["off", "ForOfStatement"] */

import readlineSync from 'readline-sync';


const Log = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",
  // Foreground (text) colors
  fg: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    crimson: "\x1b[38m"
  },
  // Background colors
  bg: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
    crimson: "\x1b[48m"
  }
};

const log = (color, text) => {
  console.log(`${color}%s${Log.reset}`, text);
};

/*
log(Log.fg.red, "My text is red");
log(Log.bg.cyan, "My background is cyan");
*/



console.log(' ');
log(Log.bg.blue, '///////////////////////////////////////////////////////////');
log(Log.bg.blue, '//////////////// М О Р С К О Й   Б О Й ////////////////////');
log(Log.bg.blue, '///////////////////////////////////////////////////////////');
log(Log.bg.blue, '///////////////////// версия 0.41 /////////////////////////');
log(Log.bg.blue, '///////////////////////////////////////////////////////////');

console.log(' ');
console.log('-----------------------------------------------------------');
console.log(' ');


console.log('Игровые обозначения:');
console.log(' ');
console.log('\x1b[31m\u21AF\x1b[0m', ' - попадание');
console.log('\x1b[33m\u2716\x1b[0m', ' - промах');
console.log('\x1b[35m\u0394\x1b[0m', ' - Ваш корабль');
console.log('\x1b[36m\u2248\x1b[0m', ' - морская волна ("туман войны")');


console.log(' ');
console.log('-----------------------------------------------------------');
console.log(' ');


const createGrid = (size) => {
  const grid = [];
  for (let i = 0; i < size; i += 1) {
    grid[i] = [];
    for (let j = 0; j < size; j += 1) {
      grid[i][j] = '\x1b[36m\u2248\x1b[0m';                // vladybarvy - change symbol "-"
    }
  }

  return grid;
};

const createHeaders = (size) => {
  let result = '  ';
  for (let i = 0; i < size; i += 1) {
    result += `${i} `;
  }

  return result;
};

const printGrid = (grid, isEnemy = false) => {
  const headers = createHeaders(grid.length);
  console.log(headers);     
  for (let i = 0; i < grid.length; i += 1) {
    let rowStr = `${i} `;
    for (const cell of grid[i]) {
      if (isEnemy && cell === '\x1b[35m\u0394\x1b[0m') {    // vladybarvy - change symbol "O"
        rowStr += '\x1b[36m\u2248\x1b[0m ';                 // vladybarvy - change symbol "- "
      } else {
        rowStr += `${cell} `;
      }
    }
    console.log(rowStr);                    
  }
};

const placeCharacter = (x, y, character, grid) => {
  grid[y][x] = character;
};

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

const placeRandomCharacter = (character, grid, max) => {
  let didPlace = false;
  while (!didPlace) {
    let x = getRandomInt(max);
    let y = getRandomInt(max);
    if (!enemyLocation[`${x}-${y}`]) {
      placeCharacter(x, y, character, grid);
      didPlace = true;
      enemyLocation[`${x}-${y}`] = true;
    }
  }
};

const attack = (x, y, grid) => {
  if (grid[y][x] === '\x1b[35m\u0394\x1b[0m') {              // vladybarvy - change symbol "O"
    grid[y][x] = '\x1b[31m\u21AF\x1b[0m';                    // vladybarvy - change symbol "!"     
    return true;
  } else if (grid[y][x] === '\x1b[36m\u2248\x1b[0m') {       // vladybarvy - change symbol "-"
    grid[y][x] = '\x1b[33m\u2716\x1b[0m';                    //  vladybarvy - change symbol "x"
    return false;
  } else {
    return false;
  }
};

const drawBreak = () => {
  console.log('-----------------------------');
};


// Переменные
const gridSize = readlineSync.question('Введите размер поля боя от 4 до 10: ', { limit: [4, 5, 6, 7, 8, 9, 10], limitMessage: 'Введено неверное значение. Повторите ввод: ' });
const myGrid = createGrid(gridSize);
const enemyGrid = createGrid(gridSize);
const shipsCount = readlineSync.question('Введите количество кораблей: ');
let myShips = shipsCount;
let enemyShips = shipsCount;
const enemyLocation = {};
const allowedCoordinates = Array.from({length: gridSize}, (_, index) => index);

for (let i = 1; i <= myShips; i += 1) {
  if (i === 1) {
    console.log('Ваши корабли:');   
    
    printGrid(myGrid);
  }
  let x = readlineSync.question(`Введите координату от 0 до ${gridSize - 1} по оси X для ${i}-го корабля: `, { limit: allowedCoordinates, limitMessage: 'Введено неверное значение. Повторите ввод: ' });
  /* if (x >= gridSize) {
    let x = readlineSync.question('Введенная координата выходит за поле боя. Повторите ввод: ');
  } */
  let y = readlineSync.question(`Введите координату от 0 до ${gridSize - 1} по оси Y для ${i}-го корабля: `, { limit: allowedCoordinates, limitMessage: 'Введено неверное значение. Повторите ввод: ' });
  /* if (y >= gridSize) {
    let y = readlineSync.question('Введенная координата выходит за поле боя. Повторите ввод: ');
  } */
  console.clear();
  placeCharacter(x, y, '\x1b[35m\u0394\x1b[0m', myGrid);                    // vladybarvy - change symbol "O"
  placeRandomCharacter('\x1b[35m\u0394\x1b[0m', enemyGrid, gridSize);       // vladybarvy - change symbol "O"

  console.log('Ваши корабли:');
  printGrid(myGrid);
}

// Цикл запуска игры
while (enemyShips > 0 && myShips > 0) {
  console.log('Делайте выстрел');
  printGrid(enemyGrid, true);
  let x = readlineSync.question(`Введите координату от 0 до ${gridSize - 1} по оси X для выстрела: `, { limit: allowedCoordinates, limitMessage: 'Введено неверное значение. Повторите ввод: ' });
  /* if (x >= gridSize) {
    let x = readlineSync.question('Введенная координата выходит за поле боя. Повторите ввод: ');
  } */
  let y = readlineSync.question(`Введите координату от 0 до ${gridSize - 1} по оси Y для выстрела: `, { limit: allowedCoordinates, limitMessage: 'Введено неверное значение. Повторите ввод: ' });
  /* if (y >= gridSize) {
    let y = readlineSync.question('Введенная координата выходит за поле боя. Повторите ввод: ');
  } */
  console.clear();

  if (attack(x, y, enemyGrid)) {
    enemyShips -= 1;
  }

  x = getRandomInt(gridSize);
  y = getRandomInt(gridSize);
  if (enemyShips > 0 && attack(x, y, myGrid)) {
    myShips -= 1;
  }

  console.log('Корабли противника');
  printGrid(enemyGrid, true);
  console.log('Ваши корабли');
  printGrid(myGrid);
  drawBreak();
}

if (myShips < enemyShips) {
  console.log('Вы проиграли!');
} else {
  console.log('Победа!');
}

// изменение цвета конкретной строки, выводимой в консоль
//console.log('\x1b[36m%s\x1b[0m', 'I am cyan');  //cyan    // vladybarvy experiment
