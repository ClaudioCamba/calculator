const calButtons = document.querySelectorAll('.cal-buttons li button');
let domScreen = document.querySelector('.cal-screen'),
    screenContent = [];

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
    let isNum = /^\d+$/.test(this.textContent); // Using Regex to check if string is a number

    if (isNum) {
        screenContent.push(this.textContent);
        domScreen.innerText = screenContent.join('');
    }
}

// Button click eventlistener
calButtons.forEach((btn) => btn.addEventListener('click', valStoreShow));
