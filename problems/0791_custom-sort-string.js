/*

You are given two strings order and s.
All the characters of order are unique and were sorted in some custom order previously.

Permute the characters of s so that they match the order that order was sorted.
More specifically, if a character x occurs before a character y in order,
then x should occur before y in the permuted string.

Return any permutation of s that satisfies this property.

Example 1:
  Input:  order = "cba", s = "abcd"
  Output:  "cbad"
  Explanation: "a", "b", "c" appear in order, so the order of "a", "b", "c"
      should be "c", "b", and "a".
    Since "d" does not appear in order, it can be at any position in the returned string.
      "dcba", "cdba", "cbda" are also valid outputs.

Example 2:
  Input:  order = "bcafg", s = "abcd"
  Output:  "bcad"
  Explanation: The characters "b", "c", and "a" from order dictate the order for the characters in s.
      The character "d" in s does not appear in order, so its position is flexible.
    Following the order of appearance in order, "b", "c", and "a" from s should be arranged
      as "b", "c", "a". "d" can be placed at any position since it's not in order.
    The output "bcad" correctly follows this rule. Other arrangements like "bacd" or "bcda"
      would also be valid, as long as "b", "c", "a" maintain their order.

Constraints:
- 1 <= order.length <= 26
- 1 <= s.length <= 200
- order and s consist of lowercase English letters.
- All the characters of order are unique.

*/

// O(N + N*log(N)) solution
var customSortString = function (order, s) {
  const n = order.length

  const map = {}
  for (let i = 0; i < n; i++) map[order[i]] = i

  return s
    .split('')
    .sort((a, b) => {
      // map[a] || n doesn't work because 0 is falsy
      const val_a = map[a] === undefined ? n : map[a]
      const val_b = map[b] === undefined ? n : map[b]
      return val_a - val_b
    })
    .join('')
}

// O(N) solution
var customSortString = function (order, s) {
  const map = new Map()
  for (let num of s) map.set(num, (map.get(num) || 0) + 1)

  let result = ''
  for (let num of order) {
    if (map.has(num)) {
      result += num.repeat(map.get(num))
      map.delete(num)
    }
  }
  for (let [key, value] of map.entries()) result += key.repeat(value)

  return result
}
