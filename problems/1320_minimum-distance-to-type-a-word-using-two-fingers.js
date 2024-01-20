/*

You have a keyboard layout as shown above in the X-Y plane,
where each English uppercase letter is located at some coordinate.

For example, the letter 'A' is located at coordinate (0, 0),
the letter 'B' is located at coordinate (0, 1), the letter 'P'
is located at coordinate (2, 3) and the letter 'Z' is located at coordinate (4, 1).

Given the string word, return the minimum total distance to type such string using only two fingers.

The distance between coordinates (x1, y1) and (x2, y2) is |x1 - x2| + |y1 - y2|.

Note that the initial positions of your two fingers are considered free so do not count
towards your total distance, also your two fingers do not have to start at the first letter
or the first two letters.

Example 1:
  Input: word = "CAKE"
  Output: 3
  Explanation: Using two fingers, one optimal way to type "CAKE" is:
    Finger 1 on letter 'C' -> cost = 0
    Finger 1 on letter 'A' -> cost = Distance from letter 'C' to letter 'A' = 2
    Finger 2 on letter 'K' -> cost = 0
    Finger 2 on letter 'E' -> cost = Distance from letter 'K' to letter 'E' = 1
    Total distance = 3

Example 2:
  Input: word = "HAPPY"
  Output: 6
  Explanation: Using two fingers, one optimal way to type "HAPPY" is:
    Finger 1 on letter 'H' -> cost = 0
    Finger 1 on letter 'A' -> cost = Distance from letter 'H' to letter 'A' = 2
    Finger 2 on letter 'P' -> cost = 0
    Finger 2 on letter 'P' -> cost = Distance from letter 'P' to letter 'P' = 0
    Finger 1 on letter 'Y' -> cost = Distance from letter 'A' to letter 'Y' = 4
    Total distance = 6

Constraints:
- 2 <= word.length <= 300
- word consists of uppercase English letters.

*/

const map = {
  A: [0, 0],
  B: [0, 1],
  C: [0, 2],
  D: [0, 3],
  E: [0, 4],
  F: [0, 5],
  G: [1, 0],
  H: [1, 1],
  I: [1, 2],
  J: [1, 3],
  K: [1, 4],
  L: [1, 5],
  M: [2, 0],
  N: [2, 1],
  O: [2, 2],
  P: [2, 3],
  Q: [2, 4],
  R: [2, 5],
  S: [3, 0],
  T: [3, 1],
  U: [3, 2],
  V: [3, 3],
  W: [3, 4],
  X: [3, 5],
  Y: [4, 0],
  Z: [4, 1],
}

// A character that will be converted to the 26 when used .charCodeAt(0)
// so we can use the [26][26] of our DP as our special hover state, when
// the fingers haven't touched the board yet.
const hover_state = String.fromCharCode('Z'.charCodeAt(0) + 1)

var minimumDistance = function (word) {
  const n = word.length
  const a_char_code = 'A'.charCodeAt(0)

  // dp[i][a][b] gives me the minimum cost of typing word[i] when finger 1
  // was at letter a and finger 2 was at letter b (notice that we are doing a top-down
  // DFS, so dp[0] actually gives me the final state, not the initial)
  const dp = new Array(n).fill().map(() =>
    Array(27)
      .fill()
      .map(() => Array(27).fill(-1))
  )

  const dfs = (index, finger_1, finger_2) => {
    const finger_1_index = finger_1.charCodeAt(0) - a_char_code
    const finger_2_index = finger_2.charCodeAt(0) - a_char_code

    if (index == word.length) return 0 // The base condition for our top-down DP
    if (dp[index][finger_1_index][finger_2_index] != -1) return dp[index][finger_1_index][finger_2_index]

    const curr_char = word[index]

    dp[index][finger_1_index][finger_2_index] = Math.min(
      getDistance(finger_1, curr_char) + dfs(index + 1, curr_char, finger_2), // Finger 1 moved to curr_char, finger 2 stayed
      getDistance(finger_2, curr_char) + dfs(index + 1, finger_1, curr_char) // Finger 1 stayed, finger 2 moved to curr_char
    )

    return dp[index][finger_1_index][finger_2_index]
  }

  return dfs(0, hover_state, hover_state)
}

const getDistance = (letter_a, letter_b) => {
  if (letter_a == hover_state) return 0

  const [ai, aj] = map[letter_a]
  const [bi, bj] = map[letter_b]
  return Math.abs(ai - bi) + Math.abs(aj - bj)
}
