let board = ['', '', '',
             '', '', '',
             '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

let winOptions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const PLAYERX_WON = 'PLAYERX_WON';
const PLAYERO_WON = 'PLAYERO_WON';
const TIE = 'TIE';


function gen() {
    const main = document.getElementById("main");

    const header = createHeader();
    const board = createBoard();
    const footer = createFooter();

    main.appendChild(header);
    main.appendChild(board);
    main.appendChild(footer);



}

function show() {
    alert(this.dataset.value);
}

function createHeader() {
    const header = document.createElement('div');
    header.classList.add('header');
    const h1Title = document.createElement('h1');
    h1Title.innerHTML = 'Tic Tac Toe';
    
    header.appendChild(h1Title);

    const infoDiv = document.createElement('h2');
    infoDiv.classList.add('info');
    infoDiv.innerHTML = 'Player <span class="player">X</span> turn';

    header.appendChild(infoDiv);

    return header;
}

function createBoard() {
    const container = document.createElement('div');
    container.classList.add('container');

    for (let i=0; i<9; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => userAction(cell, i));
        container.appendChild(cell);
    }

    return container;
}

function createFooter() {
    const footer = document.createElement('div');
    footer.classList.add('footer');

    const button = document.createElement('button');
    button.classList.add('btn-reset');
    button.innerHTML = 'RESET'
    button.addEventListener('click', resetBoard);

    footer.appendChild(button);

    return footer;
}



function resetBoard() {
    board = ['', '', '', 
             '', '', '', 
             '', '', ''];
    isGameActive = true;

    if (currentPlayer === 'O') {
        changePlayer();
    }

    const playerInfo = document.querySelector('.info');
    playerInfo.innerHTML = `Player <span class="player player--${currentPlayer}">${currentPlayer}</span> turn`

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('player--X');
        cell.classList.remove('player--O');
    });
}

function userAction(cell, index) {
    if (canClickCell(cell) && isGameActive) {
        cell.innerHTML = currentPlayer;
        cell.classList.add(`player--${currentPlayer}`);
        updateBoard(index);
        handleResultValidation();
        changePlayer();
    }
}

function updateBoard(index) {
    board[index] = currentPlayer;
}

function changePlayer() {
    if (isGameActive) {
        const playerInfo = document.querySelector('.player');
        playerInfo.classList.remove(`player--${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerInfo.innerHTML = currentPlayer;
        playerInfo.classList.add(`player--${currentPlayer}`);
    }
}

function canClickCell(cell) {
    if (cell.innerText === 'X' || cell.innerText === 'O'){
        return false;
    }

    return true;
};

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winOptions[i];

        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        endGame(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
        isGameActive = false;
        return;
    }
        
    if (!board.includes('')) {
        endGame(TIE);
        isGameActive = false;
    }
}

function endGame(type) {
    const playerInfo = document.querySelector('.info');
    switch (type) {
        case PLAYERO_WON:
            playerInfo.innerHTML = 'Player <span class="player player--O">O</span> won';
            break;
        case PLAYERX_WON:
            playerInfo.innerHTML = 'Player <span class="player player--X">X</span> won';
            break;
        case TIE:
            playerInfo.innerHTML = 'Tie<span class="player"></span>';
            break;
    }
};