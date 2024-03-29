/*

You are given an array representing a row of seats where seats[i] = 1
represents a person sitting in the ith seat, and seats[i] = 0
represents that the ith seat is empty (0-indexed).

There is at least one empty seat, and at least one person sitting.

Alex wants to sit in the seat such that the distance between him
and the closest person to him is maximized.

Return that maximum distance to the closest person.

Example 1:
  Input: seats = [1,0,0,0,1,0,1]
  Output: 2
  Explanation:
    If Alex sits in the second open seat (i.e. seats[2]), then the closest person has distance 2.
    If Alex sits in any other open seat, the closest person has distance 1.
    Thus, the maximum distance to the closest person is 2.

Example 2:
  Input: seats = [1,0,0,0]
  Output: 3
  Explanation:
    If Alex sits in the last seat (i.e. seats[3]), the closest person is 3 seats away.
    This is the maximum distance possible, so the answer is 3.

Example 3:
  Input: seats = [0,1]
  Output: 1

Constraints:
- 2 <= seats.length <= 2 * 104
- seats[i] is 0 or 1.
- At least one seat is empty.
- At least one seat is occupied.

*/

var maxDistToClosest = function (seats) {
  let max_zero_length = 0
  let max_zero_edge_length = 0

  for (let i = 0; i < seats.length; i++) {
    if (seats[i] == 0) {
      let j = i + 1
      while (seats[j] == 0) j++

      max_zero_length = Math.max(max_zero_length, j - i)
      if (i == 0 || j == seats.length) max_zero_edge_length = Math.max(max_zero_edge_length, j - i)

      i = j - 1
    }
  }

  return Math.max(Math.floor(max_zero_length / 2) + (max_zero_length % 2 == 0 ? 0 : 1), max_zero_edge_length)
}
