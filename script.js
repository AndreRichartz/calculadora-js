const zerozero = document.getElementById("0");
const zero = document.getElementById("00");
const one = document.getElementById("1");
const two = document.getElementById("2");
const three = document.getElementById("3");
const four = document.getElementById("4");
const five = document.getElementById("5");
const six = document.getElementById("6");
const seven = document.getElementById("7");
const eight = document.getElementById("8");
const nine = document.getElementById("9");
const subtract = document.getElementById("-");
const sum = document.getElementById("+");
const multiply = document.getElementById("*");
const divide = document.getElementById("/");
const equal = document.getElementById("=");
const AC = document.getElementById("AC");
const DE = document.getElementById("DE");
const decimal = document.getElementById(".");

const numbers = [zerozero, zero, one, two, three, four, five, six, seven, eight, nine, decimal];
const operators = [subtract, sum, divide, multiply]
let display = document.getElementById("display");

numbers.forEach((number) => {
    number.addEventListener("click", () => {
        display.value += number.value;
        console.log('Hello world');
    });
});

operators.forEach((operator) => {
    operator.addEventListener("click", () => {
        display.value += operator.value;
        console.log('Hello world');
    });
});

AC.addEventListener ("click", ()=> {
    display.value = ''
})

DE.addEventListener ("click", () => {
    display.value =display.value.slice(0, -1)
})

Number(display)

function evaluate(expression) {
let tokens = expression.match(/(\d+\.\d+|\d+|[-+*/])/g);
console.log(tokens)
let operandStack = [];
let operatorStack = [];

for (let token of tokens) {
    if (!isNaN(token)) {
        operandStack.push(parseFloat(token));
    } else {
        while (operatorStack.length > 0 && precedence(token) <= precedence(operatorStack[operatorStack.length - 1])) {
            let operator = operatorStack.pop();
            let operand2 = operandStack.pop();
            let operand1 = operandStack.pop();
            operandStack.push(calc(operand1, operand2, operator));
        }
        operatorStack.push(token);
    }
}

while (operatorStack.length > 0) {
    let operator = operatorStack.pop();
    let operand2 = operandStack.pop();
    let operand1 = operandStack.pop();
    operandStack.push(calc(operand1, operand2, operator));
}

return operandStack.pop();
}

function calc(operand1, operand2, operator) {
switch(operator) {
    case '+':
        return operand1 + operand2;
    case '-':
        return operand1 - operand2;
    case '*':
        return operand1 * operand2;
    case '/':
        return operand1 / operand2;
}
}

function precedence(operator) {
switch(operator) {
    case '+':
    case '-':
        return 1;
    case '*':
    case '/':
        return 2;
    default:
        return 0;
}
}

equal.addEventListener("click", () => {
display.value = evaluate(display.value);
});

