# Functional testing for ogdfjs

## Testing for basic data structures in `basic.test`:

### Graph test list

Every type of graph should be tested and data should be correct.

```js
// data test
let graph = new Graph(data)
graph._graph // TEST: should be equal to data
let [N, M, source, target, ...mallocAttributes] = graph.json() // returns [N, M, source, target, ...mallocAttributes]
N // TEST: should be equal to data.nodes.length
M // TEST: should be equal to data.links.length
source // TEST: each element should match to data
target // TEST: each element should match to data
mallocAttributes // TEST: each element should match to attributes data
// implementation test
initOGDF().then((Module) => {
    Module[`_Graph_${Graph.ModuleName}`] // TEST: should be a function
})
```

Data test:

-   [x] BaseGraph
-   [ ] NodeLinkGraph
-   [ ] LinkWeightGraph
-   [ ] NodeLinkWeightGraph
-   [ ] NodeSizeLinkGraph

Implementation test:

-   [ ] Not Finished

## Testing for modules in `module.test`:

### Module test list

Every parameters should be correct and functions should return correctly formatted data.

```js
// initialize test
let module = new Module()
module.someParam // TEST: should be equal to default parameter definition (all parameters should be tested)
let module = new Module(parameters)
module.someParam // TEST: should be equal to parameters.someParam (all parameters should be tested)
// static test
let module = new Module()
module.json().static // TEST: should return {BaseModuleName, ModuleName}
module.json().parameters // TEST: should return default parameters
module.configs().default // TEST: should return default parameters
module.configs().range // TEST: the length should be equal to its SubModuleList
module.configs().value // TEST: should matchObject to default
// parameter assignment test
let module = new Module()
module.someParam = param
module.someParam // TEST: should be equal to param (all parameters should be tested)
module.json().parameters // TEST: should be equal to param
module.configs().value.parameters // TEST: should be equal to param
// implementation test
initOGDF().then((OGDFModule) => {
    OGDFModule[`_${Module.BaseModuleName}_${Module.ModuleName}`] // TEST: should be a function
})
// error test
module.someParam = param // TEST: if the type of param is not allowed (eg. requires a HierarchyClusterLayoutModule object, but received HierarchyLayoutModule) or out of range (eg. requires a int between 0 to 100, but received 101), the program should throw an error.
module.someParam // TEST: if an error throwed, the value of someParam shouldn't be changed
```

Initialize test:

-   [x] All Finished

Static test:

-   [ ] Not Finished

Parameter assignment test:

-   [x] CrossingMinimizationModule
-   [x] EdgeInsertionModule
-   [x] EmbedderModule
-   [x] GridLayoutPlanRepModule
-   [x] HierarchyClusterLayoutModule
-   [x] HierarchyLayoutModule
-   [ ] InitialPlacer
-   [ ] LayeredCrossMinModule
-   [ ] LayoutModule
-   [ ] LayoutPlanRepModule
-   [ ] MultilevelBuilder
-   [ ] PlanarSubgraphModule
-   [ ] RankingModule
-   [ ] ShellingOrderModule

Error Test:

-   [x] CrossingMinimizationModule
-   [ ] EdgeInsertionModule
-   [ ] EmbedderModule
-   [ ] GridLayoutPlanRepModule
-   [ ] HierarchyClusterLayoutModule
-   [ ] HierarchyLayoutModule
-   [ ] InitialPlacer
-   [ ] LayeredCrossMinModule
-   [ ] LayoutModule
-   [ ] LayoutPlanRepModule
-   [ ] MultilevelBuilder
-   [ ] PlanarSubgraphModule
-   [ ] RankingModule
-   [ ] ShellingOrderModule

Implementation test:

-   [x] All Finished

## Testing for layouts in `layout.test`:

### Layout test list

If Basic and Module tests passes, then you can start layout test.

```js
// initialize test
let layout = new Layout({
    graph: graph,
    parameters: parameters,
    useWorker: false
})
layout.layout.constructor.ModuleName // should be equal to Layout name
layout.graphAttributes.constructor.ModuleName // should be equal to the graph type required for the Layout
// worker test
// TODO: please check CreateOGDFProcess() function
{
    initOGDF,
    PARAMETER_TYPE,
    layoutParams: self.layout.json(),
    graphType: self.constructor.GraphType.ModuleName,
    graphAttributes: self.graphAttributes.json()
}
// TEST: make sure all the parameters are correct

let workerLayout = new Layout({
    graph: graph,
    parameters: parameters,
    useWorker: true
})
layout.run().then((graph1) => {
    workerLayout.run().then((graph2) => {
        // TEST: graph1 should be equal to graph2
        // whether use WebWorker or not, thr result should be consistent
    })
})
```

Initialize test:

-   [ ] DavidsonHarelLayout
-   [ ] FMMMLayout
-   [ ] FastMultipoleEmbedder
-   [ ] FastMultipoleMultilevelEmbedder
-   [ ] GEMLayout
-   [ ] NodeRespecterLayout
-   [ ] PivotMDS
-   [ ] SpringEmbedderGridVariant
-   [ ] SpringEmbedderKK
-   [ ] StressMinimization
-   [ ] TutteLayout
-   [ ] SugiyamaLayout
-   [ ] PlanarizationGridLayout
-   [ ] PlanarizationLayout

Worker test:

-   [ ] Not Finished
