/*

You are given an empty 2D binary grid grid of size m x n.
The grid represents a map where 0's represent water and 1's represent land.
Initially, all the cells of grid are water cells (i.e., all the cells are 0's).

We may perform an add land operation which turns the water at position into a land.
You are given an array positions where positions[i] = [ri, ci]
is the position (ri, ci) at which we should operate the ith operation.

Return an array of integers answer where answer[i] is the number of islands
after turning the cell (ri, ci) into a land.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.
You may assume all four edges of the grid are all surrounded by water.

Example 1:
  Input: m = 3, n = 3, positions = [[0,0],[0,1],[1,2],[2,1]]
  Output: [1,1,2,3]
  Explanation:
    Initially, the 2d grid is filled with water.
    - Operation #1: addLand(0, 0) turns the water at grid[0][0] into a land. We have 1 island.
    - Operation #2: addLand(0, 1) turns the water at grid[0][1] into a land. We still have 1 island.
    - Operation #3: addLand(1, 2) turns the water at grid[1][2] into a land. We have 2 islands.
    - Operation #4: addLand(2, 1) turns the water at grid[2][1] into a land. We have 3 islands.

Example 2:
  Input: m = 1, n = 1, positions = [[0,0]]
  Output: [1]

Constraints:
- 1 <= m, n, positions.length <= 104
- 1 <= m * n <= 104
- positions[i].length == 2
- 0 <= ri < m
- 0 <= ci < n

Follow up: Could you solve it in time complexity O(k log(mn)), where k == positions.length?

*/

// Wrong DFS solution
var numIslands2 = function (m, n, positions) {
  const steps = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ]

  const sea = Array(m)
    .fill()
    .map(() => Array(n).fill(0))

  let island_count = 0
  let result = []

  const insertIsland = (i, j, island_id) => {
    const surrounding_islands = new Set()
    let first_island_id = 0

    // We skip insertions on tiles that are already islands
    if (sea[i][j] == 0) {
      for (let [di, dj] of steps) {
        if (i + di < 0 || j + dj < 0 || i + di >= m || j + dj >= n) continue // out of bounds
        if (sea[i + di][j + dj] != 0 && first_island_id == 0) first_island_id = sea[i + di][j + dj]

        if (sea[i + di][j + dj] != 0) surrounding_islands.add(sea[i + di][j + dj])
        if (surrounding_islands.size > 1 && sea[i + di][j + dj] != first_island_id) {
          sea[i + di][j + dj] = first_island_id
          reidIsland(i + di, j + dj, first_island_id)
        }
      }

      island_count += 1 - surrounding_islands.size

      if (first_island_id != 0) sea[i][j] = first_island_id
      else sea[i][j] = island_id
    }

    result.push(island_count)
  }

  const reidIsland = (i, j, new_id) => {
    for (let [di, dj] of steps) {
      if (i + di < 0 || j + dj < 0 || i + di >= m || j + dj >= n) continue
      if (sea[i + di][j + dj] == 0 || sea[i + di][j + dj] == new_id) continue

      sea[i + di][j + dj] = new_id
      reidIsland(i + di, j + dj, new_id)
    }
  }

  let island_id = 1
  for (let [i, j] of positions) insertIsland(i, j, island_id++)
  return result
}

// Union-find solution
var numIslands2 = function (m, n, positions) {
  // converts a 2D index to a 1D one
  const getIndex = (i, j) => i * n + j

  // roots[i] gives me the parent of island[i]
  // if roots[i] = i, it means i is the root of the tree
  // each tree in roots[i] represent an island
  const roots = Array(m * n).fill(-1)

  let island_count = 0
  const result = []
  const cardinals = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [1, 0],
  ]

  for (let [i, j] of positions) {
    let curr_index = getIndex(i, j)

    if (roots[curr_index] != -1) {
      result.push(island_count)
      continue
    }

    // Insert our island, assuming its independent
    roots[curr_index] = curr_index
    island_count++

    for (let [di, dj] of cardinals) {
      const row = i + di
      const col = j + dj
      const next_index = getIndex(row, col)

      // If out of bounds or not an island
      if (row < 0 || col < 0 || row >= m || col >= n || roots[next_index] == -1) continue

      // If the inserted island is different than the neighbor one,
      // we merge both islands
      let neighbor_root = findRoot(roots, next_index)
      if (neighbor_root != curr_index) {
        roots[curr_index] = neighbor_root
        curr_index = neighbor_root
        island_count--
      }
    }

    result.push(island_count)
  }

  return result
}

const findRoot = (roots, i) => {
  while (roots[i] != i) i = roots[i]
  return i
}
