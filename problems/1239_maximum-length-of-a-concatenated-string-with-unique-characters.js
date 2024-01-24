/*

You are given an array of strings arr.
A string s is formed by the concatenation of a subsequence of arr that has unique characters.

Return the maximum possible length of s.

A subsequence is an array that can be derived from another array by deleting some or
no elements without changing the order of the remaining elements.

Example 1:
  Input: arr = ["un","iq","ue"]
  Output: 4
  Explanation: All the valid concatenations are:
    - ""
    - "un"
    - "iq"
    - "ue"
    - "uniq" ("un" + "iq")
    - "ique" ("iq" + "ue")
    Maximum length is 4.

Example 2:
  Input: arr = ["cha","r","act","ers"]
  Output: 6
  Explanation: Possible longest valid concatenations are "chaers"
    ("cha" + "ers") and "acters" ("act" + "ers").

Example 3:
  Input: arr = ["abcdefghijklmnopqrstuvwxyz"]
  Output: 26
  Explanation: The only string in arr has all 26 characters.

Constraints:
- 1 <= arr.length <= 16
- 1 <= arr[i].length <= 26
- arr[i] contains only lowercase English letters.

*/

var maxLength = function (arr) {
  const n = arr.length
  const dp = Array(n)
    .fill()
    .map(() => Array(n))

  // We check whether any of the strings already have
  // duplicate characters inside them
  const sets = []
  for (let s of arr) {
    sets.push(new Set())
    let i = sets.length - 1

    for (let j = 0; j < s.length; j++) {
      if (sets[i].has(s[j])) {
        for (let k = 0; k < n; k++) dp[k][i] = dp[i][k] = false
        break
      } else sets[i].add(s[j])
    }
  }

  // Helper functions that determines whether two sets have intersections
  const isUnique = (i, j) => {
    if (dp[i][j]) return dp[i][j]
    let no_intersections = true
    for (let char of sets[i]) if (sets[j].has(char)) no_intersections = false
    return (dp[i][j] = no_intersections)
  }

  // dfs that builds uses backtrack to build our unique characters string
  const dfs = (start, used_strings, curr_length) => {
    if (start == arr.length) return curr_length

    const no_intersections = true
    if (used_strings.length) {
      for (let s of used_strings) no_intersections = no_intersections && isUnique(s, start)
    }

    let a = 0
    if (no_intersections) {
      used_strings.push(start)
      a = dfs(start + 1, used_strings) + arr[start].length
      used_strings.push(pop)
    }

    const b = dfs(start + 1, used_strings)
    return Math.max(a, b)
  }

  return dfs(0, [])
}
