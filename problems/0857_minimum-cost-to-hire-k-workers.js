/*

There are n workers. You are given two integer arrays quality and wage where quality[i]
is the quality of the ith worker and wage[i] is the minimum wage expectation for the ith worker.

We want to hire exactly k workers to form a paid group.
To hire a group of k workers, we must pay them according to the following rules:

- Every worker in the paid group should be paid in the ratio of their quality compared to other workers in the paid group.
- Every worker in the paid group must be paid at least their minimum wage expectation.

Given the integer k, return the least amount of money needed to form a paid group satisfying the above conditions.
Answers within 10-5 of the actual answer will be accepted.

Example 1:
  Input: quality = [10,20,5], wage = [70,50,30], k = 2
  Output: 105.00000
  Explanation: We pay 70 to 0th worker and 35 to 2nd worker.

Example 2:
  Input: quality = [3,1,10,10,1], wage = [4,8,2,2,7], k = 3
  Output: 30.66667
  Explanation: We pay 4 to 0th worker, 13.33333 to 2nd and 3rd workers separately.

Constraints:
- n == quality.length == wage.length
- 1 <= k <= n <= 104
- 1 <= quality[i], wage[i] <= 104

*/

var mincostToHireWorkers = function (quality, wage, k) {
  // The salary of the group is defined by the worker with the
  // highest ratio = wage / quality among them.

  // So to minimize our max wage, we want to minimize the
  // ratio among the members of the group.

  // So we start with the K workers with the smallest ratios,
  // save the highest ratio and, for each new worker, in increasing
  // ratio order:

  // 1. We pick the current hired worker with the highest quality
  //    (because they are the one currently affecting our total wage the most)
  // 2. Subtract their quality from the current total
  // 3. Add the new worker's quality to the total
  // 4. Calculate the new total pay and compare with the current result

  let result = Infinity
  const workers = quality.map((q, i) => [wage[i] / q, q]).sort((a, b) => a[0] - b[0])
  const max_quality = new MaxPriorityQueue({ priority: (e) => e[1] }) // sorted by highest quality

  let total_quality = 0
  let max_ratio = 0
  for (let i = 0; i < workers.length; i++) {
    const [new_ratio, new_quality] = workers[i]
    max_ratio = new_ratio
    total_quality += new_quality

    // If our hired workers reached limit,
    // we have to remove one first
    if (i >= k) total_quality -= max_quality.dequeue().element[1]
    max_quality.enqueue(workers[i])

    if (max_quality.size() == k) result = Math.min(result, total_quality * max_ratio)
  }

  return result
}
