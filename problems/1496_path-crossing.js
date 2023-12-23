/*

Given a string path, where path[i] = 'N', 'S', 'E' or 'W',
each representing moving one unit north, south, east, or west, respectively.
You start at the origin (0, 0) on a 2D plane and walk on the path specified by path.

Return true if the path crosses itself at any point, that is,
if at any time you are on a location you have previously visited. Return false otherwise.

Example 1:
  Input: path = "NES"
  Output: false
  Explanation: Notice that the path doesn't cross any point more than once.

Example 2:
  Input: path = "NESWW"
  Output: true
  Explanation: Notice that the path visits the origin twice.

Constraints:
- 1 <= path.length <= 104
- path[i] is either 'N', 'S', 'E', or 'W'.

*/

var isPathCrossing = function (path) {
  let current = [0, 0]
  const visited = new Set(['0,0'])

  const map = {
    N: [0, 1],
    S: [0, -1],
    E: [1, 0],
    W: [-1, 0],
  }

  for (let step of path) {
    const [dx, dy] = map[step]
    current = [current[0] + dx, current[1] + dy]
    const key = `${current[0]},${current[1]}`

    if (visited.has(key)) return true
    else visited.add(key)
  }

  return false
}
