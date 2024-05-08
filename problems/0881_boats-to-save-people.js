/*

You are given an array people where people[i] is the weight of the ith person,
and an infinite number of boats where each boat can carry a maximum weight of limit.
Each boat carries at most two people at the same time, provided the sum of the weight
of those people is at most limit.

Return the minimum number of boats to carry every given person.

Example 1:
  Input: people = [1,2], limit = 3
  Output: 1
  Explanation: 1 boat (1, 2)

Example 2:
  Input: people = [3,2,2,1], limit = 3
  Output: 3
  Explanation: 3 boats (1, 2), (2) and (3)

Example 3:
  Input: people = [3,5,3,4], limit = 5
  Output: 4
  Explanation: 4 boats (3), (3), (4), (5)

Constraints:
- 1 <= people.length <= 5 * 104
- 1 <= people[i] <= limit <= 3 * 104

*/

// O(N * limit)
var numRescueBoats = function (people, limit) {
  // 1. Build map
  const map = new Map()
  for (const w of people) map.set(w, (map.get(w) || 0) + 1)

  // 2. For each person
  let result = 0
  for (let w of people) {
    if (map.get(w) == 0) continue

    // Pick a boat and put them on it
    map.set(w, map.get(w) - 1)
    result++

    // Check if there are people who also fit in it,
    // starting from the complementary weight downwards
    for (let i = limit - w; i >= 1; i--) {
      // If there is one, also place them in the boat
      if (map.get(i) > 0) {
        map.set(i, map.get(i) - 1)
        break
      }
    }
  }

  return result
}

// O(N)
var numRescueBoats = function (people, limit) {
  people.sort((a, b) => a - b)
  let curr_max = people.length - 1
  let curr_min = 0

  let result = 0

  while (curr_max > curr_min) {
    // 1. Pick a new boat, and place the max weight person in it
    result++
    const remaining = limit - people[curr_max]
    curr_max--
    // 2. If the min weight person fit also, place them
    if (remaining >= people[curr_min]) curr_min++
  }

  // 3. If there is still a person left, pick a boat for them
  if (curr_max == curr_min) result++

  return result
}
