#!/usr/bin/env node
/* eslint no-restricted-syntax: ["off", "ForOfStatement"] */

import readlineSync from 'readline-sync';

const createGrid = (size) => {
  const grid = [];
  for (let i = 0; i < size; i += 1) {
    grid[i] = [];
    for (let j = 0; j < size; j += 1) {
      grid[i][j] = '-';
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
      if (isEnemy && cell === 'O') {
        rowStr += '- ';
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
  if (grid[y][x] === 'O') {
    grid[y][x] = '!';
    return true;
  } else if (grid[y][x] === '-') {
    grid[y][x] = 'x';
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
  placeCharacter(x, y, 'O', myGrid);
  placeRandomCharacter('O', enemyGrid, gridSize);

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
