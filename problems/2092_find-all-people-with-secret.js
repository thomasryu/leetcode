// Default solution
var findAllPeople = function (n, meetings, firstPerson) {
  const knows_secret = Array(n).fill(false)
  knows_secret[0] = true
  knows_secret[firstPerson] = true

  meetings.sort((a, b) => a[2] - b[2])

  // Spread the secret through DFS
  const visited = new Set()
  const spread_secret = (key) => {
    if (visited.has(key)) return
    visited.add(key)

    knows_secret[key.split(',')[0]] = true
    for (let target of timeline[key]) {
      spread_secret(target)
    }
  }

  // Construct a disconnected graph
  // representing how the secret spreads
  const timeline = {}
  for (let [a, b, time] of meetings) {
    const key_a = `${a},${time}`
    const key_b = `${b},${time}`

    timeline[key_a] || (timeline[key_a] = [])
    timeline[key_b] || (timeline[key_b] = [])
    timeline[key_a].push(key_b)
    timeline[key_b].push(key_a)
  }

  // For each time in meetings, we test
  // how the secret spreads
  for (let [a, b, time] of meetings) {
    const key_a = `${a},${time}`
    const key_b = `${b},${time}`

    if (knows_secret[a]) {
      spread_secret(key_a)
    } else if (knows_secret[b]) spread_secret(key_b)
  }

  return knows_secret.map((_, i) => i).filter((_, i) => knows_secret[i])
}

// Tidying the timeline graph
var findAllPeople = function (n, meetings, firstPerson) {
  const knows_secret = Array(n).fill(false)
  knows_secret[0] = true
  knows_secret[firstPerson] = true

  meetings.sort((a, b) => a[2] - b[2])

  const visited = new Set()
  const spread_secret = (person, time) => {
    knows_secret[person] = true

    for (let target of timeline[person][time]) {
      const key = `${target},${time}`

      if (visited.has(key)) continue
      visited.add(key)

      spread_secret(target, time)
    }
  }

  const timeline = {}
  for (let [a, b, time] of meetings) {
    timeline[a] || (timeline[a] = {})
    timeline[b] || (timeline[b] = {})

    timeline[a][time] || (timeline[a][time] = [])
    timeline[b][time] || (timeline[b][time] = [])

    timeline[a][time].push(b)
    timeline[b][time].push(a)
  }

  for (let [a, b, time] of meetings) {
    const key_a = `${a},${time}`
    const key_b = `${b},${time}`

    if (knows_secret[a] && !visited.has(key_a)) {
      visited.add(key_a)
      spread_secret(a, time)
    } else if (knows_secret[b] && !visited.has(key_b)) {
      visited.add(key_b)
      spread_secret(b, time)
    }
  }

  return knows_secret.map((_, i) => i).filter((_, i) => knows_secret[i])
}

// Optimal solution with Union-Find
var findAllPeople = function (n, meetings, firstPerson) {
  // Union-Find helper functions
  const roots = [...Array(n).keys()]
  const ranks = Array(n).fill(1)
  const union_find = (node) => {
    if (roots[node] == node) return node
    return (roots[node] = union_find(roots[node]))
  }
  const union_unite = (a, b) => {
    const root_a = union_find(a)
    const root_b = union_find(b)

    if (root_a == root_b) return

    if (ranks[root_a] > ranks[root_b]) roots[root_b] = root_a
    else if (ranks[root_b] > ranks[root_a]) roots[root_a] = root_b
    else {
      roots[root_a] = root_b
      ranks[root_b]++
    }
  }
  const union_connected = (a, b) => {
    return union_find(a) == union_find(b)
  }
  const union_reset = (a) => {
    roots[a] = a
  }

  union_unite(0, firstPerson) // Everyone connected to 0 knows the secret

  // Sort meetings by time and group meetins happening at the same time
  // (objects naturally sort their number keys in ascending order)
  const meetings_by_time = {}
  for (let [a, b, time] of meetings) {
    meetings_by_time[time] || (meetings_by_time[time] = [])
    meetings_by_time[time].push([a, b])
  }

  // For meetings happening at the same time:
  // 1. Unite all people who interacted with each other
  // 2. At the end, if they didn't learn the secret, reset them
  for (let time in meetings_by_time) {
    for (let [a, b] of meetings_by_time[time]) union_unite(a, b)

    for (let [a, b] of meetings_by_time[time])
      if (!union_connected(0, a)) {
        union_reset(a)
        union_reset(b)
      }
  }

  return [...roots.keys()].filter((i) => union_connected(i, 0))
}
