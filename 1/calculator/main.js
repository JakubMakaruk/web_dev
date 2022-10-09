const TYPE_CLEAR_ALL = 'C';
const TYPE_CLEAR_CHAR = '<';
const TYPE_CHANGE_SIGN = '+/-'
const TYPE_NUMBER = 'NUMBER';
const TYPE_PLUS = '+';
const TYPE_MINUS = '-';
const TYPE_MULTIPLY = '*';
const TYPE_DIVIDE = '/';
const TYPE_PERCENTAGE = '%';
const TYPE_EQUALS = '=';
const TYPE_DOT = '.';

let a = null, b = null, result = null;

let isClickedOperation = false;
let lastOperation;
let displayTop, displayBottom;


function gen() {
    const main = document.getElementById("main");

    const display = createDisplayBoard();
    const keyboard = createKeysBoard();

    main.appendChild(display);
    
    const buttons = [];
    
    buttons.push(createButton(TYPE_CLEAR_ALL, TYPE_CLEAR_ALL));
    buttons.push(createButton(TYPE_CLEAR_CHAR, TYPE_CLEAR_CHAR));
    buttons.push(createButton(TYPE_CHANGE_SIGN, TYPE_CHANGE_SIGN));
    buttons.push(createButton(TYPE_DIVIDE, TYPE_DIVIDE, TYPE_DIVIDE));
    
    buttons.push(createButton(TYPE_NUMBER, '7', '7'));
    buttons.push(createButton(TYPE_NUMBER, '8', '8'));
    buttons.push(createButton(TYPE_NUMBER, '9', '9'));
    buttons.push(createButton(TYPE_MULTIPLY, TYPE_MULTIPLY, TYPE_MULTIPLY));
    
    buttons.push(createButton(TYPE_NUMBER, '4', '4'));
    buttons.push(createButton(TYPE_NUMBER, '5', '5'));
    buttons.push(createButton(TYPE_NUMBER, '6', '6'));
    buttons.push(createButton(TYPE_MINUS, TYPE_MINUS, TYPE_MINUS));

    buttons.push(createButton(TYPE_NUMBER, '1', '1'));
    buttons.push(createButton(TYPE_NUMBER, '2', '2'));
    buttons.push(createButton(TYPE_NUMBER, '3', '3'));
    buttons.push(createButton(TYPE_PLUS, TYPE_PLUS, TYPE_PLUS));
    
    buttons.push(createButton(TYPE_DOT, TYPE_DOT, TYPE_DOT));
    buttons.push(createButton(TYPE_NUMBER, '0', '0'));
    buttons.push(createButton(TYPE_PERCENTAGE, TYPE_PERCENTAGE));
    buttons.push(createButton(TYPE_EQUALS, TYPE_EQUALS, TYPE_EQUALS));

    buttons.forEach(button => keyboard.appendChild(button));

    main.appendChild(keyboard);
}

function show() {
    alert(this.dataset.value);
}

function createDisplayBoard() {
    const display = document.createElement('div');
    display.classList.add('display');

    const displayTextTop = document.createElement('p');
    displayTextTop.classList.add('display__text', 'display__text--top');

    const displayTextBottom = document.createElement('p');
    displayTextBottom.classList.add('display__text', 'display__text--bottom');

    display.appendChild(displayTextTop);
    display.appendChild(displayTextBottom);

    displayTop = displayTextTop;
    displayBottom = displayTextBottom;

    return display;
}
function createKeysBoard() {
    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    return keyboard;
}

function createButton(type, text, value) {
    const button = document.createElement('button');
    
    if (text) {
        button.innerText = text;
    }
    if (value) {
        button.dataset.value = value;
    }

    switch (type) {
        case TYPE_NUMBER:
            button.addEventListener('click', pickNumber);
            break;
        case TYPE_PLUS:
        case TYPE_MINUS:
        case TYPE_MULTIPLY:
        case TYPE_DIVIDE:
            button.addEventListener('click', operation);
            break;
        case TYPE_EQUALS:
            button.addEventListener('click', equal);
            break;
        case TYPE_DOT:
            button.addEventListener('click', addDot);
            break;
        case TYPE_CLEAR_ALL:
            button.addEventListener('click', clearAll);
            break;
        case TYPE_CLEAR_CHAR:
            button.addEventListener('click', clearChar);
            break;
        case TYPE_CHANGE_SIGN:
            button.addEventListener('click', changeSign);
            break;
        case TYPE_PERCENTAGE:
            button.addEventListener('click', percentage);
            break;
    }

    return button;
}



// ------------ operations
function clearAll() {
    a = b = result = null;
    displayBottom.innerText = displayTop.innerText = '';
    lastOperation = null;
}
function clearChar() {
    if (displayBottom.innerText.length > 0) {
        let text = displayBottom.innerText;
        text = text.slice(0, -1);
        displayBottom.innerText = text;
    }
}
function pickNumber(event) {
    if (isClickedOperation) {
        displayBottom.innerText = '';
        isClickedOperation = false;
    }
    if (lastOperation === TYPE_EQUALS) {
        a = b = result = null;
        displayBottom.innerText = displayTop.innerText = '';
        lastOperation = null;
    }

    displayBottom.innerText = displayBottom.innerText + event.target.dataset.value;
}
function operation(event) {
    let operation = event.target.dataset.value;
    if (a && b) {
        result = makeOperation(parseFloat(a), parseFloat(b), lastOperation);
        a = result;
        b = null;
        displayTop.innerText = result + ' ' + operation;
        displayBottom.innerText = result;
        lastOperation = operation;
    }
    else if (a && lastOperation === TYPE_EQUALS) {
        displayTop.innerText = a + ' ' + operation;
        lastOperation = operation;
    }
    else if (a === null) {
        a = displayBottom.innerText;
        displayTop.innerText = a + ' ' + operation;
        lastOperation = operation;
    }
    else if (a && b === null && !isClickedOperation) {
        b = displayBottom.innerText;
        displayTop.innerText = a + ' ' + operation;
        
        result = makeOperation(parseFloat(a), parseInt(b), lastOperation);
        a = result;
        b = null;
        displayTop.innerText = result + ' ' + operation;
        displayBottom.innerText = result;
        lastOperation = operation;
    } else {
        displayTop.innerText = a + ' ' + operation;
        lastOperation = operation;
    }

    isClickedOperation = true;
}
function makeOperation(a, b, operation) {
    switch (operation) {
        case TYPE_PLUS:
            return a + b;
        case TYPE_MINUS:
            return a - b;
        case TYPE_MULTIPLY:
            return a * b;
        case TYPE_DIVIDE:
            return a / b;        
    }
}
function equal(event) {
    if (a === null) {
        displayTop.innerText = displayBottom.innerText + ' ' + event.target.dataset.value; 
        lastOperation = event.target.dataset.value;
        isClickedOperation = true;
    } else if (a && b) {
        result = makeOperation(parseFloat(a), parseFloat(b), lastOperation);
        a = result;
        b = null;
        displayTop.innerText = result + ' ' + event.target.dataset.value;
        displayBottom.innerText = result;
        lastOperation = event.target.dataset.value;
    } else {
        b = displayBottom.innerText;
        result = makeOperation(parseFloat(a), parseFloat(b), lastOperation);
        displayTop.innerText = a + ' ' + lastOperation + ' ' + b + ' ' + event.target.dataset.value;
        displayBottom.innerText = result;
        lastOperation = event.target.dataset.value;
        a = result;
        b = null;
    }
}
function addDot() {
    let currentNumber = displayBottom.innerText;
    
    if (currentNumber.indexOf(TYPE_DOT) === -1) {
        currentNumber += TYPE_DOT;
        displayBottom.innerText = currentNumber;
    }
}
function changeSign() {
    let currentNumber = displayBottom.innerText;
    
    if (currentNumber.indexOf('-') === 0) {
        currentNumber.slice(1);
    } else {
        currentNumber = '-' + currentNumber;
        displayBottom.innerText = currentNumber;
    }
}
function percentage(event) {
    if (a) {
        b = parseFloat(displayBottom.innerText)/100 * parseFloat(a) ;
        displayTop.innerText = a + ' ' + lastOperation + ' ' + b;
        displayBottom.innerText = +b;
    } else {
        displayBottom.innerText = '0';
    }
}



// AC  <-  +/-   /
// 7   8    9    *
// 4   5    6    -
// 1   2    3    +
// .   0    %    =