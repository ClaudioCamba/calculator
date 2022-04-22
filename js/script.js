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

console.log(add(4, 6));

// Subtract function
function subtract(a, b) {
    return a - b;
}

console.log(subtract(10, 7));

// multiply function
function multiply(a, b) {
    return a * b;
}

console.log(multiply(5, 7));

// divide function
function divide(a, b) {
    return a / b;
}

console.log(divide(100, 4));

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

console.log(operate('2', '-', '2'))

// Show clicked button on screen
function valStoreShow(e) {
    let val = this.textContent;
    let isNum = /^\d+$/.test(val); // Using Regex to check if string is a number

    // If its a number
    if (isNum) { // Numbers
        if (screenContent.operator.length === 0) {
            screenContent.num1.push(val);
        } else {
            screenContent.num2.push(val);
        }

    } else if (val === 'AC') { // Clear & equals
        screenContent.num1 = [];
        screenContent.operator = [];
        screenContent.num2 = [];
    } else { // Operators or equal

        if (screenContent.num2.length > 0) {
            screenContent.num1 = [operate(screenContent.num1.join(''), screenContent.operator.join(''), screenContent.num2.join(''))];
            (val !== '=') ? screenContent.operator[0] = val : screenContent.operator = [];
            screenContent.num2 = [];
        } else if (val !== '=') {
            screenContent.operator[0] = val;
        }
    }

    console.table(screenContent)
    domScreen.textContent = screenContent.num1.join('') + screenContent.operator.join('') + screenContent.num2.join('');

}

// Button click eventlistener
calButtons.forEach((btn) => btn.addEventListener('click', valStoreShow));
