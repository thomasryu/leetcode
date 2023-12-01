// O(n) solution (interactive)
var findPeakElement = function (nums) {
  nums.push(-Infinity)
  nums.unshift(-Infinity)
  for (let i = 1; i < nums.length - 1; i++)
    if (nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) return i - 1
  return -1
}

// O(log n) solution (binary search)
var findPeakElement = function (nums) {
  const n = nums.length

  if (n == 1) return 0
  if (nums[1] < nums[0]) return 0
  if (nums[n - 2] < nums[n - 1]) return n - 1

  let start = 0
  let end = n

  while (start <= end) {
    const mid = Math.floor((start + end) / 2)

    if (nums[mid] > nums[mid - 1] && nums[mid] > nums[mid + 1]) return mid
    if (nums[mid] < nums[mid - 1]) end = mid
    // (nums[mid] < nums[mid + 1])
    else start = mid + 1
  }

  return -1
}
