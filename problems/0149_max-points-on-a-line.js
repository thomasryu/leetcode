/*

Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane,
return the maximum number of points that lie on the same straight line.

Example 1:
  Input: points = [[1,1],[2,2],[3,3]]
  Output: 3

Example 2:
  Input: points = [[1,1],[3,2],[5,3],[4,1],[2,3],[1,4]]
  Output: 4

Constraints:
- 1 <= points.length <= 300
- points[i].length == 2
- -104 <= xi, yi <= 104
- All the points are unique.

*/

// Inefficient solution
var maxPoints = function (points) {
  const formulas = {}
  const visited = new Set()

  // Given two points, return m & n such as y = mx + n
  const getFormula = (a, b) => {
    const [xa, ya] = points[a]
    const [xb, yb] = points[b]

    if (xa == xb) return `vert${xa}`

    const m = (yb - ya) / (xb - xa) // slope = rise / run
    const n = ya - m * xa // ya = m * xa + n -> n = ya - m * xa

    return `y=${m}x+${n}`
  }

  let result = 1

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const key = `${i},${j}`
      if (visited.has(key)) continue

      const formula = getFormula(i, j)
      formulas[formula] || (formulas[formula] = new Set())

      formulas[formula].add(i)
      formulas[formula].add(j)
      visited.add(key)
      visited.add(`${j},${i}`) // The formula of [a, b] is the same for [b, a]
    }
  }
  for (let formula in formulas)
    result = Math.max(result, formulas[formula].size)

  return result
}

// Efficient solution
var maxPoints = function (points) {
  const slopes = new Map()

  // This time, since we are always comparing points against the same point i
  // (i.e., we reset the slops map every iteration of i), we only need to
  // calculate m, not n, since the line inclination is all that matters
  const getSlope = (a, b) => {
    const [xa, ya] = points[a]
    const [xb, yb] = points[b]

    if (xa == xb) return Infinity
    return (yb - ya) / (xb - xa) // slope = rise / run
  }

  let result = 1

  for (let i = 0; i < points.length; i++) {
    for (let j = 0; j < points.length; j++) {
      if (i == j) continue
      const slope = getSlope(i, j)

      if (slopes.has(slope)) slopes.set(slope, slopes.get(slope) + 1)
      else slopes.set(slope, 2)

      result = Math.max(result, slopes.get(slope))
    }

    slopes.clear()
  }

  return result
}
