/*

You are given an integer array heights representing the heights of buildings, some bricks, and some ladders.

You start your journey from building 0 and move to the next building by possibly using bricks or ladders.

While moving from building i to building i+1 (0-indexed),

- If the current building's height is greater than or equal to the next building's height,
  you do not need a ladder or bricks.
- If the current building's height is less than the next building's height,
  you can either use one ladder or (h[i+1] - h[i]) bricks.

Return the furthest building index (0-indexed) you can reach if you use the given ladders and bricks optimally.

Example 1:
  Input: heights = [4,2,7,6,9,14,12], bricks = 5, ladders = 1
  Output: 4
  Explanation: Starting at building 0, you can follow these steps:
    - Go to building 1 without using ladders nor bricks since 4 >= 2.
    - Go to building 2 using 5 bricks. You must use either bricks or ladders because 2 < 7.
    - Go to building 3 without using ladders nor bricks since 7 >= 6.
    - Go to building 4 using your only ladder. You must use either bricks or ladders because 6 < 9.
    It is impossible to go beyond building 4 because you do not have any more bricks or ladders.

Example 2:
  Input: heights = [4,12,2,7,3,18,20,3,19], bricks = 10, ladders = 2
  Output: 7

Example 3:
  Input: heights = [14,3,19,3], bricks = 17, ladders = 0
  Output: 3

Constraints:
- 1 <= heights.length <= 105
- 1 <= heights[i] <= 106
- 0 <= bricks <= 109
- 0 <= ladders <= heights.length

*/

// Time limit exceeded BFS solution
var furthestBuilding = function (heights, bricks, ladders) {
  const queue = [[0, bricks, ladders]]
  let result = 0

  while (queue.length) {
    let [i, curr_bricks, curr_ladders] = queue.shift()

    while (i < heights.length - 1 && heights[i] >= heights[i + 1]) i++
    result = Math.max(result, i)

    if (i == heights.length - 1) break

    const req_bricks = heights[i + 1] - heights[i]

    if (curr_bricks >= req_bricks) queue.push([i + 1, curr_bricks - req_bricks, curr_ladders])
    if (curr_ladders > 0) queue.push([i + 1, curr_bricks, curr_ladders - 1])
  }

  return result
}

// Time limit exceeded DFS + DP (map) solution
var furthestBuilding = function (heights, bricks, ladders) {
  const n = heights.length
  // dp[i][j][k] gives me the furthest achievable distance
  // starting from index i, with j bricks and k ladders
  const dp = new Map()

  const dfs = (i, curr_bricks, curr_ladders) => {
    if (i == n - 1) return 0

    const key = `${i},${curr_bricks},${curr_ladders}`
    if (dp.has(key)) return dp.get(key)

    const req_bricks = heights[i + 1] - heights[i]

    if (req_bricks <= 0) {
      dp.set(key, dfs(i + 1, curr_bricks, curr_ladders) + 1)
      return dp.get(key)
    }

    let result = 0
    if (req_bricks <= curr_bricks) result = Math.max(result, dfs(i + 1, curr_bricks - req_bricks, curr_ladders) + 1)
    if (curr_ladders > 0) result = Math.max(result, dfs(i + 1, curr_bricks, curr_ladders - 1) + 1)

    dp.set(key, result)
    return result
  }

  return dfs(0, bricks, ladders)
}

// Optimal brute force + max heap solution
var furthestBuilding = function (heights, bricks, ladders) {
  const priority = new MaxPriorityQueue({ priority: (el) => el })

  for (let i = 1; i < heights.length; i++) {
    const req_bricks = heights[i] - heights[i - 1]
    if (req_bricks <= 0) continue

    // Always try using bricks first
    bricks -= req_bricks
    priority.enqueue(req_bricks)

    // If we run out of bricks, replace a previous jump with the
    // highest cost with a ladder
    if (bricks < 0) {
      ladders--
      bricks += priority.dequeue().element
    }

    // If we run out of bricks and ladders, we've reached our limit
    if (ladders < 0) {
      return i - 1
    }
  }

  return heights.length - 1
}
