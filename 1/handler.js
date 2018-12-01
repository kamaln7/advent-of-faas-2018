"use strict"

const partOne = input => {
    const frequency = String(input).trim().split('\n').map(Number).reduce((a, b) => a + b, 0)

    return frequency
}

const partTwo = input => {
    const frequencies = String(input).trim().split('\n').map(Number)

    const count = { 0: 1 }
    let cumulative = 0
    let reached = false
    let i = 0
    while (!reached) {
        cumulative += frequencies[i]

        count[cumulative] = (count[cumulative] || 0) + 1
        if (count[cumulative] == 2) {
            reached = true;
        } else {
            i = (i + 1) % frequencies.length
        }
    }

    return cumulative
}

module.exports = (context, callback) => {
    const one = partOne(context)
    const two = partTwo(context)
    
    callback(undefined, { one, two });
}
