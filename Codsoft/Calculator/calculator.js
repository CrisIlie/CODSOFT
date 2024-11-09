const calculator = document.querySelector('.calculator');
const display = calculator.querySelector('.display');
const keys = calculator.querySelector('.keys');

keys.addEventListener('click', e => {
    if (!e.target.matches('button')) return;

    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNumber = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    if (!action) {
        if (displayedNumber === '0' || previousKeyType === 'operator') {
            display.textContent = keyContent;
        } else {
            display.textContent = displayedNumber + keyContent;
        }
    }

    if (action === 'decimal') {
        display.textContent = displayedNumber + '.';
    }

    if (action === 'clear') {
        display.textContent = '0';
    }

    if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
        key.classList.add('is-depressed');
        calculator.dataset.previousKeyType = 'operator';
        calculator.dataset.firstValue = displayedNumber;
        calculator.dataset.operator = action;
    }

    if (action === 'calculate') {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;
        const secondValue = displayedNumber;

        display.textContent = calculate(firstValue, operator, secondValue);
    }

    Array.from(key.parentNode.children).forEach(key => key.classList.remove('is-depressed'));
});

const calculate = (num1, operator, num2) => {
    let result = '';

    if (operator === 'add') {
        result = parseFloat(num1) + parseFloat(num2);
    } else if (operator === 'subtract') {
        result = parseFloat(num1) - parseFloat(num2);
    } else if (operator === 'multiply') {
        result = parseFloat(num1) * parseFloat(num2);
    } else if (operator === 'divide') {
        result = parseFloat(num1) / parseFloat(num2);
    }

    return result;
};
