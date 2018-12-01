"use strict"

const partOne = input => {
    const frequency = String(input).trim().split('\n').map(Number).reduce((a, b) => a + b, 0)

    return frequency
}

const findFrequencyReachedN = (frequencies, count, cumulative, n) => {
    let reached = false

    for (let delta of frequencies) {
        cumulative += delta

        count[cumulative] = (count[cumulative] || 0) + 1

        if (count[cumulative] == n) {
            reached = true
            break
        }
    }

    return { reached, cumulative }
}

const partTwo = input => {
    const frequencies = String(input).trim().split('\n').map(Number)

    const count = { 0: 1 }
    let cumulative = 0
    let reached = false
    do {
        const res = findFrequencyReachedN(frequencies, count, cumulative, 2)

        reached = res.reached
        cumulative = res.cumulative
    } while (!reached)

    return cumulative
}

module.exports = (context, callback) => {
    const one = partOne(context)
    const two = partTwo(context)
    
    callback(undefined, { one, two });
}
