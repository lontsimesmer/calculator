// Get DOM elements

const displayEl = document.querySelector('.display')

const acEl = document.getElementById('ac')
const plusminEl = document.getElementById('plusminus')
const percentEl = document.getElementById('percentage')

const divideEl = document.getElementById('division')
const timesEl = document.getElementById('multiplication')
const minusEl = document.getElementById('subtraction')
const plusEl = document.getElementById('addition')
const equalEl = document.getElementById('equality')

const pointEl = document.getElementById('number-dot')
const num0El = document.getElementById('number0')
const num1El = document.getElementById('number1')
const num2El = document.getElementById('number2')
const num3El = document.getElementById('number3')
const num4El = document.getElementById('number4')
const num5El = document.getElementById('number5')
const num6El = document.getElementById('number6')
const num7El = document.getElementById('number7')
const num8El = document.getElementById('number8')
const num9El = document.getElementById('number9')
const numElArr = [
  num0El, num1El, num2El, num3El, num4El,
  num5El, num6El, num7El, num8El, num9El
]

// Call the two used variables

let valueStrInMemo = null
let operatorInMemo = null

// Functions that operate on whole numbers and join them

const getStrValue = () => displayEl.textContent.split(',').join('')

const getNumValue = () => {
  return parseFloat(getStrValue())
}

const setStrValue = (valueStr) => {
  if (valueStr[valueStr.length - 1] === '.') {
    displayEl.textContent += '.'
    return
  }

  const [wholeNumStr, decimalStr] = valueStr.split('.')
  if (decimalStr) {
    displayEl.textContent =
      parseFloat(wholeNumStr).toLocaleString() + '.' + decimalStr
  } else {
    displayEl.textContent = parseFloat(wholeNumStr).toLocaleString()
  }
}

const handleNumClick = (numStr) => {
  const currStrValue = getStrValue()
  if (currStrValue === '0') {
    setStrValue(numStr)
  } else {
    setStrValue(currStrValue + numStr)
  }
}

// Function that enables operators to work

const getOperationResults = () => {
  const currNumValue = getNumValue()
  const valueNumInMemo = parseFloat(valueStrInMemo)
  let newValueNum
  if (operatorInMemo === 'division') {
    newValueNum = valueNumInMemo / currNumValue
  } else if (operatorInMemo === 'multiplication') {
    newValueNum = valueNumInMemo * currNumValue
  } else if (operatorInMemo === 'subtraction') {
    newValueNum = valueNumInMemo - currNumValue
  } else if (operatorInMemo === 'addition') {
    newValueNum = valueNumInMemo + currNumValue
  }

  return newValueNum.toString()
}

const handleClickOperator = (operation) => {
  const currStrValue = getStrValue()

  if (!valueStrInMemo) {
    valueStrInMemo = currStrValue
    operatorInMemo = operation
    setStrValue('0')
    return
  }
  valueStrInMemo = getOperationResults()
  operatorInMemo = operation
  setStrValue('0')
}

// Add event listeners to signs

acEl.addEventListener('click', () => {
  setStrValue('0')
  valueStrInMemo = null
  operatorInMemo = null
})
plusminEl.addEventListener('click', () => {
  const currNumValue = getNumValue()
  const currStrValue = getStrValue()

  if (currStrValue === '-0') {
    setStrValue('0')
    return
  }
  if (currNumValue >= 0) {
    setStrValue('-' + currStrValue)
  } else {
    setStrValue(currStrValue.substring(1))
  }
})
percentEl.addEventListener('click', () => {
  const currNumValue = getNumValue()
  const newValueNum = currNumValue / 100
  setStrValue(newValueNum.toString())
  valueStrInMemo = null
  operatorInMemo = null
})

// Add event listeners to operators

divideEl.addEventListener('click', () => {
  handleClickOperator('division')
})
timesEl.addEventListener('click', () => {
  handleClickOperator('multiplication')
})
minusEl.addEventListener('click', () => {
  handleClickOperator('subtraction')
})
plusEl.addEventListener('click', () => {
  handleClickOperator('addition')
})
equalEl.addEventListener('click', () => {
  if (valueStrInMemo) {
    setStrValue(getOperationResults())
    valueStrInMemo = null
    operatorInMemo = null
  }
})

// Add event listeners to numbers and decimal

for (let i = 0; i < numElArr.length; i++) {
  const numberEl = numElArr[i]
  numberEl.addEventListener('click', () => {
    handleNumClick(i.toString())
  })
}
pointEl.addEventListener('click', () => {
  const currStrValue = getStrValue()
  if (!currStrValue.includes('.')) {
    setStrValue(currStrValue + '.')
  }
})
