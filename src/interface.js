const enemyLocation = {};

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
  console.log(' ');
  console.log('-----------------------------------------------------------');
  console.log(' ');

};

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

export { createGrid, printGrid, placeCharacter, getRandomInt, placeRandomCharacter, attack, drawBreak, Log, log };