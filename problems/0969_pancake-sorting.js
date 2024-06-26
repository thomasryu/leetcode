/*

Given an array of integers arr, sort the array by performing a series of pancake flips.

In one pancake flip we do the following steps:

- Choose an integer k where 1 <= k <= arr.length.
- Reverse the sub-array arr[0...k-1] (0-indexed).

For example, if arr = [3,2,1,4] and we performed a pancake flip choosing k = 3,
we reverse the sub-array [3,2,1], so arr = [1,2,3,4] after the pancake flip at k = 3.

Return an array of the k-values corresponding to a sequence of pancake flips that sort arr.
Any valid answer that sorts the array within 10 * arr.length flips will be judged as correct.

Example 1:
  Input: arr = [3,2,4,1]
  Output: [4,2,4,3]
  Explanation:
    We perform 4 pancake flips, with k values 4, 2, 4, and 3.
    Starting state: arr = [3, 2, 4, 1]
    After 1st flip (k = 4): arr = [1, 4, 2, 3]
    After 2nd flip (k = 2): arr = [4, 1, 2, 3]
    After 3rd flip (k = 4): arr = [3, 2, 1, 4]
    After 4th flip (k = 3): arr = [1, 2, 3, 4], which is sorted.

Example 2:
  Input: arr = [1,2,3]
  Output: []
  Explanation: The input is already sorted, so there is no need to flip anything.
    Note that other answers, such as [3, 3], would also be accepted.

Constraints:
- 1 <= arr.length <= 100
- 1 <= arr[i] <= arr.length
- All integers in arr are unique (i.e. arr is a permutation of the integers from 1 to arr.length).

*/

var pancakeSort = function (arr) {
  const result = []

  const swap = (a, b) => ([arr[a], arr[b]] = [arr[b], arr[a]])
  const flip = (b) => {
    let a = 0
    while (a < b) {
      swap(a, b)
      a++
      b--
    }
  }
  const fix = (n) => {
    // 1. Put n in position 0
    const i = arr.indexOf(n)
    if (i != 0) {
      result.push(i + 1)
      flip(i)
    }
    // 2. Put n in the n - 1 position
    result.push(n)
    flip(n - 1)
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == i + 1) continue
    fix(i + 1)
  }

  return result
}

// Attempt made at 29/04/2024
var pancakeSort = function (arr) {
  const flip = (n) => {
    for (let i = 0; i < Math.floor(n / 2); i++)
      [arr[i], arr[n - 1 - i]] = [arr[n - 1 - i], arr[i]]
  }

  const result = []
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == i + 1) continue

    for (let j = i - 1; j >= 0; j--)
      if (arr[j] == i + 1) {
        // Move the number to the first position
        if (j != 0) {
          result.push(j + 1)
          flip(j + 1)
        }
        // Move the number to the right position
        result.push(i + 1)
        flip(i + 1)
        break
      }
  }

  return result
}
