/* eslint-disable no-undef */
const ModuleList = require('../../src/module')
const { PARAMETER_TYPE } = require('../../src/utils/parameter-type')
const initOGDF = require('../../src/entry/rawogdf').default
const moduleTestCases = []
describe('Module initialize testing', () => {
    for (let ModuleName in ModuleList) {
        const Module = ModuleList[ModuleName]
        test('@' + Module.BaseModuleName, () => {
            Module.SubModuleList.forEach((SubModule) => {
                const subObj = new SubModule()
                if (SubModule.PARAMETER_DEFINITION === {}) expect(subObj).toBeInstanceOf(SubModule)
                else {
                    for (let param in SubModule.PARAMETER_DEFINITION) {
                        if (SubModule.PARAMETER_DEFINITION[param].type === PARAMETER_TYPE.MODULE) {
                            expect(subObj[param]).toBeInstanceOf(
                                SubModule.PARAMETER_DEFINITION[param].default
                            )
                        } else {
                            expect(subObj[param]).toEqual(
                                SubModule.PARAMETER_DEFINITION[param].default
                            )
                        }
                    }
                }
                moduleTestCases.push(subObj)
            })
        })
    }
})
runModuleTestCases()
function malloc(Module, staticParams, parameters, PARAMETER_DEFINITION) {
    let params = Object.keys(parameters).map((name) => {
        let type = PARAMETER_DEFINITION[name].type
        if (type === PARAMETER_TYPE.CATEGORICAL) {
            return PARAMETER_DEFINITION[name].range.indexOf(parameters[name])
        } else if (type === PARAMETER_TYPE.MODULE) {
            return malloc(
                Module,
                parameters[name].static,
                parameters[name].parameters,
                parameters[name].PARAMETER_DEFINITION
            )
        } else return parameters[name]
    })
    let buffer = Module[`_${staticParams.BaseModuleName}_${staticParams.ModuleName}`](...params)
    return buffer
}
function createTesting(Module) {
    let index = 0
    const tester = {
        test: (initializer) => {
            expect(new Module.SubModuleList[index](initializer)).toMatchObject(initializer)
            const module = new Module.SubModuleList[index]()
            for (let param in initializer) {
                module[param] = initializer[param]
                expect(module[param]).toEqual(initializer[param]) // check parameter assignment
                if (module.constructor.PARAMETER_DEFINITION[param].type === PARAMETER_TYPE.MODULE) {
                    // check json()
                    expect(module.json().parameters[param]).toEqual(initializer[param].json())
                    // check configs()
                    expect(JSON.stringify(module.configs().value.parameters[param].value)).toEqual(
                        JSON.stringify(initializer[param].configs().value)
                    )
                } else {
                    // check json()
                    expect(module.json().parameters[param]).toEqual(initializer[param])
                    // check configs()
                    expect(module.configs().value.parameters[param].value).toEqual(
                        initializer[param]
                    )
                }
            }
            index++
            return tester
        },
        catch: (initializer) => {
            const module = new Module.SubModuleList[index]()
            for (let param in initializer) {
                expect(() => {
                    module[param] = initializer[param]
                }).toThrow()
            }
            index++
            return tester
        }
    }
    return tester
}
function runModuleTestCases() {
    it('Testing module implementation', () => {
        expect.assertions(moduleTestCases.length)
        return initOGDF().then((OGDFModule) => {
            for (let module of moduleTestCases) {
                const json = module.json()
                expect(
                    typeof malloc(
                        OGDFModule,
                        json.static,
                        json.parameters,
                        json.PARAMETER_DEFINITION
                    )
                ).toEqual('number')
            }
        })
    })
}
describe('Module parameter assignment testing', () => {
    test('@CrossingMinimizationModule', () => {
        const SubgraphPlanarizer = {
            globalInternalLibraryLogLevel: 'Minor',
            globalLogLevel: 'Medium',
            globalMinimumLogLevel: 'Default',
            globalStatisticMode: true,
            localLogLevel: 'High',
            localLogMode: 'Statistic',
            maxThreads: 10,
            permutations: 10,
            timeout: false,
            timeLimit: 100,
            inserter: new ModuleList.EdgeInsertionModule.VariableEmbeddingInserter(),
            subgraph: new ModuleList.PlanarSubgraphModule.PlanarSubgraphTree()
        }
        createTesting(ModuleList.CrossingMinimizationModule).test(SubgraphPlanarizer)
    })
    test('@EdgeInsertionModule', () => {
        const FixedEmbeddingInserter = {
            keepEmbedding: true,
            percentMostCrossed: 30,
            removeReinsert: 'Inserted',
            timeLimit: 100
        }
        const MultiEdgeApproxInserter = {
            percentMostCrossedFix: 30,
            percentMostCrossedVar: 50,
            removeReinsertFix: 'MostCrossed',
            removeReinsertVar: 'IncInserted',
            statistics: true,
            timeLimit: 50
        }
        const VariableEmbeddingInserter = {
            percentMostCrossed: 40,
            removeReinsert: 'Incremental',
            timeLimit: 100
        }
        createTesting(ModuleList.EdgeInsertionModule)
            .test(FixedEmbeddingInserter)
            .test(MultiEdgeApproxInserter)
            .test(VariableEmbeddingInserter)
    })
    test('@EmbedderModule', () => {
        const EmbedderMaxFace = {
            timeLimit: 100
        }
        const EmbedderMinDepth = {
            timeLimit: 100
        }
        const EmbedderMinDepthPiTa = {
            timeLimit: 100,
            useExtendedDepthDefinition: false
        }
        const EmbedderOptimalFlexDraw = {
            timeLimit: 100
        }
        const SimpleEmbedder = {
            timeLimit: 100
        }
        createTesting(ModuleList.EmbedderModule)
            .test(EmbedderMaxFace)
            .test(EmbedderMinDepth)
            .test(EmbedderMinDepthPiTa)
            .test(EmbedderOptimalFlexDraw)
            .test(SimpleEmbedder)
    })
    test('@GridLayoutPlanRepModule', () => {
        const MixedModelLayout = {
            separation: 30.0,
            augmenter: new ModuleList.AugmentationModule.DfsMakeBiconnected(),
            crossingsBeautifier:
                new ModuleList.MixedModelCrossingsBeautifierModule.MMCBDoubleGrid(),
            embedder: new ModuleList.EmbedderModule.EmbedderOptimalFlexDraw(),
            shellingOrder: new ModuleList.ShellingOrderModule.TriconnectedShellingOrder()
        }
        createTesting(ModuleList.GridLayoutPlanRepModule).test(MixedModelLayout)
    })
    test('@HierarchyClusterLayoutModule', () => {
        const OptimalHierarchyClusterLayout = {
            fixedLayerDistance: true,
            layerDistance: 5,
            nodeDistance: 5,
            weightBalancing: 0.5,
            weightClusters: 0.2,
            weightSegments: 3
        }
        createTesting(ModuleList.HierarchyClusterLayoutModule).test(OptimalHierarchyClusterLayout)
    })
    test('@HierarchyLayoutModule', () => {
        const FastHierarchyLayout = {
            fixedLayerDistance: true,
            layerDistance: 6,
            nodeDistance: 5
        }
        const FastSimpleHierarchyLayout = {
            balanced: false,
            downward: false,
            layerDistance: 55,
            leftToRight: false,
            nodeDistance: 200
        }
        const OptimalHierarchyLayout = {
            fixedLayerDistance: true,
            layerDistance: 5,
            nodeDistance: 7,
            weightBalancing: 0.3,
            weightSegments: 4
        }
        createTesting(ModuleList.HierarchyLayoutModule)
            .test(FastHierarchyLayout)
            .test(FastSimpleHierarchyLayout)
            .test(OptimalHierarchyLayout)
    })
    test('@InitialPlacer', () => {
        const BarycenterPlacer = {
            randomOffset: false,
            weightedPositionPriority: true
        }
        const CirclePlacer = {
            circleSize: 2,
            nodeSelection: 'Old',
            radiusFixed: true,
            randomOffset: false
        }
        const MedianPlacer = {
            randomOffset: false
        }
        const RandomPlacer = {
            randomOffset: false,
            circleSize: 1
        }
        const SolarPlacer = {
            randomOffset: false
        }
        const ZeroPlacer = {
            randomRange: 0.5,
            randomOffset: false
        }
        createTesting(ModuleList.InitialPlacer)
            .test(BarycenterPlacer)
            .test(CirclePlacer)
            .test(MedianPlacer)
            .test(RandomPlacer)
            .test(SolarPlacer)
            .test(ZeroPlacer)
    })
    test('@LayeredCrossMinModule', () => {
        const BarycenterHeuristic = {}
        const GlobalSifting = {
            nRepeats: 5
        }
        const GreedyInsertHeuristic = {}
        const GreedySwitchHeuristic = {}
        const GridSifting = {
            verticalStepsBound: 3
        }
        const MedianHeuristic = {}
        const SiftingHeuristic = {}
        const SplitHeuristic = {}
        createTesting(ModuleList.LayeredCrossMinModule)
            .test(BarycenterHeuristic)
            .test(GlobalSifting)
            .test(GreedyInsertHeuristic)
            .test(GreedySwitchHeuristic)
            .test(GridSifting)
            .test(MedianHeuristic)
            .test(SiftingHeuristic)
            .test(SplitHeuristic)
    })
})
describe('Module parameter wrongly assignment testing', () => {
    test('@CrossingMinimizationModule', () => {
        const SubgraphPlanarizer = {
            globalInternalLibraryLogLevel: 'Chaos', // category not found
            globalLogLevel: 'Chaos', // category not found
            globalMinimumLogLevel: 'Chaos', // category not found
            globalStatisticMode: 10000, // type error
            localLogLevel: 'Chaos', // category not found
            localLogMode: 'Chaos', // category not found
            maxThreads: -10, // out of range
            permutations: -10, // out of range
            timeout: 10000, // type error
            timeLimit: 'SomeErrorType',
            inserter: new ModuleList.AcyclicSubgraphModule.DfsAcyclicSubgraph(), // module type error
            subgraph: new ModuleList.AcyclicSubgraphModule.DfsAcyclicSubgraph() // module type error
        }
        createTesting(ModuleList.CrossingMinimizationModule).catch(SubgraphPlanarizer)
    })
})
