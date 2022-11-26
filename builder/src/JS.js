const els = {}

// const base = {
//     BLDA: 0,
//     BLDB: 0,
//     WMX2: 0,
//     SKLA: 0,
//     SKLB: 0,
//     SKLD: 0,
//     TRMA: 0,
//     TRMB: 0,
//     TRMC: 0,
//     TRMD: 0,
//     TRME: 0,
//     TRMF: 0,
//     TRMG: 0,
//     TRMK: 0,
//     TRML: 0,
// }

const axes = [
    'BLDA',
    'BLDB',
    // 'WMX2',
    'SKLA',
    'SKLB',
    'SKLD',
    'TRMA',
    'TRMB',
    'TRMC',
    'TRMD',
    'TRME',
    'TRMF',
    'TRMG',
    'TRMK',
    'TRML',
]

const getRandomObjectKey = (inputObj) => {
    const keys = Object.keys(inputObj)
    const randomKey = keys[Math.floor(Math.random() * keys.length)]
    return randomKey
}

let adjustments = new Map()
let direction = 'up'

const getString = () => {
    const assembler = []
    const axesValues = {}

    for (const axis of axes) {
        axesValues[axis] = 0
    }

    let randomAxis = null

    // try not to use the same axis twice, but
    // back off after 20 runs since that should
    // hit most stuff
    for (let i = 1; i < 20; i++) {
        randomAxis = axes[Math.floor(Math.random() * axes.length)]
        if (!adjustments.has(randomAxis)) {
            break
        }
    }

    const randomValue = Math.floor(Math.random() * (1000 - 350 + 1) + 300)

    if (direction === 'up') {
        if (adjustments.size <= 5) {
            adjustments.set(randomAxis, randomValue)
        } else {
            adjustments.set(randomAxis, randomValue)
            direction = 'down'
        }
    } else {
        const axisToRemove = Array.from(adjustments.keys())[0]
        adjustments.delete(axisToRemove)
        if (adjustments.size === 0) {
            adjustments.set(randomAxis, randomValue)
            direction = 'up'
        }
    }

    adjustments.forEach((value, key) => {
        axesValues[key] = value
    })

    for (const axis in axesValues) {
        assembler.push(`"${axis}" ${axesValues[axis]}`)
    }

    return assembler.join(',')
}

let theTimeout = null

const update = () => {
    if (theTimeout) {
        clearTimeout(theTimeout)
    }
    theTimeout = setTimeout(() => {
        const updateValues = getString()
        els.btn.style.fontVariationSettings = updateValues
        update()
    }, 1400)
}

document.addEventListener('DOMContentLoaded', () => {
    els.btn = document.getElementById('alfa')
    update()
})
