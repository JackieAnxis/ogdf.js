import { PARAMETER_TYPE } from '../../utils/parameters'
import createLayout from '../creater'

const NAME = 'FME'
const OUR_PARAMETERS = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    }
}

const ORIGIN_PARAMETERS = {
    defaultEdgeLength: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1.0
    },
    defaultNodeSize: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1.0
    },
    multipolePrec: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 5
    },
    numberOfThreads: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 0
    },
    numIterations: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 100
    },
    randomize: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: true
    },
}

// double* nodesX, double* nodesY
const ATTRIBUTES = {
    node: [
        {
            name: 'nodesX',
            mapper: (node) => ('x' in node ? node.x : 0),
            type: PARAMETER_TYPE.DOUBLE
        },
        {
            name: 'nodesY',
            mapper: (node) => ('y' in node ? node.y : 0),
            type: PARAMETER_TYPE.DOUBLE
        }
    ],
    link: [],
    sequence: ['nodesX', 'nodesY']
}

const fme = createLayout(NAME, OUR_PARAMETERS, ORIGIN_PARAMETERS, ATTRIBUTES)

export default fme