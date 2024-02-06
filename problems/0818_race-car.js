/*

Your car starts at position 0 and speed +1 on an infinite number line. Your car can go into negative positions.
Your car drives automatically according to a sequence of instructions 'A' (accelerate) and 'R' (reverse):

- When you get an instruction 'A', your car does the following:
  - position += speed
  - speed *= 2
- When you get an instruction 'R', your car does the following:
  - If your speed is positive then speed = -1
  - otherwise speed = 1
  Your position stays the same.

For example, after commands "AAR", your car goes to positions 0 --> 1 --> 3 --> 3,
and your speed goes to 1 --> 2 --> 4 --> -1.

Given a target position target, return the length of the shortest sequence of instructions to get there.

Example 1:
  Input: target = 3
  Output: 2
  Explanation:
    The shortest instruction sequence is "AA".
    Your position goes from 0 --> 1 --> 3.

Example 2:
  Input: target = 6
  Output: 5
  Explanation:
    The shortest instruction sequence is "AAARA".
    Your position goes from 0 --> 1 --> 3 --> 7 --> 7 --> 6.

Constraints:
- 1 <= target <= 104

*/

var racecar = function (target) {
  let queue = [[0, 1, 0]]

  const tested = new Set()

  while (queue.length) {
    const [position, speed, moves] = queue.shift()
    if (position == target) return moves

    // If we already been to this position, with this speed before,
    // it means we did so in less moves
    const key = `${position},${speed}`
    if (tested.has(key)) continue
    tested.add(key)

    queue.push([position + speed, speed * 2, moves + 1]) // accelerate

    // We only attempt to reverse if we are moving past the target, either
    // by moving to its right having a positive speed or
    // by moving to its left having a negative speed
    if ((position + speed > target && speed > 0) || (position + speed < target && speed < 0))
      queue.push([position, speed > 0 ? -1 : 1, moves + 1]) // reverse
  }
}
