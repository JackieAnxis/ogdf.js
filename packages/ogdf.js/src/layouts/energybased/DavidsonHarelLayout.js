import { PARAMETER_TYPE } from '../../utils/parameter-type'

export default {
    fixSettings: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: ['standard', 'repulse', 'planar'],
        default: 'none'
    },
    attractionWeight: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1e2
    },
    iterationNumberAsFactor: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    },
    nodeOverlapWeight: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 100
    },
    numberOfIterations: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 0
    },
    planarityWeight: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 500
    },
    preferredEdgeLength: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 0
    },
    preferredEdgeLengthMultiplier: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 2
    },
    repulsionWeight: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1e6
    },
    speed: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: ['Fast', 'Medium', 'HQ'],
        default: 'Medium'
    },
    startTemperature: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 500
    }
}
