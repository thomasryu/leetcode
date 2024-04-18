/*

There is an exam room with n seats in a single row labeled from 0 to n - 1.

When a student enters the room, they must sit in the seat that maximizes the distance to the closest person.
If there are multiple such seats, they sit in the seat with the lowest number.
If no one is in the room, then the student sits at seat number 0.

Design a class that simulates the mentioned exam room.

Implement the ExamRoom class:

- ExamRoom(int n) Initializes the object of the exam room with the number of the seats n.
- int seat() Returns the label of the seat at which the next student will set.
- void leave(int p) Indicates that the student sitting at seat p will leave the room.
  It is guaranteed that there will be a student sitting at seat p.

Example 1:
  Input
    ["ExamRoom", "seat", "seat", "seat", "seat", "leave", "seat"]
    [[10], [], [], [], [], [4], []]
  Output
    [null, 0, 9, 4, 2, null, 5]
  Explanation
    ExamRoom examRoom = new ExamRoom(10);
    examRoom.seat(); // return 0, no one is in the room, then the student sits at seat number 0.
    examRoom.seat(); // return 9, the student sits at the last seat number 9.
    examRoom.seat(); // return 4, the student sits at the last seat number 4.
    examRoom.seat(); // return 2, the student sits at the last seat number 2.
    examRoom.leave(4);
    examRoom.seat(); // return 5, the student sits at the last seat number 5.

Constraints:
- 1 <= n <= 109
- It is guaranteed that there is a student sitting at seat p.
- At most 104 calls will be made to seat and leave.

*/

var ExamRoom = function (n) {
  this.seated = []
  this.size = n
}

ExamRoom.prototype.seat = function () {
  if (this.seated.length == 0) {
    this.seated.unshift(0)
    return 0
  }

  // We initialize max_dist with the max between:
  // 1. The distance of the left wall to the first student
  // 2. The distance of the right wall to the last student
  const left_wall_dist = this.seated[0]
  const right_wall_dist = this.size - 1 - this.seated[this.seated.length - 1]
  let max_dist = Math.max(left_wall_dist, right_wall_dist)

  // Check the distance between students for max distance
  for (let i = 0; i < this.seated.length - 1; i++) {
    const dist = Math.floor((this.seated[i + 1] - this.seated[i]) / 2)
    max_dist = Math.max(max_dist, dist)
  }

  // If max distance is from the left wall, set student at first chair
  if (max_dist == left_wall_dist) {
    this.seated.unshift(0)
    return 0
  }

  // If the max distance is between two students, seat it there
  for (let i = 0; i < this.seated.length - 1; i++) {
    const dist = Math.floor((this.seated[i + 1] - this.seated[i]) / 2)
    if (max_dist == dist) {
      const insert_index = Math.floor((this.seated[i + 1] + this.seated[i]) / 2)
      this.seated.splice(i + 1, 0, insert_index)
      return insert_index
    }
  }

  // Else, the distance is between the last student and the right wall
  this.seated.push(this.size - 1)
  return this.size - 1
}

ExamRoom.prototype.leave = function (p) {
  for (let i = 0; i < this.seated.length; i++)
    if (this.seated[i] == p) this.seated.splice(i, 1)
}
