/*

Given two arrays of strings list1 and list2,
find the common strings with the least index sum.

A common string is a string that appeared in both list1 and list2.

A common string with the least index sum is a common string such that if it appeared
at list1[i] and list2[j] then i + j should be the minimum value among all the other common strings.

Return all the common strings with the least index sum. Return the answer in any order.

Example 1:
  Input: list1 = ["Shogun","Tapioca Express","Burger King","KFC"],
    list2 = ["Piatti","The Grill at Torrey Pines","Hungry Hunter Steakhouse","Shogun"]
  Output: ["Shogun"]
  Explanation: The only common string is "Shogun".

Example 2:
  Input: list1 = ["Shogun","Tapioca Express","Burger King","KFC"], list2 = ["KFC","Shogun","Burger King"]
  Output: ["Shogun"]
  Explanation: The common string with the least index sum is "Shogun" with index sum = (0 + 1) = 1.

Example 3:
  Input: list1 = ["happy","sad","good"], list2 = ["sad","happy","good"]
  Output: ["sad","happy"]
  Explanation: There are three common strings:
    "happy" with index sum = (0 + 1) = 1.
    "sad" with index sum = (1 + 0) = 1.
    "good" with index sum = (2 + 2) = 4.
    The strings with the least index sum are "sad" and "happy".

Constraints:
- 1 <= list1.length, list2.length <= 1000
- 1 <= list1[i].length, list2[i].length <= 30
- list1[i] and list2[i] consist of spaces ' ' and English letters.
- All the strings of list1 are unique.
- All the strings of list2 are unique.
- There is at least a common string between list1 and list2.

*/

var findRestaurant = function (list1, list2) {
  const m = list1.length
  const n = list2.length

  let result = []

  const map1 = new Map()
  const map2 = new Map()

  for (let i = m - 1; i >= 0; i--) map1.set(list1[i], i)

  for (let i = n - 1; i >= 0; i--) map2.set(list2[i], i)

  let min_sum = m + n
  for (let [key, i] of map1.entries()) {
    if (!map2.has(key)) continue

    const j = map2.get(key)
    if (i + j == min_sum) result.push(key)
    else if (i + j < min_sum) {
      result = [key]
      min_sum = i + j
    }
  }

  return result
}
