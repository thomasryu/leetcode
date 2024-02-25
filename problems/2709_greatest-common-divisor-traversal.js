/*

You are given a 0-indexed integer array nums, and you are allowed to traverse between its indices.
You can traverse between index i and index j, i != j, if and only if gcd(nums[i], nums[j]) > 1,
where gcd is the greatest common divisor.

Your task is to determine if for every pair of indices i and j in nums, where i < j,
there exists a sequence of traversals that can take us from i to j.

Return true if it is possible to traverse between all such pairs of indices, or false otherwise.

Example 1:
  Input: nums = [2,3,6]
  Output: true
  Explanation: In this example, there are 3 possible pairs of indices: (0, 1), (0, 2), and (1, 2).
    To go from index 0 to index 1, we can use the sequence of traversals 0 -> 2 -> 1,
      where we move from index 0 to index 2 because gcd(nums[0], nums[2]) = gcd(2, 6) = 2 > 1,
      and then move from index 2 to index 1 because gcd(nums[2], nums[1]) = gcd(6, 3) = 3 > 1.
    To go from index 0 to index 2, we can just go directly because gcd(nums[0], nums[2]) = gcd(2, 6) = 2 > 1.
      Likewise, to go from index 1 to index 2, we can just go directly because gcd(nums[1],
      nums[2]) = gcd(3, 6) = 3 > 1.

Example 2:
  Input: nums = [3,9,5]
  Output: false
  Explanation: No sequence of traversals can take us from index 0 to index 2 in this example. So, we return false.

Example 3:
  Input: nums = [4,3,12,8]
  Output: true
  Explanation: There are 6 possible pairs of indices to traverse between:
    (0, 1), (0, 2), (0, 3), (1, 2), (1, 3), and (2, 3).
    A valid sequence of traversals exists for each pair, so we return true.

Constraints:
- 1 <= nums.length <= 105
- 1 <= nums[i] <= 105

*/

class UnionFind {
  constructor(n, nums) {
    this.parent = [...Array(n).keys()]
    this.rank = Array(n).fill(1)
    this.nums = nums
  }
  find(n) {
    if (this.parent[n] == n) return n
    else return (this.parent[n] = this.find(this.parent[n]))
  }
  union(a, b) {
    const root_a = this.find(a)
    const root_b = this.find(b)
    if (root_a == root_b) return
    if (this.rank[root_a] > this.rank[root_b]) this.parent[root_b] = root_a
    else if (this.rank[root_b] < this.rank[root_a]) this.parent[root_a] = root_b
    else {
      this.parent[root_b] = root_a
      this.rank[root_a]++
    }
  }
  connected(a, b) {
    return this.find(a) == this.find(b)
  }
}

const create_sieve = (n) => {
  // primes[i] gives me the smallest prime that is a factor of i
  const primes = Array(n + 1).fill(0)
  primes[0] = primes[1] = -1
  for (let i = 2; i * i <= n; i++) {
    if (primes[i] > 0) continue // Already know its not a prime

    // Given the next prime p, we know we only need to check for smallest
    // divisisor primes from p^2 onwards (e.g. for 3, we only need to check
    // from 9 onwards, since 6 was already checked by 2)
    for (let j = i * i; j <= n; j += i) if (primes[j] == 0) primes[j] = i
  }
  return primes
}

var canTraverseAllPairs = function (nums) {
  const n = nums.length
  const uf = new UnionFind(n)

  const primes = create_sieve(10 ** 5)
  const prime_to_index = {}

  // Create a prime-to-index map for our nums, where prime_to_index[p]
  // gives me every index i where the prime p is a factor of nums[i]
  for (let i = 0; i < n; i++) {
    let num = nums[i]

    while (primes[num] > 0) {
      const prime = primes[num]
      prime_to_index[prime] || (prime_to_index[prime] = new Set())
      prime_to_index[prime].add(i)
      num /= prime
    }
    prime_to_index[num] || (prime_to_index[num] = new Set())
    prime_to_index[num].add(i)
  }

  // Connect every index that shares a common prime factor
  for (let p in prime_to_index) {
    if (p == 1) continue

    let prev
    for (let m of prime_to_index[p].values()) {
      if (prev != undefined) uf.union(prev, m)
      prev = m
    }
  }

  // Check if every index is connected
  return uf.parent.every((a) => uf.connected(a, 0))
}
