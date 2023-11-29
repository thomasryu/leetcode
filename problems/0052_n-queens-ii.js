/*

[0, 0]  [0, 1]  [0, 2]  [0, 3]  [0, 4]

[1, 0]  [1, 1]  [1, 2]  [1, 3]  [1, 4]

[2, 0]  [2, 1]  [2, 2]  [2, 3]  [2, 4]

[3, 0]  [3, 1]  [3, 2]  [3, 3]  [3, 4]

[4, 0]  [4, 1]  [4, 2]  [4, 3]  [4, 4]

*/

// Inefficient solution
var totalNQueens = function (n) {
  let result = 0

  // To check whether a queen is on the same x or y axis as another queen
  // if very simple, we simply check if those coordinates were already taken

  // For diagonals however, it's a little more creative:
  // - For / diagonals, we check whether x + y was already taken
  //   (e.g. [0, 4] and [1, 3] share the same diagonal)
  // - For \ diagonals, we check whether y - x was already taken
  //   (e.g. [0, 1] and [1, 2] share the same diagonal)

  // We store all the take axis and
  // diagonals in different sets
  const xAxisSet = new Set()
  const yAxisSet = new Set()
  const sumDiagSet = new Set()
  const subDiagSet = new Set()

  // Since we always need to start after queen insertions
  // (top to bottom, left to right) to avoid repeating the same solution,
  // instead of working with two for loops going from 0 to (n - 1) each,
  // we use a single loop going from 0 to (nˆ2 - 1)
  const solution = (start) => {
    if (xAxisSet.size == n) result++

    for (let i = start; i < n ** 2; i++) {
      const x = i % n
      const y = Math.floor(i / n)

      // Verify if viable queen position
      if (
        xAxisSet.has(x) ||
        yAxisSet.has(y) ||
        sumDiagSet.has(x + y) ||
        subDiagSet.has(y - x)
      )
        continue

      // Add queen to the sets
      xAxisSet.add(x)
      yAxisSet.add(y)
      sumDiagSet.add(x + y)
      subDiagSet.add(y - x)

      // Recursively call solution()
      solution(i + 1)

      // Backtrack
      xAxisSet.delete(x)
      yAxisSet.delete(y)
      sumDiagSet.delete(x + y)
      subDiagSet.delete(y - x)
    }
  }

  solution(0)
  return result
}

// Efficient solution
var totalNQueens = function (n) {
  let result = 0

  // Notice how we won't need
  // the xAxisSet for this solution
  const yAxisSet = new Set()
  const sumDiagSet = new Set()
  const subDiagSet = new Set()

  // Instead of calling recursively for each tile
  // we call it row by row, saving us performance and space
  const solution = (x) => {
    if (yAxisSet.size == n) result++

    for (let y = 0; y < n; y++) {
      if (yAxisSet.has(y) || sumDiagSet.has(x + y) || subDiagSet.has(y - x))
        continue

      yAxisSet.add(y)
      sumDiagSet.add(x + y)
      subDiagSet.add(y - x)

      solution(x + 1)

      yAxisSet.remove(y)
      sumDiagSet.remove(x + y)
      subDiagSet.remove(y - x)
    }
  }

  solution(0)
  return result
}
