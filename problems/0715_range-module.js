/*

A Range Module is a module that tracks ranges of numbers.
Design a data structure to track the ranges represented as
half-open intervals and query about them.

A half-open interval [left, right) denotes all the real numbers x where left <= x < right.

Implement the RangeModule class:

- RangeModule() Initializes the object of the data structure.
- void addRange(int left, int right) Adds the half-open interval [left, right),
  tracking every real number in that interval. Adding an interval that partially overlaps
  with currently tracked numbers should add any numbers in the interval [left, right)
  that are not already tracked.
- boolean queryRange(int left, int right) Returns true if every real number in th
  interval [left, right) is currently being tracked, and false otherwise.
- void removeRange(int left, int right) Stops tracking every real number currently being
  tracked in the half-open interval [left, right).

Example 1:
  Input
    ["RangeModule", "addRange", "removeRange", "queryRange", "queryRange", "queryRange"]
    [[], [10, 20], [14, 16], [10, 14], [13, 15], [16, 17]]
  Output
    [null, null, null, true, false, true]
  Explanation
    RangeModule rangeModule = new RangeModule();
    rangeModule.addRange(10, 20);
    rangeModule.removeRange(14, 16);
    rangeModule.queryRange(10, 14);
      // return True,(Every number in [10, 14) is being tracked)
    rangeModule.queryRange(13, 15);
      // return False,(Numbers like 14, 14.03, 14.17 in [13, 15) are not being tracked)
    rangeModule.queryRange(16, 17);
      // return True, (The number 16 in [16, 17) is still being tracked,
         despite the remove operation)

Constraints:
- 1 <= left < right <= 109
- At most 104 calls will be made to addRange, queryRange, and removeRange.

*/

var RangeModule = function () {
  this.ranges = []
}

// Binary search method
const binary_get_index = (compare, array, index) => {
  let left = 0
  let right = array.length
  while (left < right) {
    const mid = Math.floor((left + right) / 2)
    if (array[mid][index] < compare) left = mid + 1
    else right = mid
  }
  return left
}

RangeModule.prototype.addRange = function (left, right) {
  let insert_start = binary_get_index(left, this.ranges, 0)
  if (insert_start > 0) {
    // If previous interval overlaps with [left, right]
    if (this.ranges[insert_start - 1][1] >= left) {
      const [prev_left, prev_right] = this.ranges[insert_start - 1]
      // 1. Updates [left, right]
      ;[left, right] = [Math.min(left, prev_left), Math.max(right, prev_right)]
      // 2. Marks it to be replaced
      insert_start--
    }
  }
  let insert_end = binary_get_index(right, this.ranges, 1)
  if (insert_end < this.ranges.length) {
    // If next interval overlaps with [left, right]
    if (this.ranges[insert_end][0] <= right) {
      const [next_left, next_right] = this.ranges[insert_end]
      // 1. Updates [left, right]
      ;[left, right] = [Math.min(left, next_left), Math.max(right, next_right)]
      // 2. Marks it to be replaced
      insert_end++
    }
  }

  this.ranges.splice(insert_start, insert_end - insert_start, [left, right])
}

RangeModule.prototype.queryRange = function (left, right) {
  const query_index = binary_get_index(left, this.ranges, 0)

  // Check if previous range has queried interval
  if (query_index > 0) {
    const prev_right = this.ranges[query_index - 1][1]
    if (prev_right >= right) {
      return true
    }
  }

  // Check if current range has queries interval
  if (query_index < this.ranges.length) {
    const [curr_left, curr_right] = this.ranges[query_index]
    if (curr_left == left && curr_right >= right) {
      return true
    }
  }

  return false
}

RangeModule.prototype.removeRange = function (left, right) {
  let insert = undefined

  let remove_start = binary_get_index(left, this.ranges, 0)
  if (remove_start > 0) {
    // If previous interval's end overlaps removal's right
    // it means it splits the interval in two intervals
    if (this.ranges[remove_start - 1][1] > right) insert = [right, this.ranges[remove_start - 1][1]]

    // If previous interval's start overlaps removal's left
    // cut its right end so it doesn't
    if (this.ranges[remove_start - 1][1] > left) this.ranges[remove_start - 1][1] = left
  }

  let remove_end = binary_get_index(right, this.ranges, 1)
  if (remove_end < this.ranges.length) {
    // If previous interval's start overlaps removal's left
    // it means it splits the interval in two intervals
    if (this.ranges[remove_end][1] < left) insert = [this.ranges[remove_end][0], left]

    // If next interval's end overlaps with removal's right
    // cut its left end so it doesn't
    if (this.ranges[remove_end][0] < right) this.ranges[remove_end][0] = right
  }

  if (insert) this.ranges.splice(remove_start, remove_end - remove_start, insert)
  else this.ranges.splice(remove_start, remove_end - remove_start)
}
