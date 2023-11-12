/*

Given an array of intervals where intervals[i] = [start i, end i],
merge all overlapping intervals, and return an array of the non-overlapping
intervals that cover all the intervals in the input.

Example 1:
  Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
  Output: [[1,6],[8,10],[15,18]]
  Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

Example 2:
  Input: intervals = [[1,4],[4,5]]
  Output: [[1,5]]
  Explanation: Intervals [1,4] and [4,5] are considered overlapping.

Constraints:
- 1 <= intervals.length <= 104
- intervals[i].length == 2
- 0 <= starti <= endi <= 104

*/

var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0])

  let start = intervals[0][0]
  let end = intervals[0][1]

  const result = []

  let i = 1
  for (i; i < intervals.length; i++) {
    if (end >= intervals[i][0]) {
      end = Math.max(end, intervals[i][1])
      continue
    } else {
      result.push([start, end])
      start = intervals[i][0]
      end = intervals[i][1]
    }
  }
  result.push([start, end])

  return result
}
