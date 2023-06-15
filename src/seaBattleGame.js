import readlineSync from 'readline-sync';
import { createGrid, printGrid, placeCharacter, getRandomInt, placeRandomCharacter, attack, drawBreak } from './interface.js';

const seaBattleGame = () => {
    console.log(' ');
    console.log('///////////////////////////////////////////////////////////');
    console.log('//////////////// М О Р С К О Й   Б О Й ////////////////////');
    console.log('///////////////////////////////////////////////////////////');
    console.log('///////////////////// версия 0.2 //////////////////////////');
    console.log('///////////////////////////////////////////////////////////');

    console.log(' ');
    console.log('-----------------------------------------------------------');
    console.log(' ');


    const gridSize = readlineSync.question('Введите размер поля боя: ');
    const myGrid = createGrid(gridSize);
    const enemyGrid = createGrid(gridSize);
    const shipsCount = readlineSync.question('Введите количество кораблей: ');
    let myShips = shipsCount;
    let enemyShips = shipsCount;
    console.log(' ');
    console.log('-----------------------------------------------------------');
    console.log(' ');

    for (let i = 1; i <= myShips; i += 1) {
        if (i === 1) {
          console.log('Расстановка Ваших кораблей по полю:');
          printGrid(myGrid);
        }
        let x = readlineSync.question(`Введите координату по оси X для ${i}-го корабля: `);
        if (x >= gridSize) {
          let x = readlineSync.question('Введенная координата выходит за поле боя. Повторите ввод: ');
        }
        let y = readlineSync.question(`Введите координату по оси Y для ${i}-го корабля: `);
        if (y >= gridSize) {
          let y = readlineSync.question('Введенная координата выходит за поле боя. Повторите ввод: ');
        }
        placeCharacter(x, y, 'O', myGrid);
        placeRandomCharacter('O', enemyGrid, gridSize);

        console.log(' ');
        console.log('-----------------------------------------------------------');
        console.log(' ');

        console.log('Расстановка Ваших кораблей по полю:');
        printGrid(myGrid);
    };
      
    console.log('-----------------------------------------------------------');
    console.log(' ');
    console.log("Let's battle begin!!!");
    

    // Цикл запуска игры
    while (enemyShips > 0 && myShips > 0) {
        console.log(' ');
        console.log('Делайте выстрел');
        printGrid(enemyGrid, true);
        let x = readlineSync.question('Введите координату X для выстрела: ');
        if (x >= gridSize) {
          let x = readlineSync.question('Введенная координата выходит за поле боя. Повторите ввод: ');
        }
        let y = readlineSync.question('Введите координату Y для выстрела: ');
        if (y >= gridSize) {
          let y = readlineSync.question('Введенная координата выходит за поле боя. Повторите ввод: ')
        }
      
        if (attack(x, y, enemyGrid)) {
          enemyShips -= 1;
        }
      
        x = getRandomInt(gridSize);
        y = getRandomInt(gridSize);
        if (enemyShips > 0 && attack(x, y, myGrid)) {
          myShips -= 1;
        }

        console.log(' ');
        console.log('-----------------------------------------------------------');
        console.log(' ');
      
        console.log('Попадание по кораблям противника');
        printGrid(enemyGrid, true);
        console.log(' ');
        console.log('Попадание по Вашим кораблям');
        printGrid(myGrid);
        drawBreak();
        console.log(' ');
    }
      
    if (myShips < enemyShips) {
        console.log('Вы проиграли!');
    } else {
        console.log('Победа!');
    }   
};

export default seaBattleGame;
