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
    'WMX2',
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
        console.log(randomAxis)
        if (!adjustments.has(randomAxis)) {
            break
        }
    }

    const randomValue = Math.floor(Math.random() * (1000 - 350 + 1) + 300)

    if (direction === 'up') {
        if (adjustments.size <= 5) {
            adjustments.set(randomAxis, randomValue)
        } else {
            console.log(Array.from(adjustments.keys())[0])
            adjustments.set(randomAxis, randomValue)
            direction = 'down'
        }
    } else {
        const axisToRemove = Array.from(adjustments.keys())[0]
        adjustments.delete(axisToRemove)
        if (adjustments.size === 0) {
            direction = 'up'
        }
    }

    adjustments.forEach((value, key) => {
        axesValues[key] = value
    })

    for (const axis in axesValues) {
        assembler.push(`"${axis}" ${axesValues[axis]}`)
    }

    // const alterKey = getRandomObjectKey(current)

    // for (const k in current) {
    //     // reset to the home settings every now and then
    //     if (variations === 0) {
    //         current[k] = home[k]
    //     }
    //     if (Math.floor(Math.random() * 16) === 1) {
    //         current['slnt'] = 0
    //     }
    //     if (k === alterKey) {
    //         const min = limits[k][0]
    //         const max = limits[k][1]
    //         const newValue = Math.floor(Math.random() * (max - min + 1) + min)
    //         current[k] = newValue
    //     }
    //     assembler.push(`"${k}" ${current[k]}`)
    // }

    return assembler.join(',')
}

let theTimeout = null

const update = () => {
    if (theTimeout) {
        clearTimeout(theTimeout)
    }
    theTimeout = setTimeout(() => {
        const updateValues = getString()
        console.log(updateValues)
        els.btn.style.fontVariationSettings = updateValues
        update()
    }, 1500)
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('dom loaded')
    els.btn = document.getElementById('alfa')
    update()
})
