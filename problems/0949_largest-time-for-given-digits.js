/*

Given an array arr of 4 digits,
find the latest 24-hour time that can be made using each digit exactly once.

24-hour times are formatted as "HH:MM"
 where HH is between 00 and 23, and MM is between 00 and 59.
 The earliest 24-hour time is 00:00, and the latest is 23:59.

Return the latest 24-hour time in "HH:MM" format. If no valid time can be made,
return an empty string.

Example 1:
  Input: arr = [1,2,3,4]
  Output: "23:41"
  Explanation: The valid 24-hour times are "12:34", "12:43", "13:24", "13:42", "14:23", "14:32",
               "21:34", "21:43", "23:14", and "23:41". Of these times, "23:41" is the latest.

Example 2:
  Input: arr = [5,5,5,5]
  Output: ""
  Explanation: There are no valid 24-hour times as "55:55" is not valid.

Constraints:
- arr.length == 4
- 0 <= arr[i] <= 9

*/

var largestTimeFromDigits = function (arr) {
  arr.sort((a, b) => a - b)
  let result = ''

  const used = new Set()

  const dfs = (index, time, used) => {
    if (used.size == 4) return check_valid(time) ? format_time(time) : ''

    let latest = ''
    for (let i = 0; i < 4; i++) {
      if (used.has(i)) continue

      time.push(arr[i])
      used.add(i)
      latest = dfs(i + 1, time, used) || latest
      time.pop()
      used.delete(i)
    }

    return latest
  }

  const check_valid = (time) => 10 * time[0] + time[1] < 24 && time[2] * 10 + time[3] < 60
  const format_time = (time) => `${time[0]}${time[1]}:${time[2]}${time[3]}`

  return dfs(0, [], used)
}
