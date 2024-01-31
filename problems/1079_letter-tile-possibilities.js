/*

You have n  tiles, where each tile has one letter tiles[i] printed on it.

Return the number of possible non-empty sequences of letters
you can make using the letters printed on those tiles.

Example 1:
  Input: tiles = "AAB"
  Output: 8
  Explanation: The possible sequences are
    "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA".

Example 2:
  Input: tiles = "AAABBC"
  Output: 188

Example 3:
  Input: tiles = "V"
  Output: 1

Constraints:
- 1 <= tiles.length <= 7
- tiles consists of uppercase English letters.

*/

var numTilePossibilities = function (tiles) {
  let result = 0
  const map = {}

  for (let letter of tiles) {
    map[letter] || (map[letter] = 0)
    map[letter]++
  }

  const add_letter = (map) => {
    for (let letter in map) {
      if (map[letter] == 0) continue
      map[letter]--
      result++
      add_letter(map)
      map[letter]++
    }
  }

  add_letter(map)
  return result
}
