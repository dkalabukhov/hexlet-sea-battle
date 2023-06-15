const enemyLocation = {};

const createGrid = (size) => {
    const grid = [];
    for (let i = 0; i < size; i += 1) {
      grid[i] = [];
      for (let j = 0; j < size; j += 1) {
        grid[i][j] = '~';   ////////////////////////////////////
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

  export { createGrid, printGrid, placeCharacter, getRandomInt, placeRandomCharacter, attack, drawBreak };
