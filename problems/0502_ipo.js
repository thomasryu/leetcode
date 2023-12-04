/*

Suppose LeetCode will start its IPO soon.
In order to sell a good price of its shares to Venture Capital,
LeetCode would like to work on some projects to increase its capital before the IPO.
Since it has limited resources, it can only finish at most k distinct projects before the IPO.
Help LeetCode design the best way to maximize its total capital after finishing at most k distinct projects.

You are given n projects where the ith project has a pure profit profits[i]
and a minimum capital of capital[i] is needed to start it.

Initially, you have w capital. When you finish a project,
you will obtain its pure profit and the profit will be added to your total capital.

Pick a list of at most k distinct projects from given projects to maximize your final capital,
and return the final maximized capital.

The answer is guaranteed to fit in a 32-bit signed integer.

Example 1:
  Input: k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]
  Output: 4
  Explanation: Since your initial capital is 0, you can only start the project indexed 0.
               After finishing it you will obtain profit 1 and your capital becomes 1.
               With capital 1, you can either start the project indexed 1 or the project indexed 2.
               Since you can choose at most 2 projects, you need to finish the project indexed 2 to get the maximum capital.
               Therefore, output the final maximized capital, which is 0 + 1 + 3 = 4.

Example 2:
  Input: k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]
  Output: 6

Constraints:
- 1 <= k <= 105
- 0 <= w <= 109
- n == profits.length
- n == capital.length
- 1 <= n <= 105
- 0 <= profits[i] <= 104
- 0 <= capital[i] <= 109

*/

// Inefficient solution (time limit exceeded, recursion + backtracking)
var findMaximizedCapital = function (k, w, profits, capital) {
  const n = profits.length
  const chosen = new Set()

  const choose = (current) => {
    if (chosen.size == k) return current

    let max = current
    for (let i = 0; i < n; i++) {
      // If we already finished project i or we don't
      // have the funds to start it, we skip it
      if (chosen.has(i) || capital[i] > current) continue

      // Else we perform a backtracking recursive call
      chosen.add(i)
      max = Math.max(max, choose(current + profits[i]))
      chosen.delete(i)
    }

    return max
  }

  return choose(w)
}

// Efficient solution (heap / priority queue)
var findMaximizedCapital = function (k, w, profits, capital) {
  const n = profits.length

  // Create a tuple and sort it by capital
  const tuple = []
  for (let i = 0; i < n; i++) tuple.push([capital[i], profits[i]])
  tuple.sort((a, b) => a[0] - b[0])

  // Create a heap where profits[i] determine its priority
  const heap = new MaxPriorityQueue({ priority: (i) => tuple[i][1] })

  let i = 0
  while (k--) {
    // We add all affordable projects to the heap
    while (i < n && tuple[i][0] <= w) {
      heap.enqueue(i)
      i++
    }

    // We pick the project with the highest profit
    const pick = heap.dequeue()?.element
    if (pick != null) w += tuple[pick][1]
    else return w
  }

  return w
}

// Very efficient solution (interactive)
var findMaximizedCapital = function (k, w, profits, capital) {
  // If all projects are affordable, we select the k most profitable ones
  // (this pre-condition is why we save so much time, else the time limit would be exceeded)
  if (w >= Math.max(...capital)) {
    profits.sort((a, b) => b - a)
    return profits.slice(0, k).reduce((a, c) => a + c, w)
  }

  for (let i = 0; i < k; i++) {
    let profit = 0
    let project = -1

    // We select the project with highest profit
    for (let j = 0; j < profits.length; j++) {
      if (w < capital[j]) continue

      if (profits[j] >= profit) {
        project = j
        profit = profits[j]
      }
    }

    if (project === -1) {
      break
    }

    // Mark the current project as "visited"
    capital[project] = Infinity
    w += profit
  }

  return w
}
