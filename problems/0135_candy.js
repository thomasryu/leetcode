/*

There are n children standing in a line.
Each child is assigned a rating value given in the integer array ratings.

You are giving candies to these children subjected to the following requirements:
- Each child must have at least one candy.
- Children with a higher rating get more candies than their neighbors.

Return the minimum number of candies you need to have to distribute the candies to the children.

Example 1:
  Input: ratings = [1,0,2]
  Output: 5
  Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.

Example 2:
  Input: ratings = [1,2,2]
  Output: 4
  Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
               The third child gets 1 candy because it satisfies the above two conditions.

Constraints:
- n == ratings.length
- 1 <= n <= 2 * 104
- 0 <= ratings[i] <= 2 * 104

*/

// Great solution, congratulations me
var candy = function (ratings) {
  const n = ratings.length
  let result = n // Each child gets one candy

  // We keep track of what the previous pattern was
  // (-1: decrease, 0: keep, 1: increase)
  let pattern = 0

  // And how many children are already part
  // of said pattern
  let patternCount = 1

  // And the current increasing pattern max rating,
  // for a special decrease pattern edge case
  let maxCandy = 2 * 10000 + 1

  for (let i = 1; i < n; i++) {
    // 1. If the current child has a higher rating
    //    we have to give them a higher candy amount
    if (ratings[i - 1] < ratings[i]) {
      // If we weren't in an increasing pattern, we can be assured the previous child
      // has one candy, thus we only need to give the current one two
      if (pattern != 1) {
        patternCount = 1
      }

      // In an increasing pattern, we always need to give the current child
      // one more candy than the previous one
      result += patternCount
      patternCount++
      pattern = 1

      maxCandy = patternCount
    }
    // 2. If the current child has a lower rating
    else if (ratings[i - 1] > ratings[i]) {
      // If we were in an increasing pattern, we do not need to increase the
      // previous step's candy count
      if (pattern === 1) {
        patternCount = 0
      }

      result += patternCount
      patternCount++
      pattern = -1

      // Also if we surpassed a previous increasing pattern's peak
      // we also need to increase it
      if (patternCount >= maxCandy) {
        result++
        patternCount++
        maxCandy = 2 * 10000 + 1
      }
    }
    // 3. If current child has the same rating
    else {
      pattern = 0
      patternCount = 1
      maxCandy = 2 * 10000 + 1
    }
  }

  return result
}
