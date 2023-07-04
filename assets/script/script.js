const numberBtn = document.querySelectorAll('.numbers')
const AC = document.getElementById('ac')
const plusMinus = document.getElementById('plusminus')
const operationBtn = document.querySelectorAll('.operators')
const equals = document.getElementById('equality')
const currentDisplay = document.querySelector('#curr-display')
const previousDisplay = document.querySelector('#prev-display')

let currentOperation = ''

allClear()

// Clear the calculator
function allClear () {
  currentDisplay.textContent = ''
  previousDisplay.textContent = ''
  currentOperation = ''
}

// Display number on screen when button is pressed
function appendNumber (number) {
  const x = currentDisplay.textContent += number
  if (
    x.toString[0] === '0' &&
    x.toString[1] === '0'
  ) {
    x.toString = '0'
  }
}

// Update operations
function updateOperation (operation) {
  currentOperation = operation
  if (currentDisplay.textContent !== '' && previousDisplay.textContent !== '') {
    return
  }
  if (currentDisplay.textContent !== '') {
    previousDisplay.textContent = currentDisplay.textContent
    currentDisplay.textContent = ''
  }
}

// Perform calculation and update display
function calculate () {
  let result = ''
  const b = Number(currentDisplay.textContent)
  const a = Number(previousDisplay.textContent)
  console.log(a, b, currentOperation)

  switch (currentOperation) {
    case 'addition':
      result = a + b
      break
    case 'subtraction':
      result = a - b
      break
    case 'multiplication':
      result = a * b
      break
    case 'division':
      result = a / b
      break
    case 'percentage':
      result = a * (b / 100)
      break
  }
  currentDisplay.textContent = result
  previousDisplay.textContent = ''
  currentOperation = 'equals'
}

// Change the sign of currentDisplay
function changeSign () {
  const b = Number(currentDisplay.textContent)
  if (b >= 0) {
    currentDisplay.textContent = '-' + currentDisplay.textContent
  } else {
    currentDisplay.textContent = currentDisplay.textContent.substring(1)
  }
}

AC.addEventListener('click', allClear)

// Number buttons
numberBtn.forEach((button) => {
  button.addEventListener('click', () => {
    if (currentOperation === 'equals') {
      allClear()
      appendNumber(button.textContent)
    } else {
      appendNumber(button.textContent)
    }
  })
})

// Operation buttons
operationBtn.forEach((button) => {
  button.addEventListener('click', () => {
    updateOperation(button.id)
  })
})

// Equals button
equals.addEventListener('click', () => {
  calculate()
})

// Plus or minus button
plusMinus.addEventListener('click', () => {
  changeSign()
})
