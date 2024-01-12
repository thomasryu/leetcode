/*

You are given a 0-indexed integer array buses of length n,
where buses[i] represents the departure time of the ith bus.
You are also given a 0-indexed integer array passengers of length m,
where passengers[j] represents the arrival time of the jth passenger.
All bus departure times are unique. All passenger arrival times are unique.

You are given an integer capacity,
which represents the maximum number of passengers that can get on each bus.

When a passenger arrives, they will wait in line for the next available bus.
You can get on a bus that departs at x minutes if you arrive at y minutes where y <= x, and the bus is not full.
Passengers with the earliest arrival times get on the bus first.

More formally when a bus arrives, either:

- If capacity or fewer passengers are waiting for a bus, they will all get on the bus, or
- The capacity passengers with the earliest arrival times will get on the bus.

Return the latest time you may arrive at the bus station to catch a bus.
You cannot arrive at the same time as another passenger.

Note: The arrays buses and passengers are not necessarily sorted.

Example 1:
  Input: buses = [10,20], passengers = [2,17,18,19], capacity = 2
  Output: 16
  Explanation: Suppose you arrive at time 16.
    At time 10, the first bus departs with the 0th passenger.
    At time 20, the second bus departs with you and the 1st passenger.
    Note that you may not arrive at the same time as another passenger,
    which is why you must arrive before the 1st passenger to catch the bus.

Example 2:
  Input: buses = [20,30,10], passengers = [19,13,26,4,25,11,21], capacity = 2
  Output: 20
  Explanation: Suppose you arrive at time 20.
    At time 10, the first bus departs with the 3rd passenger.
    At time 20, the second bus departs with the 5th and 1st passengers.
    At time 30, the third bus departs with the 0th passenger and you.
    Notice if you had arrived any later,
    then the 6th passenger would have taken your seat on the third bus.

Constraints:
- n == buses.length
- m == passengers.length
- 1 <= n, m, capacity <= 105
- 2 <= buses[i], passengers[i] <= 109
- Each element in buses is unique.
- Each element in passengers is unique.

*/

// Suboptimal solution (time limit exceeded)
var latestTimeCatchTheBus = function (buses, passengers, capacity) {
  let result = 0

  buses.sort((a, b) => a - b)
  passengers.sort((a, b) => a - b)

  const time_limit = buses[buses.length - 1]

  let next_bus = 0
  let next_passenger = 0

  let curr_capacity = capacity
  let total_capacity = buses.length * capacity

  for (let i = 1; i <= time_limit; i++) {
    let can_arrive = true

    // 1. Check if any passengers arrived
    if (i == passengers[next_passenger]) {
      next_passenger++
      curr_capacity--
      can_arrive = false
    }

    // 2. Check if a bus arrived
    if (i == buses[next_bus]) {
      next_bus++
      if (next_bus < buses.length) {
        // If there is still any buses coming
        curr_capacity < 0
          ? (curr_capacity += capacity)
          : (curr_capacity = capacity)
        total_capacity -= capacity
      }
    }

    // 3. Check if there is any slots for us to arrive
    //    (total_capacity - capacity) + curr_capacity > 0 gives me whether
    //    it is possible to enter in any of the future buses currently
    if (can_arrive && total_capacity - capacity + curr_capacity > 0) result = i
  }

  return result
}

// Optimized (but not optimal) solution
var latestTimeCatchTheBus = function (buses, passengers, capacity) {
  let result = 0

  buses.sort((a, b) => a - b)
  passengers.sort((a, b) => a - b)

  let iterator_bus = 0
  let iterator_passenger = 0

  let current_capacity = capacity
  let total_capacity = buses.length * capacity

  while (iterator_bus < buses.length) {
    const current_bus = buses[iterator_bus]
    const current_passenger = passengers[iterator_passenger]
    const current_time = Math.min(current_bus, current_passenger || Infinity)

    // 1. Check if any passengers arrived
    if (current_time == current_passenger) {
      // 2. Check if it's possible to arrive in the time directly before the passenger
      if (
        total_capacity - capacity + current_capacity > 0 &&
        current_time - 1 != passengers[iterator_passenger - 1]
      )
        result = current_time - 1
      iterator_passenger++
      current_capacity--
    }

    // 3. Check if a bus arrived
    if (current_time == current_bus) {
      iterator_bus++

      // 4. If there are still buses arriving, update total capacity
      if (iterator_bus < buses.length) {
        current_capacity < 0
          ? (current_capacity += capacity)
          : (current_capacity = capacity)
        total_capacity -= capacity
      }

      // 5. Check if we can arrive at the same time as the bus
      if (
        total_capacity - capacity + current_capacity > 0 &&
        current_time != current_passenger
      )
        result = current_time
    }
  }

  return result
}

// Optimized two-pointers solution
var latestTimeCatchTheBus = function (buses, passengers, capacity) {
  buses.sort((a, b) => a - b)
  passengers.sort((a, b) => a - b)

  let curr_passenger = 0
  let curr_capacity

  // 1. Check if its possible to fit all passengers in all busses
  for (let bus of buses) {
    curr_capacity = 0

    // Add all possible passengers to it
    while (
      curr_passenger < passengers.length &&
      passengers[curr_passenger] <= bus &&
      curr_capacity < capacity
    ) {
      curr_passenger++
      curr_capacity++
    }
  }

  // 2. If it is possible to fit all passengers, we start by checking the time of the last bus
  //    else, we start by checking the time the last passenger entered the last bus

  //    By checking, we mean verifying if the latest time doesn't clash with any other passenger
  //    so we decrease our latest time until we don't

  let latest_time =
    curr_capacity < capacity
      ? buses[buses.length - 1]
      : passengers[curr_passenger - 1]
  let latest_passenger = curr_passenger - 1

  while (latest_time == passengers[latest_passenger]) {
    latest_time--
    latest_passenger--
  }

  return latest_time
}
