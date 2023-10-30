/*

Write a function to find the longest common prefix string amongst an array of strings.
If there is no common prefix, return an empty string "".

Example 1:
  Input: strs = ["flower","flow","flight"]
  Output: "fl"

Example 2:
  Input: strs = ["dog","racecar","car"]
  Output: ""
  Explanation: There is no common prefix among the input strings.

Constraints:
- 1 <= strs.length <= 200
- 0 <= strs[i].length <= 200
- strs[i] consists of only lowercase English letters.

*/

var longestCommonPrefix = function (strs) {
  if (strs.length == 1) return strs[0]

  const ref = strs[0].split('')
  strs.splice(0, 1)

  let result = ''

  // For the i-th letter of the reference string
  for (let i = 0; i < ref.length; i++) {
    // We check whether all remaining strings also have it
    for (let j = 0; j < strs.length; j++) {
      if (strs[j][i] != ref[i] || i >= strs[j].length) {
        return result
      }
      // If all of them do, we append it to the result
      else if (j == strs.length - 1) {
        result += ref[i]
      }
    }
  }

  return result
}
