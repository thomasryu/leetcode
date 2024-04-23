/*

You are given two lists of closed intervals, firstList and secondList,
where firstList[i] = [starti, endi] and secondList[j] = [startj, endj].
Each list of intervals is pairwise disjoint and in sorted order.

Return the intersection of these two interval lists.

A closed interval [a, b] (with a <= b) denotes the set of real numbers x with a <= x <= b.

The intersection of two closed intervals is a set of real numbers that are either empty or
represented as a closed interval. For example, the intersection of [1, 3] and [2, 4] is [2, 3].

Example 1:
  Input: firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]]
  Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]

Example 2:
  Input: firstList = [[1,3],[5,9]], secondList = []
  Output: []

Constraints:
- 0 <= firstList.length, secondList.length <= 1000
- firstList.length + secondList.length >= 1
- 0 <= starti < endi <= 109
- endi < starti+1
- 0 <= startj < endj <= 109
- endj < startj+1

*/

var intervalIntersection = function (firstList, secondList) {
  const m = firstList.length
  const n = secondList.length

  let i = 0 // firstList pointer
  let j = 0 // secondList pointer

  const result = []

  while (i < m && j < n) {
    const [start_first, end_first] = firstList[i]
    const [start_second, end_second] = secondList[j]

    // Check if there is an intersection
    const first_intesects_second =
      start_first >= start_second && start_first <= end_second
    const second_intersects_first =
      start_second >= start_first && start_second <= end_first

    // If they do, insert intersection
    if (first_intesects_second || second_intersects_first) {
      const intersection = [
        Math.max(start_first, start_second),
        Math.min(end_first, end_second),
      ]
      result.push(intersection)
    }

    // Move pointer based on which interval ends earlier
    if (end_first < end_second) i++
    else j++
  }

  return result
}