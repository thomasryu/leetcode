/*

Given a 0-indexed n x n integer matrix grid,
return the number of pairs (ri, cj) such that row ri and column cj are equal.

A row and column pair is considered equal if they contain the same elements
in the same order (i.e., an equal array).

Example 1:
  Input: grid = [[3,2,1],[1,7,6],[2,7,7]]
  Output: 1
    Explanation: There is 1 equal row and column pair:
                 - (Row 2, Column 1): [2,7,7]

Example 2:
  Input: grid = [[3,1,2,2],[1,4,4,5],[2,4,2,2],[2,4,2,2]]
  Output: 3
  Explanation: There are 3 equal row and column pairs:
               - (Row 0, Column 0): [3,1,2,2]
               - (Row 2, Column 2): [2,4,2,2]
               - (Row 3, Column 2): [2,4,2,2]

Constraints:
- n == grid.length == grid[i].length
- 1 <= n <= 200
- 1 <= grid[i][j] <= 105

*/

// Graph solution (inefficient)
var equalPairs = function (grid) {
  const n = grid.length
  const rowGraph = {}

  let result = 0

  // Create the row graph
  for (let i = 0; i < n; i++) {
    let node = rowGraph

    for (let j = 0; j < n; j++) {
      const num = grid[i][j]
      node[num] || (node[num] = {})
      node = node[num]
    }

    // We also keep count how many times  a row sequence has appeared,
    // because a pair column will increase the result counter by count (and not just by 1)
    node.count || (node.count = 0)
    node.count++
  }

  // Navigate the row graph now using columns
  for (let j = 0; j < n; j++) {
    let node = rowGraph

    for (let i = 0; i < n; i++) {
      const num = grid[i][j]
      if (node[num]) node = node[num]
      else break
    }

    if (node.count != null) result += node.count
  }

  return result
}

// Hash solution
var equalPairs = function (grid) {
  let result = 0
  const rowHash = new Map()

  for (let row of grid) {
    const s = row.join(',')
    rowHash.set(s, (rowHash.get(s) || 0) + 1)
  }

  for (let j = 0; j < grid[0].length; j++) {
    const column = grid.map((row) => row[j])
    const s = column.join(',')
    result += rowHash.get(s) || 0
  }

  return result
}
