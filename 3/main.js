import Player from './player.js';
import EnemyController from './enemy-controller.js';
import BulletController from './bullet-controller.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = 'resources/space.png'

const enemyBulletController = new BulletController(canvas, 4, 'white');
const playerBulletController = new BulletController(canvas, 15, 'red');

const enemyController = new EnemyController(canvas, enemyBulletController, playerBulletController);
const player = new Player(canvas, 3, playerBulletController);

let isGameOver = false;
let isGameWin = false;


function game() {
    checkGameOver();
    ctx.drawImage(background, 0 , 0, canvas.width, canvas.height);
    displayGameOver();
    if (!isGameOver) {
        enemyController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        enemyBulletController.draw(ctx);
    }
}


function checkGameOver() {
    if (isGameOver) {
        return;
    }

    if (enemyBulletController.collideWith(player)) {
        isGameOver = true;
    }

    if (enemyController.collideWith(player)) {
        isGameOver = true;
    }

    if (enemyController.enemyRows.length === 0) {
        isGameWin = true;
        isGameOver = true;
    }
}

function displayGameOver() {
    if (isGameOver) {
        let text = isGameWin ? 'You win!' : 'Game over!';
        let textOffset = isGameWin ? 3.5 : 5;

        ctx.fillStyle = 'white';
        ctx.font = '70px Arial';
        ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
    }
}



setInterval(game, 1000/60);


// let canvas
// let ctx //uchwyt kontekstu tkaniny pozwalający naoperowanie na niej
// let pos_x = 320, pos_y = 300 //zmienne pozycji bohatera 
// let welcome_screen = true //stan ekranu powitalnego

// /*** funkcja rysująca bohatera na tkaninie */
// function draw_hero() {
//     ctx.save() // zachowanie stanu kontekstu
//     ctx.fillStyle = 'rgba(255,0,0,1)'; // ustawienie koloru wypełnienia 
//     ctx.translate(pos_x, pos_y) // przesunięcie tkaniny tak, aby narysowany bohater znalazł się w odpowiednim miejscu 
//     ctx.fillRect(0, 0, 10, 30) // narysowanie bohatera
//     ctx.restore() // przywrócenie stanu kontekstu
// }

// /*** funkcja wywoływana cyklicznie przerysowująca tkaninę */
// function redraw() {
//     ctx.clearRect(0, 0, 640, 480) // czyszczenie tkaniny 
//     draw_hero()
// }
// /*** funkcja inicjalizująca grę i tworząca ekran powitalny */
// function init() {
//     window.addEventListener("keydown",keyListener,false) // skojarzenie funkcji obsługi klawiatury ze zdarzeniem
//     canvas = document.getElementById('game') // pobranie wskazania na element tkaniny
//     ctx = canvas.getContext('2d') // pobranie kontekstu grafiki dwuwymiarowej dla tkaniny
//     ctx.font = '48px sans-serif'
//     ctx.textAlign = 'center' // ustawienie dla tkaniny kroju pisma i sposobu wyrównania tekstu
//     ctx.fillText('READY PLAYER ONE?', 320, 240) // umieszczenie napisu na ekranie powitalnym 
//     draw_hero()
// }
// /*** funkcja obsługi klawiatury*/
// function keyListener(e) {
// if (welcome_screen) {
//     // jeżeli ekran powitalny to wyczyść 
//     ctx.clearRect(0,0,640,480)
//     welcome_screen = false
//     window.setInterval(redraw,10) // podłączenie funckji przerysowania tkaniny
// }
// switch(e.keyCode) {
//     case 37: // naciśnięto strzałkę w lewo 
//         pos_x -= 10 
//         break
//     case 38: // naciśnięto strzałkę w górę
//         pos_y += 10
//         break
//     case 39: // naciśnięto strzałkę w prawo 
//         pos_x += 10
//         break
//     case 40: // naciśnięto strzałkę w dół
//         pos_y -= 10
//         break
//     }
// }