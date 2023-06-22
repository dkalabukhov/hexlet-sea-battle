import readlineSync from 'readline-sync';
import { exec } from 'child_process';
import { createGrid, printGrid, placeCharacter, getRandomInt, placeRandomCharacter, attack, drawBreak, Log, log } from './interface.js';


const seaBattleGame = () => {
    console.log(' ');
    log(Log.bg.blue, '///////////////////////////////////////////////////////////');
    log(Log.bg.blue, '//////////////// М О Р С К О Й   Б О Й ////////////////////');
    log(Log.bg.blue, '///////////////////////////////////////////////////////////');
    log(Log.bg.blue, '///////////////////// версия 0.9 /////////////////////////');
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

    // Музыка

    exec('cvlc src/Pirate.mp3 --play-and-exit', () => { });

    // Переменные
    const gridSize = readlineSync.question('Введите размер поля боя от 4 до 10: ', { limit: [4, 5, 6, 7, 8, 9, 10], limitMessage: 'Введено неверное значение. Повторите ввод: ' });
    const myGrid = createGrid(gridSize);
    const enemyGrid = createGrid(gridSize);
    const shipsCount = readlineSync.question('Введите количество кораблей: ');
    let myShips = shipsCount;
    let enemyShips = shipsCount;
    const enemyLocation = {};
    const allowedCoordinates = Array.from({length: gridSize}, (_, index) => index);


    console.log(' ');
    console.log('-----------------------------------------------------------');
    console.log(' ');


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


    
    console.log(' ');
    console.log('-----------------------------------------------------------');
    console.log(' ');


    console.log('Ваши корабли:');
    printGrid(myGrid);
}



console.log('-----------------------------------------------------------');
console.log(' ');
console.log("Let's battle begin!!!");
console.log(' ');
console.log(' ');


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