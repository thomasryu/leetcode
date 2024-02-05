/*

Given a list of 24-hour clock time points in "HH:MM" format,
return the minimum minutes difference between any two time-points in the list.

Example 1:
  Input: timePoints = ["23:59","00:00"]
  Output: 1

Example 2:
  Input: timePoints = ["00:00","23:59","00:00"]
  Output: 0

Constraints:
- 2 <= timePoints.length <= 2 * 104
- timePoints[i] is in the format "HH:MM".

*/

var findMinDifference = function (timePoints) {
  const times = []
  const day_in_mins = 24 * 60

  for (let time of timePoints) {
    const [hours, mins] = time.split(':')
    times.push(+hours * 60 + +mins)
  }
  times.sort((a, b) => a - b)

  let result = Infinity
  for (let i = 0; i < times.length; i++) {
    const prev_index = (i - 1 + times.length) % times.length
    const delta = Math.abs((times[i] - times[prev_index] + day_in_mins) % day_in_mins)
    result = Math.min(result, delta)
  }

  return result
}
