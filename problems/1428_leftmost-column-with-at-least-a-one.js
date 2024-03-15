// O(log(N) * M) solution
var leftMostColumnWithOne = function (binaryMatrix) {
  const [rows, cols] = binaryMatrix.dimensions()
  let result = -1

  let left = 0
  let right = cols
  while (left < right) {
    const mid = Math.floor((left + right) / 2)

    let mid_col_has_one = false
    for (let i = 0; i < rows; i++)
      if (binaryMatrix.get(i, mid)) {
        result = mid
        mid_col_has_one = true
      }

    if (mid_col_has_one) right = mid
    else left = mid + 1
  }

  return result
}

// O(M + N) solution
var leftMostColumnWithOne = function (binaryMatrix) {
  const [rows, cols] = binaryMatrix.dimensions()

  let result = -1

  let i = 0
  let j = cols - 1
  while (i < rows && j >= 0) {
    // If we find a 1, we check the previous column for the same row
    if (binaryMatrix.get(i, j) == 1) {
      result = j
      j--
    }

    // If we find a 0, there is no point checking previous columns in the
    // same row, because they will all be 0s as well, so we search the next row
    else i++
  }

  return result
}
