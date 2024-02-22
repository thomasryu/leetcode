/*

You are painting a fence of n posts with k different colors.
You must paint the posts following these rules:

Every post must be painted exactly one color.
There cannot be three or more consecutive posts with the same color.
Given the two integers n and k, return the number of ways you can paint the fence.

Example 1:
  Input: n = 3, k = 2
  Output: 6
  Explanation: All the possibilities are shown.
    Note that painting all the posts red or all the posts green is invalid because
    there cannot be three posts in a row with the same color.

Example 2:
  Input: n = 1, k = 1
  Output: 1

Example 3:
  Input: n = 7, k = 2
  Output: 42

Constraints:
- 1 <= n <= 50
- 1 <= k <= 105
- The testcases are generated such that the answer is in the range [0, 231 - 1]
  for the given n and k.

*/

var numWays = function (n, k) {
  if (n == 0) return 0

  let total_poss = k

  // When n = 2,

  // 1. The number of possibilieties where the last 2 fences
  //    have the same color is k, out of a total kˆ2
  //    we will call these pair possibilities p

  // 2. Then, for the next iteration, we will have (k^2 - p) possibilities where
  //    we can paint the next fence any color and p possibilities where we can
  //    only choose (k - 1) colors. So total = ((kˆ2 - p) * k) + (p * k)

  // 3. The (p * k) possibilities won't have any pairs
  //    and out of the (k^2 - p) * k possibilities, (k^2 - p) possibilities will
  //    end in pairs (i.e., the previous number of non-pairs)

  let pairs_poss = 0
  let non_pairs_poss = k

  for (let i = 0; i < n - 1; i++) {
    total_poss = non_pairs_poss * k + pairs_poss * (k - 1)
    pairs_poss = non_pairs_poss
    non_pairs_poss = total_poss - pairs_poss
  }

  return total_poss
}
