import { PARAMETER_TYPE } from '../../utils/parameter-type'
import LayoutModule from '../../module/config/Layout'
import MultilevelBuilder from '../../module/config/MultilevelBuilder'
import InitialPlacer from '../../module/config/InitialPlacer'

export default {
    layout: {
        type: PARAMETER_TYPE.MODULE,
        module: LayoutModule,
        default: LayoutModule.SpringEmbedderGridVariant
    },
    multilevelBuilder: {
        type: PARAMETER_TYPE.MODULE,
        module: MultilevelBuilder,
        default: MultilevelBuilder.SolarMerger
    },
    placer: {
        type: PARAMETER_TYPE.MODULE,
        module: InitialPlacer,
        default: InitialPlacer.BarycenterPlacer
    }
}
