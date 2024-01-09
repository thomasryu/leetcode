/*

You are given an integer n. There are n rooms numbered from 0 to n - 1.

You are given a 2D integer array meetings where meetings[i] = [starti, endi]
means that a meeting will be held during the half-closed time interval [starti, endi).
All the values of starti are unique.

Meetings are allocated to rooms in the following manner:

- Each meeting will take place in the unused room with the lowest number.
- If there are no available rooms, the meeting will be delayed until a room becomes free.
  The delayed meeting should have the same duration as the original meeting.
- When a room becomes unused, meetings that have an earlier original start time should be given the room.
- Return the number of the room that held the most meetings.
  If there are multiple rooms, return the room with the lowest number.

A half-closed interval [a, b) is the interval between a and b including a and not including b.

Example 1:
  Input: n = 2, meetings = [[0,10],[1,5],[2,7],[3,4]]
  Output: 0
  Explanation:
    - At time 0, both rooms are not being used. The first meeting starts in room 0.
    - At time 1, only room 1 is not being used. The second meeting starts in room 1.
    - At time 2, both rooms are being used. The third meeting is delayed.
    - At time 3, both rooms are being used. The fourth meeting is delayed.
    - At time 5, the meeting in room 1 finishes. The third meeting starts in room 1 for the time period [5,10).
    - At time 10, the meetings in both rooms finish. The fourth meeting starts in room 0 for the time period [10,11).
    Both rooms 0 and 1 held 2 meetings, so we return 0.

Example 2:
  Input: n = 3, meetings = [[1,20],[2,10],[3,5],[4,9],[6,8]]
  Output: 1
  Explanation:
    - At time 1, all three rooms are not being used. The first meeting starts in room 0.
    - At time 2, rooms 1 and 2 are not being used. The second meeting starts in room 1.
    - At time 3, only room 2 is not being used. The third meeting starts in room 2.
    - At time 4, all three rooms are being used. The fourth meeting is delayed.
    - At time 5, the meeting in room 2 finishes. The fourth meeting starts in room 2 for the time period [5,10).
    - At time 6, all three rooms are being used. The fifth meeting is delayed.
    - At time 10, the meetings in rooms 1 and 2 finish. The fifth meeting starts in room 1 for the time period [10,12).
    Room 0 held 1 meeting while rooms 1 and 2 each held 2 meetings, so we return 1.

Constraints:
- 1 <= n <= 100
- 1 <= meetings.length <= 105
- meetings[i].length == 2
- 0 <= starti < endi <= 5 * 105
- All the values of starti are unique.

*/

// Unoptimized solution
var mostBooked = function (n, meetings) {
  meetings.sort((a, b) => a[0] - b[0])
  const schedule = Array(n)
    .fill()
    .map((_, i) => {
      return { index: i, time: 0, uses: 0 }
    })

  // We sort the schedule first by earliest available time, then by lowest index
  const sortSchedule = (start) =>
    schedule.sort((a, b) => {
      // All rooms available before a meeting's start time should have equal
      // "weight" in the sorting (index should be the only tiebreaker)
      const aStart = Math.max(a.time - start, 0)
      const bStart = Math.max(b.time - start, 0)
      return aStart - bStart || a.index - b.index
    })

  // For each room, we sort the schedule array
  // and get the first available or earliest available room
  for (let m of meetings) {
    sortSchedule(m[0])
    schedule[0].time = Math.max(schedule[0].time + (m[1] - m[0]), m[1])
    schedule[0].uses++
  }

  // We get the room with the most uses
  schedule.sort((a, b) => b.uses - a.uses || a.index - b.index)[0].index
  return schedule[0].index
}

// Optimize iterative solution (O(n * m))
var mostBooked = function (n, meetings) {
  meetings.sort((a, b) => a[0] - b[0])

  const room_uses = Array(n).fill(0) // Uses of each room
  const available_time = Array(n).fill(0) // Next available time of each room

  for (let meeting of meetings) {
    const [start, end] = meeting

    // Used in case there are no available rooms
    let found_room = false
    let earliest_available_room = 0
    let earliest_available_time = Infinity

    for (let i = 0; i < n; i++) {
      // We found an available room
      if (available_time[i] <= start) {
        found_room = true
        room_uses[i]++
        available_time[i] = end
        break
      }

      // We store the earliest available room in
      // case we don't find an already available one
      if (available_time[i] < earliest_available_time) {
        earliest_available_time = available_time[i]
        earliest_available_room = i
      }
    }

    // If no room was found, we book the earliest available one
    if (!found_room) {
      room_uses[earliest_available_room]++
      available_time[earliest_available_room] =
        earliest_available_time + (end - start)
    }
  }

  return room_uses.indexOf(Math.max(...room_uses))
}

// Optimized two heaps solution (worse than iterative)
var mostBooked = function (n, meetings) {
  meetings.sort((a, b) => a[0] - b[0])

  const room_uses = Array(n).fill(0)

  // Since we have two different criteria for when there are available rooms and when there're none,
  // we use two priority queues to reflect that:

  // 1. available_rooms: sorted by index
  // 2. occupied_rooms: first sorted by available time, then index as a tie breaker (since 1 <= n <= 100)
  //                    we divide by 1000 so the index strictly serves as a tiebreaker
  const available_rooms = new MinPriorityQueue({
    priority: (room) => room.index,
  })
  const occupied_rooms = new MinPriorityQueue({
    priority: (room) => room.time + room.index / 1000,
  })

  // Every room start as available
  for (let i = 0; i < n; i++) available_rooms.enqueue({ index: i, time: 0 })

  for (let meeting of meetings) {
    const [start, end] = meeting

    // Move all now-available rooms to the proper queue
    while (
      !occupied_rooms.isEmpty() &&
      occupied_rooms.front().element.time <= start
    )
      available_rooms.enqueue(occupied_rooms.dequeue().element)

    // Determine the chosen room based on whether there are available rooms
    let chosen_room
    if (available_rooms.isEmpty()) {
      chosen_room = occupied_rooms.dequeue().element
      chosen_room.time += end - start
    } else {
      chosen_room = available_rooms.dequeue().element
      chosen_room.time = end
    }

    room_uses[chosen_room.index]++
    occupied_rooms.enqueue(chosen_room)
  }

  return room_uses.indexOf(Math.max(...room_uses))
}
