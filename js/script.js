const calButtons = document.querySelectorAll('.cal-buttons li button');
const domScreen = document.querySelector('.cal-screen');
let screenContent = {
    num1: [],
    operator: [],
    num2: [],
};

// Add function
function add(a, b) {
    return a + b;
}

// Subtract function
function subtract(a, b) {
    return a - b;
}

// multiply function
function multiply(a, b) {
    return a * b;
}

// divide function
function divide(a, b) {
    return a / b;
}

// Operate function
function operate(num1, op, num2) {
    let result;
    switch (op) {
        case '+':
            result = add(parseFloat(num1), parseFloat(num2));
            break;
        case '-':
            result = subtract(parseFloat(num1), parseFloat(num2));
            break;
        case '*':
            result = multiply(parseFloat(num1), parseFloat(num2));
            break;
        case '/':
            result = divide(parseFloat(num1), parseFloat(num2));
            break;
    }

    return result;
}

// Backspace function to erase most recent number/operator entered
function backSpace() {
    if (screenContent.num2.length > 0) {
        screenContent.num2.pop();
    } else if (screenContent.operator.length > 0) {
        screenContent.operator.pop();
    } else if (screenContent.num1.length > 0) {
        screenContent.num1.pop();
    }
}

// Show clicked button on screen
function valStoreShow(e) {
    let val = this.textContent;
    let isNum = /^\d+$/.test(val); // Using Regex to check if string is a number

    // If its a number
    if (isNum || val === '.') { // Numbers
        if (val === '.') {
            if (screenContent.operator.length === 0) {
                (screenContent.num1.includes('.') === false) ? screenContent.num1.push(val) : false;
            } else {
                (screenContent.num2.includes('.') === false) ? screenContent.num2.push(val) : false;
            };
        } else {
            (screenContent.operator.length === 0) ? screenContent.num1.push(parseFloat(val)) : screenContent.num2.push(parseFloat(val));
        }

    } else if (val === 'AC') { // Clear & equals
        screenContent.num1 = [];
        screenContent.operator = [];
        screenContent.num2 = [];
    } else if (val === '<') { // Clear & equals
        backSpace();
    } else { // Operators or equal
        if (screenContent.operator == '/' && screenContent.num2.reduce((total, num) => total + num) === 0 && val === '=') {
            screenContent.num1 = ['INFINITY! TRY AGAIN...'];
            screenContent.operator = [];
            screenContent.num2 = [];
        } else {
            if (screenContent.num2.length > 0) {
                let result = operate(parseFloat(screenContent.num1.join('')), screenContent.operator.join(''), parseFloat(screenContent.num2.join('')));

                (result % 1 === 0) ? screenContent.num1 = [parseFloat(result)] : screenContent.num1 = [parseFloat(result.toFixed(10))];
                (val !== '=') ? screenContent.operator[0] = val : screenContent.operator = [];
                screenContent.num2 = [];
            } else if (val !== '=') {
                screenContent.operator[0] = val;
            }
        }
    }

    console.table(screenContent)
    domScreen.textContent = screenContent.num1.join('') + screenContent.operator.join('') + screenContent.num2.join('');

}

// Button click eventlistener
calButtons.forEach((btn) => btn.addEventListener('click', valStoreShow));

// Keyboard eventlistner / Keyboard support
window.document.addEventListener('keydown', function (e) {
    let pressedKey = e.key

    switch (pressedKey) {
        case 'Backspace':
            pressedKey = '<';
            break;
        case 'Escape':
            pressedKey = 'AC';
            break;
        case 'Enter':
            pressedKey = 'AC';
            break;
    }

    for (const btn of calButtons) {
        if (btn.textContent === pressedKey) {
            btn.click();
            break;
        }
    }
});

