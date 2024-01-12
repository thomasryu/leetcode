/*

Given an array of meeting time intervals intervals where intervals[i] = [starti, endi],
return the minimum number of conference rooms required.

Example 1:
  Input: intervals = [[0,30],[5,10],[15,20]]
  Output: 2

Example 2:
  Input: intervals = [[7,10],[2,4]]
  Output: 1

Constraints:
- 1 <= intervals.length <= 104
- 0 <= starti < endi <= 106

*/

var minMeetingRooms = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0])
  const rooms = [] // Stores the next available time each meeting room

  for (let [start, end] of intervals) {
    let i = 0

    // Check if there are previously used rooms available
    for (; i < rooms.length; i++)
      if (rooms[i] <= start) {
        rooms[i] = end
        break
      }

    // No used rooms were available
    if (i == rooms.length) rooms.push(end)
  }

  return rooms.length
}
