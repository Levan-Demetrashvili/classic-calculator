'use strict';

const inputField = document.getElementById('input');
const allBtns = document.querySelector('.buttons');
const operators = document.querySelector('.operators');
const mainPanel = document.querySelector('.main-panel');
const equalSign = document.querySelector('.equal');

let result2 = '';
let displayed = false;
let isZero = true;
let counter = 0;
inputField.textContent = counter;

function calculate() {
  const computed = eval(counter);
  result2 = parseFloat(computed.toFixed(6)).toString();
  inputField.textContent = result2;
}

for (let i = 0; i < mainPanel.children.length; i++) {
  for (let j = 0; j < mainPanel.children[i].children.length; j++) {
    let number = mainPanel.children[i].children[j].textContent;
    //** numbers listener */
    mainPanel.children[i].children[j].addEventListener('click', function () {
      if (displayed) {
        counter = '0';
        displayed = false;
      } else {
        counter ||= '0';
      }
      if (counter.startsWith('0')) isZero = true;
      if (!isZero) {
        if (number === 'C') counter = '0';
        else if (inputField.textContent.endsWith('.') && number === '.') counter += '';
        else counter += `${number}`;
      } else {
        if (number === 'C') counter = '0';
        else if (inputField.textContent.endsWith('.') && number !== '.') counter = number;
        else counter = `${number}`;
      }

      inputField.textContent = counter;
      isZero = false;
    });
  }
}

for (let i = 0; i < operators.childElementCount; i++) {
  let operator = operators.children[i].textContent;
  if (operator === '×') operator = '*';
  else if (operator === '÷') operator = '/';

  //** operators listener */

  operators.children[i].addEventListener('click', function () {
    if (inputField.textContent !== '0') {
      if (displayed) {
        displayed = false;
        counter = result2;
      } else if (inputField.textContent.endsWith('0')) {
        isZero = false;
      }

      if (counter.at(-1) === '+' || counter.at(-1) === '-' || counter.at(-1) === '*' || counter.at(-1) === '/') {
        counter += '';
      } else counter += operator;

      inputField.textContent = counter;
    }
  });
}

//* = Listener */
equalSign.addEventListener('click', function () {
  try {
    calculate();
  } catch (error) {
    counter += 1;
    calculate();
  }
  displayed = true;
});
