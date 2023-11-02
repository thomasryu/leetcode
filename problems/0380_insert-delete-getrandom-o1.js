/*

Implement the RandomizedSet class:
- RandomizedSet() Initializes the RandomizedSet object.
- bool insert(int val) Inserts an item val into the set if not present.
  Returns true if the item was not present, false otherwise.
- bool remove(int val) Removes an item val from the set if present.
  Returns true if the item was present, false otherwise.
- int getRandom() Returns a random element from the current set of elements
  (it's guaranteed that at least one element exists when this method is called).
  Each element must have the same probability of being returned.

You must implement the functions of the class such that each function works in average O(1) time complexity.

Example 1:
  Input
    ["RandomizedSet", "insert", "remove", "insert", "getRandom", "remove", "insert", "getRandom"]
    [[], [1], [2], [2], [], [1], [2], []]
  Output
    [null, true, false, true, 2, true, false, 2]

  Explanation
  - RandomizedSet randomizedSet = new RandomizedSet();
  - randomizedSet.insert(1); // Inserts 1 to the set. Returns true as 1 was inserted successfully.
  - randomizedSet.remove(2); // Returns false as 2 does not exist in the set.
  - randomizedSet.insert(2); // Inserts 2 to the set, returns true. Set now contains [1,2].
  - randomizedSet.getRandom(); // getRandom() should return either 1 or 2 randomly.
  - randomizedSet.remove(1); // Removes 1 from the set, returns true. Set now contains [2].
  - randomizedSet.insert(2); // 2 was already in the set, so return false.
  - randomizedSet.getRandom(); // Since 2 is the only number in the set, getRandom() will always return 2.

Constraints:
- -231 <= val <= 231 - 1
- At most 2 * 105 calls will be made to insert, remove, and getRandom.
- There will be at least one element in the data structure when getRandom is called.

*/

// Original solution
var RandomizedSet = function () {
  this.set = []
}
RandomizedSet.prototype.insert = function (val) {
  if (this.set.includes(val)) {
    return false
  }
  this.set.push(val)
  return true
}
RandomizedSet.prototype.remove = function (val) {
  if (!this.set.includes(val)) {
    return false
  }
  this.set.splice(this.set.indexOf(val), 1)
  return true
}
RandomizedSet.prototype.getRandom = function () {
  const index = Math.floor(Math.random() * this.set.length)
  return this.set[index]
}

// "Optimized" solution (minor improvement in performance)
var RandomizedSet = function () {
  this.set = []
  this.valueToIndex = new Map()
}
RandomizedSet.prototype.insert = function (val) {
  if (this.valueToIndex.has(val)) {
    return false
  }
  this.valueToIndex.set(val, this.set.length)
  this.set.push(val)
  return true
}
RandomizedSet.prototype.remove = function (val) {
  if (!this.valueToIndex.has(val)) {
    return false
  }

  const index = this.valueToIndex.get(val)

  // Update valueToIndexMap
  this.valueToIndex.set(this.set[this.set.length - 1], index) // Fill the hole with the map's last element
  this.valueToIndex.delete(val)

  // Remove the element from the array
  this.set[index] = this.set[this.set.length - 1] // Fill the hole in the array with the last element
  this.set.pop()
  return true
}
RandomizedSet.prototype.getRandom = function () {
  const index = Math.floor(Math.random() * this.set.length)
  return this.set[index]
}
