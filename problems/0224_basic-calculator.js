var calculate = function (s) {
  // Since we only have addition and subtraction,
  // the parenthesis don't matter

  let signal = 1 // The signal multiplier caused by a "-" before a number

  // A "-" directly before a "(" inverts all the signals inside the parenthesis.
  // We keep track of which depths these occur so we update a signal modifier,
  // which is independent of the one defined above
  let negativeDepth = []
  let parenthesisDepth = 0

  const accumulator = []

  // 1. Removing spaces
  s = s.replaceAll(' ', '')

  // 2. Create a iterable array, which splits each symbol, but keeps digits together
  const iterable = s.split(/([()+-])/).filter((s) => s != '')
  for (let i = 0; i < iterable.length; i++) {
    switch (iterable[i]) {
      case '+':
        break

      case '-':
        signal = -1
        break

      case '(':
        parenthesisDepth++

        if (i > 0 && iterable[i - 1] == '-') {
          signal *= -1
          negativeDepth.push(parenthesisDepth)
        }
        break

      case ')':
        if (negativeDepth[negativeDepth.length - 1] == parenthesisDepth)
          negativeDepth.pop()
        parenthesisDepth--
        break

      default: // number
        accumulator.push(signal * (-1) ** negativeDepth.length * +iterable[i])
        signal = 1
    }
  }

  return accumulator.reduce((a, c) => a + c)
}

// Simpler solution
var calculate = function (s) {
  let result = 0
  let number = 0
  let sign = 1

  // An array of 1s or -1s that keeps track of the current
  // signal inside parenthesis
  let stack = []
  stack.push(1)

  const isDigit = (c) => {
    return c >= '0' && c <= '9'
  }

  for (let c of s) {
    // Dealing with consecutive digits
    if (isDigit(c)) number = number * 10 + (c - '0')
    else {
      result += number * sign * stack[stack.length - 1]
      number = 0

      if (c === '-') sign = -1
      else if (c === '+') sign = 1
      else if (c === '(') {
        stack.push(stack[stack.length - 1] * sign)
        sign = 1
      } else if (c === ')') stack.pop()
    }

    console.log(result, stack)
  }
  return (result += sign * number)
}
