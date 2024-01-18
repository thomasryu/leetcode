/*

You are given an array colors, in which there are three colors: 1, 2 and 3.

You are also given some queries. Each query consists of two integers i and c,
return the shortest distance between the given index i and the target color c.
If there is no solution return -1.

Example 1:
  Input: colors = [1,1,2,1,3,2,2,3,3], queries = [[1,3],[2,2],[6,1]]
  Output: [3,0,3]
  Explanation:
    The nearest 3 from index 1 is at index 4 (3 steps away).
    The nearest 2 from index 2 is at index 2 itself (0 steps away).
    The nearest 1 from index 6 is at index 3 (3 steps away).

Example 2:
  Input: colors = [1,2], queries = [[0,3]]
  Output: [-1]
  Explanation: There is no 3 in the array.

Constraints:
- 1 <= colors.length <= 5*10^4
- 1 <= colors[i] <= 3
- 1 <= queries.length <= 5*10^4
- queries[i].length == 2
- 0 <= queries[i][0] < colors.length
- 1 <= queries[i][1] <= 3

*/

// Unoptimized DP solution
var shortestDistanceColor = function (colors, queries) {
  const n = colors.length
  const result = []

  // dp[i][c][0] gives me the shortest distance between the index i and the color c to the left of i
  // dp[i][c][1] gives me the shortest distance between the index i and the color c to the right of i
  const dp = Array(n)
    .fill()
    .map(() =>
      Array(3)
        .fill()
        .map(() => Array(2).fill(n))
    )

  for (let [querry_i, querry_c] of queries) {
    let l_dist = n
    let r_dist = n

    querry_c-- // To fit into a 0-indexed array

    for (let i = querry_i; i >= 0; i--) {
      const curr_color = colors[i] - 1

      if (curr_color == querry_c) {
        l_dist = querry_i - i
        break
      }
      if (dp[i][querry_c][0] < n) {
        l_dist = querry_i - i + dp[i][querry_c][0]
        break
      }
    }

    for (let i = querry_i; i < n; i++) {
      const curr_color = colors[i] - 1

      if (curr_color == querry_c) {
        r_dist = i - querry_i
        break
      }
      if (dp[i][querry_c][1] < n) {
        r_dist = i - querry_i + dp[i][querry_c][1]
        break
      }
    }

    if (l_dist == n && r_dist == n) result.push(-1)
    else result.push(Math.min(l_dist, r_dist))

    dp[querry_i][querry_c][0] = l_dist
    dp[querry_i][querry_c][1] = r_dist
  }

  return result
}

/*

You are given an array colors, in which there are three colors: 1, 2 and 3.

You are also given some queries. Each query consists of two integers i and c,
return the shortest distance between the given index i and the target color c.
If there is no solution return -1.

Example 1:
  Input: colors = [1,1,2,1,3,2,2,3,3], queries = [[1,3],[2,2],[6,1]]
  Output: [3,0,3]
  Explanation:
    The nearest 3 from index 1 is at index 4 (3 steps away).
    The nearest 2 from index 2 is at index 2 itself (0 steps away).
    The nearest 1 from index 6 is at index 3 (3 steps away).

Example 2:
  Input: colors = [1,2], queries = [[0,3]]
  Output: [-1]
  Explanation: There is no 3 in the array.

Constraints:
- 1 <= colors.length <= 5*10^4
- 1 <= colors[i] <= 3
- 1 <= queries.length <= 5*10^4
- queries[i].length == 2
- 0 <= queries[i][0] < colors.length
- 1 <= queries[i][1] <= 3

*/

// Unoptimized DP solution
var shortestDistanceColor = function (colors, queries) {
  const n = colors.length
  const result = []

  // dp[i][c][0] gives me the shortest distance between the index i and the color c to the left of i
  // dp[i][c][1] gives me the shortest distance between the index i and the color c to the right of i
  const dp = Array(n)
    .fill()
    .map(() =>
      Array(3)
        .fill()
        .map(() => Array(2).fill(n))
    )

  for (let [querry_i, querry_c] of queries) {
    let l_dist = n
    let r_dist = n

    querry_c-- // To fit into a 0-indexed array

    for (let i = querry_i; i >= 0; i--) {
      const curr_color = colors[i] - 1

      if (curr_color == querry_c) {
        l_dist = querry_i - i
        break
      }
      if (dp[i][querry_c][0] < n) {
        l_dist = querry_i - i + dp[i][querry_c][0]
        break
      }
    }

    for (let i = querry_i; i < n; i++) {
      const curr_color = colors[i] - 1

      if (curr_color == querry_c) {
        r_dist = i - querry_i
        break
      }
      if (dp[i][querry_c][1] < n) {
        r_dist = i - querry_i + dp[i][querry_c][1]
        break
      }
    }

    if (l_dist == n && r_dist == n) result.push(-1)
    else result.push(Math.min(l_dist, r_dist))

    dp[querry_i][querry_c][0] = l_dist
    dp[querry_i][querry_c][1] = r_dist
  }

  return result
}

var shortestDistanceColor = function (colors, queries) {
  const n = colors.length

  // dp[i][0][c] gives me the shortest distance between the index i and the color c to the left of i
  // dp[i][1][c] gives me the shortest distance between the index i and the color c to the right of i
  const dp = Array(n)
    .fill()
    .map(() =>
      Array(2)
        .fill()
        .map(() => Array(2).fill())
    )

  let most_recent_color_from_left = [-Infinity, -Infinity, -Infinity]
  let most_recent_color_from_right = [Infinity, Infinity, Infinity]
  for (let i = 0; i < n; i++) {
    const color_left = colors[i] - 1
    const color_right = colors[n - 1 - i] - 1

    most_recent_color_from_left[color_left] = i
    most_recent_color_from_right[color_right] = n - 1 - i

    for (let j = 0; j < 3; j++) {
      dp[i][0][j] = i - most_recent_color_from_left[j]
      dp[n - 1 - i][1][j] = most_recent_color_from_right[j] - (n - 1 - i)
    }
  }

  return queries.map(([index, color]) => {
    const from_left = dp[index][0][color - 1]
    const from_right = dp[index][1][color - 1]

    const min = Math.min(from_left, from_right)
    return min == Infinity ? -1 : min
  })
}

// Unoptimized pre-calculation DP solution
var shortestDistanceColor = function (colors, queries) {
  const n = colors.length

  // dp[i][0][c] gives me the shortest distance between the index i and the color c to the left of i
  // dp[i][1][c] gives me the shortest distance between the index i and the color c to the right of i
  const dp = Array(n)
    .fill()
    .map(() =>
      Array(2)
        .fill()
        .map(() => Array(2).fill())
    )

  let most_recent_color_from_left = [-Infinity, -Infinity, -Infinity]
  let most_recent_color_from_right = [Infinity, Infinity, Infinity]
  for (let i = 0; i < n; i++) {
    const color_left = colors[i] - 1
    const color_right = colors[n - 1 - i] - 1

    most_recent_color_from_left[color_left] = i
    most_recent_color_from_right[color_right] = n - 1 - i

    for (let j = 0; j < 3; j++) {
      dp[i][0][j] = i - most_recent_color_from_left[j]
      dp[n - i - 1][1][j] = most_recent_color_from_right[j] - (n - 1 - i)
    }
  }

  return queries.map(([index, color]) => {
    const from_left = dp[index][0][color - 1]
    const from_right = dp[index][1][color - 1]

    const min = Math.min(from_left, from_right)
    return min == Infinity ? -1 : min
  })
}
