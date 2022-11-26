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

let adjustments = []

const getString = () => {
    const assembler = []
    const axesValues = {}

    for (const axis of axes) {
        axesValues[axis] = 0
    }

    const randomAxis = axes[Math.floor(Math.random() * axes.length)]

    axesValues[randomAxis] = 800

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
