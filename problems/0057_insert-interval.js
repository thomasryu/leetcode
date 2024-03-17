/*

You are given an array of non-overlapping intervals intervals
where intervals[i] = [start i, end i] represent the start and
the end of the ith interval and intervals is sorted in ascending order by start i.
You are also given an interval newInterval = [start, end]
that represents the start and end of another interval.

Insert newInterval into intervals such that intervals is still sorted
in ascending order by start i and intervals still does not have any overlapping intervals
(merge overlapping intervals if necessary).

Return intervals after the insertion.

Example 1:
  Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
  Output: [[1,5],[6,9]]

Example 2:
  Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
  Output: [[1,2],[3,10],[12,16]]
  Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

Constraints:
- 0 <= intervals.length <= 104
- intervals[i].length == 2
- 0 <= starti <= endi <= 105
- intervals is sorted by starti in ascending order.
- newInterval.length == 2
- 0 <= start <= end <= 105

*/

var insert = function (intervals, newInterval) {
  intervals.push(newInterval)
  intervals.sort((a, b) => a[0] - b[0])

  const result = []

  let start = intervals[0][0]
  let end = intervals[0][1]

  for (let i = 1; i < intervals.length; i++) {
    if (end >= intervals[i][0]) {
      end = Math.max(end, intervals[i][1])
      continue
    }

    result.push([start, end])
    start = intervals[i][0]
    end = intervals[i][1]
  }

  result.push([start, end])

  return result
}

// Attempt made at 17/03/2024
var insert = function (intervals, new_interval) {
  const result = []

  let [new_start, new_end] = new_interval
  let inserted_new_interval = false

  for (let [start, end] of intervals) {
    // 1. If new_start > end (i.e. new_interval is fully AFTER the current one)
    //    OR if new_interval was already inserted, we simply insert current interval
    if (inserted_new_interval || new_start > end) {
      result.push([start, end])
    }

    // 2. If new_end < start (i.e. new_inteval is fully BEFORE the current one),
    //    we insert new_interval, insert current interval after
    else if (new_end < start) {
      result.push([new_start, new_end])
      result.push([start, end])
      inserted_new_interval = true
    }

    // 3. (INTERSECTION) If new_start < start
    //  3.1. If new_end <= end, new_interval becomes [new_start, end]
    //       and we insert it, since no more intersections will happen.
    //  3.2. If new_end > end, we skip current interval entirely and proceed
    else if (new_start <= start) {
      if (new_end < end) {
        result.push([new_start, end])
        inserted_new_interval = true
      }
      // else, do nothing
    }

    // 4. (INTESECTION) If new_start >= start
    //  4.1 If new_end <= end, current interval engulfs new_interval entirely,
    //      which means it won't affect intervals[], so we just return intervals[]
    //  4.2 If new_end > end, new_interval becomes [start, new_end] and CAN intersections
    //      with further intervals
    else if (new_start >= start) {
      if (new_end <= end) return intervals
      else new_start = start
    }
  }

  if (!inserted_new_interval) result.push([new_start, new_end])
  return result
}
