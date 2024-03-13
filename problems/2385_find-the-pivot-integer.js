/*

Given a positive integer n,
find the pivot integer x such that:

The sum of all elements between 1 and x inclusively equals
the sum of all elements between x and n inclusively.
Return the pivot integer x. If no such integer exists, return -1.
It is guaranteed that there will be at most one pivot index for the given input.

Example 1:
  Input: n = 8
  Output: 6
  Explanation: 6 is the pivot integer since: 1 + 2 + 3 + 4 + 5 + 6 = 6 + 7 + 8 = 21.

Example 2:
  Input: n = 1
  Output: 1
  Explanation: 1 is the pivot integer since: 1 = 1.

Example 3:
  Input: n = 4
  Output: -1
  Explanation: It can be proved that no such integer exist.

Constraints:
- 1 <= n <= 1000

*/

// O(N)
var pivotInteger = function (n) {
  // Returns them result of 1 + 2 + ... + x
  const getSum = (x) => (x * (x + 1)) / 2
  for (let i = 1; i <= n; i++) if (getSum(i) == getSum(n) - getSum(i - 1)) return i
  return -1
}

// O(log(N))
var pivotInteger = function (n) {
  const getSum = (x) => (x * (x + 1)) / 2

  let left = 1
  let right = n

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    const left_sum = getSum(mid)
    const right_sum = getSum(n) - getSum(mid - 1)

    if (left_sum == right_sum) return mid
    if (left_sum > right_sum) right = mid - 1
    else left = mid + 1
  }

  return -1
}
