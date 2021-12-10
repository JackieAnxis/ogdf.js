import NetV from 'netv'
import * as ogdf from 'ogdfjs'
import React, { useEffect, useRef } from 'react'

const LAYOUT_MAP = {
    DavidsonHarel:ogdf.layouts.energybased.DavidsonHarelLayout,
    fm3: ogdf.layouts.energybased.FMMMLayout,
    FastMultipoleEmbedder:ogdf.layouts.energybased.FastMultipoleEmbedder,
    FastMultipoleMultilevelEmbedder:ogdf.layouts.energybased.FastMultipoleMultilevelEmbedder,
    gem: ogdf.layouts.energybased.GEMLayout,
    NodeRespecter: ogdf.layouts.energybased.NodeRespecterLayout,
    PivotMDS: ogdf.layouts.energybased.PivotMDS,
    SpringEmbedderGridVariant:ogdf.layouts.energybased.SpringEmbedderGridVariant,
    SpringEmbedderKK:ogdf.layouts.energybased.SpringEmbedderKK,
    StressMinimization:ogdf.layouts.energybased.StressMinimization,
    TutteLayout:ogdf.layouts.energybased.TutteLayout,
  
    sugi: ogdf.layouts.layered.SugiyamaLayout,

    Planarization:ogdf.layouts.planarity.PlanarizationLayout,
  PlanarizationGrid:ogdf.layouts.planarity.PlanarizationGridLayout
  }

function MainCanvas({ layoutType, data, layoutParameters, changeFlag}) {
    const ref = useRef(null)
    // console.log('layoutParameters:', layoutParameters)
    useEffect(() => {
        if (!data) {
            return
        }
        const width = 500
        const height = 500
        const div = ref.current
        const netv = new NetV({
            container: div,
            width,
            height,
            nodeLimit: 1000,
            linkLimit: 1000,
            node: {
                style: {
                    r: 7
                }
            }
        })
        data.links.forEach((link) => {
            link.weight = Math.random()
        })
        const layout = new LAYOUT_MAP[layoutType]({
            graph: data,
            parameters: layoutParameters
        })
        console.log(layout.configs());
        layout.run().then((graph) => {
            // netv.data(graph)
            netv.data(
                NetV.Utils.transformGraphPosition(
                    graph,
                    Math.min(width, height) * 0.9,
                    width / 2,
                    height / 2
                )
            )
            netv.draw()
        })
        return () => {
            netv.dispose()
        }
    }, [changeFlag])

    return <div ref={ref}></div>
}

export { MainCanvas }
