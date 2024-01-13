/*

Implement a SnapshotArray that supports the following interface:

- SnapshotArray(int length) initializes an array-like data structure with the given length.
  Initially, each element equals 0.
- void set(index, val) sets the element at the given index to be equal to val.
- int snap() takes a snapshot of the array and returns the snap_id:
  the total number of times we called snap() minus 1.
- int get(index, snap_id) returns the value at the given index,
  at the time we took the snapshot with the given snap_id

Example 1:
  Input: ["SnapshotArray","set","snap","set","get"]
         [[3],[0,5],[],[0,6],[0,0]]
  Output: [null,null,0,null,5]
  Explanation:
    SnapshotArray snapshotArr = new SnapshotArray(3); // set the length to be 3
    snapshotArr.set(0,5);  // Set array[0] = 5
    snapshotArr.snap();  // Take a snapshot, return snap_id = 0
    snapshotArr.set(0,6);
    snapshotArr.get(0,0);  // Get the value of array[0] with snap_id = 0, return 5

Constraints:
- 1 <= length <= 5 * 104
- 0 <= index < length
- 0 <= val <= 109
- 0 <= snap_id < (the total number of times we call snap())
- At most 5 * 104 calls will be made to set, snap, and get.

*/

// Unoptimized binary search solution
var SnapshotArray = function (length) {
  this.latest = Array(length).fill(0)
  this.history = {}

  this.changed_indexes = new Set()
  this.snaps_count = 0
}

SnapshotArray.prototype.set = function (index, val) {
  this.latest[index] = val
  this.changed_indexes.add(index) // We only need to snap indexes that changed
}

SnapshotArray.prototype.snap = function () {
  for (let i of this.changed_indexes.values()) {
    this.history[i] || (this.history[i] = [])
    this.history[i].push([this.snaps_count, this.latest[i]])
  }
  return this.snaps_count++
}

SnapshotArray.prototype.get = function (index, snap_id) {
  const found_log = binarySearch(snap_id, this.history[index])
  return this.history[index][found_log][1]
}

const binarySearch = (snap_id, array) => {
  let tail = 0
  let head = array.length

  while (tail < head) {
    const mid = Math.floor((tail + head) / 2)
    const curr_id = array[mid][0]
    if (curr_id == snap_id) return mid
    else if (curr_id < snap_id) tail = mid + 1
    else head = mid
  }

  return tail - 1
}

// Optimized solution
var SnapshotArray = function (length) {
  this.latest = {}
  this.history = []
  this.changed = false
}

SnapshotArray.prototype.set = function (index, val) {
  this.latest[index] = val
  this.changed = true
}

SnapshotArray.prototype.snap = function () {
  if (this.changed || this.history.length == 0)
    this.history.push({ ...this.latest })
  else this.history.push(this.history[this.history.length - 1])

  this.changed = false
  return this.history.length - 1
}

SnapshotArray.prototype.get = function (index, snap_id) {
  console.log(this.history)
  return this.history[snap_id][index] || 0
}
