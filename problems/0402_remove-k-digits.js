/*

Given string num representing a non-negative integer num, and an integer k,
return the smallest possible integer after removing k digits from num.

Example 1:
  Input: num = "1432219", k = 3
  Output: "1219"
  Explanation: Remove the three digits 4, 3, and 2
    to form the new number 1219 which is the smallest.

Example 2:
  Input: num = "10200", k = 1
  Output: "200"
  Explanation: Remove the leading 1 and the number is 200.
    Note that the output must not contain leading zeroes.

Example 3:
  Input: num = "10", k = 2
  Output: "0"
  Explanation: Remove all the digits from the number
    and it is left with nothing which is 0.

Constraints:
- 1 <= k <= num.length <= 105
- num consists of only digits.
- num does not have any leading zeros except for the zero itself.

*/

// Iterative solution (O(N * K), time limit exceeded)
var removeKdigits = function (num, k) {
  let n = num.length
  if (n <= k) return '0'

  for (let i = 0; i < k; i++) {
    n = num.length
    let j = 0

    for (; j < n - 1; j++) {
      // If there is a peak followed by a dip,
      // we remove the peak value
      if (num[j] > num[j + 1]) break

      // If there is a climb in value or it stays the same,
      // we continue
    }

    // We either remove the first dip
    // or the last element of num
    num = num.slice(0, j) + num.slice(j + 1, n)
  }

  // Remove trailing zeroes
  let i = 0
  while (num[i] == '0' && i < num.length - 1) i++
  return num.slice(i, num.length)
}

// Monotonic queue solution (O(N))
var removeKdigits = function (nums, k) {
  const getTop = (array) => {
    if (array.length) return array[array.length - 1]
    return -1
  }

  let monotonic_ans = []
  for (let num of nums) {
    while (k && getTop(monotonic_ans) > num) {
      monotonic_ans.pop()
      k--
    }
    monotonic_ans.push(num)
  }

  while (k--) monotonic_ans.pop()
  while (monotonic_ans.length > 1 && monotonic_ans[0] == '0')
    monotonic_ans.shift()
  return monotonic_ans.join('') || '0'
}
