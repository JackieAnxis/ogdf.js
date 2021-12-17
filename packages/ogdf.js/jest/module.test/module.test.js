/* eslint-disable no-undef */
const ModuleList = require('../../src/module')
const { PARAMETER_TYPE } = require('../../src/utils/parameter-type')
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
            })
        })
    }
})
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
