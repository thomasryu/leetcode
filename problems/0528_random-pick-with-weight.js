/*

You are given a 0-indexed array of positive integers w
where w[i] describes the weight of the ith index.

You need to implement the function pickIndex(),
which randomly picks an index in the range [0, w.length - 1] (inclusive) and returns it.
The probability of picking an index i is w[i] / sum(w).

For example, if w = [1, 3], the probability of picking index 0 is 1 / (1 + 3) = 0.25 (i.e., 25%),
and the probability of picking index 1 is 3 / (1 + 3) = 0.75 (i.e., 75%).

Example 1:
  Input
    ["Solution","pickIndex"]
    [[[1]],[]]
  Output
    [null,0]
  Explanation
    Solution solution = new Solution([1]);
    solution.pickIndex(); // return 0.
      The only option isto return 0 since there is only one element in w.

Example 2:
  Input
    ["Solution","pickIndex","pickIndex","pickIndex","pickIndex","pickIndex"]
    [[[1,3]],[],[],[],[],[]]
  Output
    [null,1,1,1,1,0]
  Explanation
    Solution solution = new Solution([1, 3]);
    solution.pickIndex(); // return 1.
      It is returning the second element (index = 1) that has a probability of 3/4.
    solution.pickIndex(); // return 1
    solution.pickIndex(); // return 1
    solution.pickIndex(); // return 1
    solution.pickIndex(); // return 0.
      It is returning the first element (index = 0) that has a probability of 1/4.
    Since this is a randomization problem, multiple answers are allowed.
    All of the following outputs can be considered correct:
      [null,1,1,1,1,0]
      [null,1,1,1,1,1]
      [null,1,1,1,0,0]
      [null,1,1,1,0,1]
      [null,1,0,1,0,0]
      ......
      and so on.

Constraints:
- 1 <= w.length <= 104
- 1 <= w[i] <= 105
- pickIndex will be called at most 104 times.

*/

// Default iterative solution
var Solution = function (w) {
  this.sum_weight = w.reduce((a, c) => a + c)
  this.weights = w
}

Solution.prototype.pickIndex = function () {
  const chosen_weight = Math.floor(Math.random() * this.sum_weight + 1)

  // We get the current sum of the weights, and if our randomized
  // choice is lesser or equal to that sum, it means we have
  // found our pick
  let sum_weight = 0
  for (let i = 0; i < this.weights.length; i++) {
    sum_weight += this.weights[i]
    if (chosen_weight <= sum_weight) return i
  }
}

// Optimized binary search solution
var Solution = function (w) {
  this.sum_weight = w.reduce((a, c) => a + c)
  this.weights = []

  let sum = 0
  for (let weight of w) this.weights.push((sum += weight))
  this.weights.unshift(0)
}

Solution.prototype.pickIndex = function () {
  const chosen_weight = Math.floor(Math.random() * this.sum_weight + 1)

  // Perform a binary search to find our number
  let tail = 0
  let head = this.weights.length

  while (tail < head) {
    const mid = Math.floor((tail + head) / 2)

    if (
      chosen_weight <= this.weights[mid] &&
      chosen_weight > this.weights[mid - 1]
    )
      return mid - 1
    else if (chosen_weight > this.weights[mid]) tail = mid + 1
    else head = mid
  }

  return -1
}
