/*

Given an unsorted array of integers nums,
return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.

Example 1:
  Input: nums = [100,4,200,1,3,2]
  Output: 4
  Explanation: The longest consecutive elements sequence is [1, 2, 3, 4].
               Therefore its length is 4.

Example 2:
  Input: nums = [0,3,7,2,5,8,4,6,0,1]
  Output: 9

Constraints:
- 0 <= nums.length <= 105
- -109 <= nums[i] <= 109

*/

var longestConsecutive = function (nums) {
  nums.sort((a, b) => a - b)

  let current = 1
  let result = Math.min(nums.length, 1)

  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i + 1] == nums[i] + 1) {
      current++
      result = Math.max(result, current)
    } else if (nums[i + 1] == nums[i]) {
      continue
    } else current = 1
  }

  return result
}

// Attempt made at 04/04/2024
var longestConsecutive = function (nums) {
  if (nums.length == 0) return 0

  const set = new Set(nums)
  let result = 1

  for (let num of set.values()) {
    if (set.has(num + 1) && !set.has(num - 1)) {
      let i = 1
      while (set.has(num + 1)) {
        num += 1
        i++
      }
      result = Math.max(i, result)
    }
  }

  return result
}

// Attempt made at 04/04/2024
var longestConsecutive = function (nums) {
  if (nums.length == 0) return 0

  class UnionFind {
    constructor() {
      this.parent = new Map()
      this.size = new Map()
    }

    add(a) {
      this.parent.set(a, a)
      this.size.set(a, 1)
    }

    find(n) {
      if (this.parent.get(n) == n) return n
      this.parent.set(n, this.find(this.parent.get(n)))
      return this.parent.get(n)
    }

    union(a, b) {
      const root_a = this.find(a)
      const root_b = this.find(b)

      if (root_a == root_b) return

      const size_a = this.size.get(root_a)
      const size_b = this.size.get(root_b)

      if (size_a >= size_b) {
        this.parent.set(root_b, root_a)
        this.size.set(root_a, size_a + size_b)
      } else {
        this.parent.set(root_a, root_b)
        this.size.set(root_b, size_a + size_b)
      }
    }
  }

  const union_find = new UnionFind()
  for (let n of nums) {
    if (union_find.parent.has(n)) continue

    union_find.add(n)
    if (union_find.parent.has(n - 1)) union_find.union(n, n - 1)
    if (union_find.parent.has(n + 1)) union_find.union(n, n + 1)
  }

  return Math.max(...union_find.size.values())
}
