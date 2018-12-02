"use strict"

const partOne = input => {
    const ids = String(input).trim().split('\n')

    const counts = ids
        .map(id => {
            const map = id
                .split('')
                .reduce((acc, cur) => {
                    acc[cur] = (acc[cur] || 0) + 1
                    return acc
                }, {})

            return Object.values(map)
        })

    const twice = counts
        .map(count => !!count.find(x => x == 2))
        .reduce((a, b) => a + Number(b), 0)

    const thrice = counts
        .map(count => !!count.find(x => x == 3))
        .reduce((a, b) => a + Number(b), 0)

    return {
        twice,
        thrice,
        checksum: twice * thrice,
    }
}

const partTwo = input => {
    const list = String(input).trim()
    const ids = list.split('\n')

    for(let id of ids) {
        const idChars = id.split('')

        for(let candidate of ids) {
            const candidateChars = candidate.split('')

            let difference = 0
            let differingIndex
            // calculate the num of difference between the id and the candidate
            for (let i = 0; i < idChars.length; i++) {
                const different = idChars[i] != candidateChars[i]
                if (different) {
                    // save the index at which the two strings differ
                    differingIndex = i
                }

                difference += different

                if (difference > 1) {
                    break
                }
            }

            if (difference == 1) {
                // found a matching id
                // return the common parts

                const common = id.substring(0, differingIndex) + id.substring(differingIndex + 1, id.length)
                return {
                    boxID1: id,
                    boxID2: candidate,
                    common,
                }
            }
        }
    }

    return false
}

module.exports = (context, callback) => {
    const one = partOne(context)
    const two = partTwo(context)

    callback(undefined, { one, two })
}
