import { PARAMETER_TYPE } from '../../utils/parameters'
import createLayout from '../creater'

const NAME = 'PG'
const OUR_PARAMETERS = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false,
    },
}


const ORIGIN_PARAMETERS = {
    pageRatio: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1.0,
    },
    separation: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 20.0,
    },
    crossMinType: {
        type: PARAMETER_TYPE.MODULE,
        module: "CrossingMinimization",
        default: "SubgraphPlanarizer",
    },
    packerType: {
        type: PARAMETER_TYPE.MODULE,
        module: "CCLayoutPack",
        default: "TileToRows",
    },
    planarLayouterType: {
        type: PARAMETER_TYPE.MODULE,
        module: "GridLayoutPlanRep",
        default: "Mixed",
    },
}

const pg = createLayout(NAME, OUR_PARAMETERS, ORIGIN_PARAMETERS, {})
export default pg