const input = document.getElementById('input')
const result = document.getElementById('result')
const clear = document.getElementById('clear')
const number = document.querySelectorAll('.numbers')
const operator = document.querySelectorAll('.operators')
const displayResults = false

for (let i = 0; i < number.length; i++) {
  number[i].addEventListener('click', function (e) {
    const currentString = input.innerHTML
    const lastCharacter = currentString[currentString.length - 1]

    if (displayResults === false) {
      input.innerHTML += e.target.innerHTML
    } else if (
      (displayResults === true && lastCharacter === '÷') ||
      lastCharacter === '*' ||
      lastCharacter === '-' ||
      lastCharacter === '+'
    ) {
    //   displayResults = false
      input.innerHTML += e.target.innerHTML
    } else {
    //   displayResults = false
      input.innerHTML = '0'
      input.innerHTML += e.target.innerHTML
    }
    console.log(displayResults)
  })
}

for (let i = 0; i < operator.length; i++) {
  operator[i].addEventListener('click', function (e) {
    const currentString = input.innerHTML
    const lastOperator = currentString[currentString.length - 1]
    if (
      lastOperator === '÷' ||
      lastOperator === '*' ||
      lastOperator === '-' ||
      lastOperator === '+'
    ) {
      const newString =
        currentString.substring(0, currentString.length - 1) +
        e.target.innerHTML
      input.innerHTML = newString
    } else if (currentString === 0) {
      console.log('enter any false number')
    } else {
      input.innerHTML += e.target.innerHTML
    }
  })
}

result.addEventListener('click', function () {
  const inputString = this.innerHTML
  //eslint-disable-next-line
  const numbers = inputString.split(/\÷|\*|\-|\+/g)
  const operators = inputString.replace(/[0-9]|\./g, '').split('')
  console.log(inputString)
  console.log(numbers)
  console.log(operators)

  //eslint-disable-next-line
  const divide = operators.indexOf('÷')
  while (divide !== -1) {
    numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1])
    operators.splice(divide, 1)
    divide = operators.indexOf('÷')
  }

  const multiply = operators.indexOf('*')
  while (multiply !== -1) {
    numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1])
    operators.splice(multiply, 1)
    multiply = operators.indexOf('*')
  }

  const subtract = operators.indexOf('-')
  while (subtract !== -1) {
    numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1])
    operators.splice(subtract, 1)
    subtract = operators.indexOf('-')
  }

  const add = operators.indexOf('+')
  while (add !== -1) {
    numbers.splice(
      add,
      2,
      parseFloat(numbers[add]) + parseFloat(numbers[add + 1])
    )
    operators.splice(add, 1)
    add = operators.indexOf('+')
  }

  input.innerHTML = numbers[0]

//   displayResults = true
})

clear.addEventListener('click', function () {
  input.innerHTML = ''
})
