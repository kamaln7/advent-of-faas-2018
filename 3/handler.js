"use strict"

const range = (start, size) => [...Array(size).keys()].map(i => i + start)

const parseClaims = input => {
    // ref: #11 @ 953,224: 15x19
    const pattern = /^#(\d+) @ (\d+),(\d+): (\d+)x(\d+)$/

    const claims = String(input)
        .trim()
        .split('\n')
        .map(line => {
            const parts = pattern.exec(line)
            if (!parts) {
                // invalid syntax
                return null
            }

            const [, id, ...box] = parts
            const [left, top, width, height] = box.map(Number)
            return {
                id,
                top,
                left,
                width,
                height,
            }
        })

    return claims
}

const eachPoint = (claims, cb) => {
    for(let claim of claims) {
        const xs = range(claim.left, claim.width)
        const ys = range(claim.top, claim.height)

        for (let x of xs) {
            for (let y of ys) {
                cb(x, y, claim)
            }
        }
    }
}

const partOne = input => {
    const claims = parseClaims(input)

    const grid = {}
    eachPoint(claims, (x, y, claim) => {
        const point = `${x},${y}`
        grid[point] = (grid[point] || 0) + 1
    })

    return Object.values(grid).filter(x => x > 1).length
}

const partTwo = input => {
    const claims = parseClaims(input)
    const grid = {}
    const conflictedClaims = []

    eachPoint(claims, (x, y, claim) => {
        const point = `${x},${y}`
        const onGrid = grid[point]

        if (!onGrid) {
            grid[point] = claim.id
            return
        }

        conflictedClaims.push(onGrid, claim.id)
        grid[point] = '#'
    })

    return claims.filter(claim => !conflictedClaims.includes(claim.id))[0].id
}

module.exports = (context, callback) => {
    const one = partOne(context)
    const two = partTwo(context)

    callback(undefined, { one, two });
}
