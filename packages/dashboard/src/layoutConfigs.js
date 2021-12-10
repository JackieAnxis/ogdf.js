import * as ogdf from 'ogdfjs';
import { DATASET } from "./datasets";

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

const defaultLayoutData=DATASET.miserables;
defaultLayoutData.links.forEach((link) => {
  link.weight = Math.random()
});

const defaultLayoutDavidsonHarel=new LAYOUT_MAP["DavidsonHarel"]({
  graph: defaultLayoutData,
})

const defaultLayoutFM3=new LAYOUT_MAP["fm3"]({
  graph: defaultLayoutData,
})

const defaultLayoutFastMultipoleEmbedder=new LAYOUT_MAP["FastMultipoleEmbedder"]({
  graph: defaultLayoutData,
})

const defaultLayoutFastMultipoleMultilevelEmbedder=new LAYOUT_MAP["FastMultipoleMultilevelEmbedder"]({
  graph: defaultLayoutData,
})

const defaultLayoutGem=new LAYOUT_MAP["gem"]({
  graph: defaultLayoutData,
})

const defaultLayoutNodeRespecter=new LAYOUT_MAP["NodeRespecter"]({
  graph: defaultLayoutData,
})

const defaultLayoutPivotMDS=new LAYOUT_MAP["PivotMDS"]({
  graph: defaultLayoutData,
})

const defaultLayoutSpringEmbedderGridVariant=new LAYOUT_MAP["SpringEmbedderGridVariant"]({
  graph: defaultLayoutData,
})

const defaultLayoutSpringEmbedderKK=new LAYOUT_MAP["SpringEmbedderKK"]({
  graph: defaultLayoutData,
})

const defaultLayoutStressMinimization=new LAYOUT_MAP["StressMinimization"]({
  graph: defaultLayoutData,
})

const defaultLayoutTutteLayout=new LAYOUT_MAP["TutteLayout"]({
  graph: defaultLayoutData,
})

const defaultLayoutSugi=new LAYOUT_MAP["sugi"]({
  graph: defaultLayoutData,
})

const defaultLayoutPlanarization=new LAYOUT_MAP["Planarization"]({
  graph: defaultLayoutData,
})

const defaultLayoutPlanarizationGrid=new LAYOUT_MAP["PlanarizationGrid"]({
  graph: defaultLayoutData,
})


const LAYOUT_CONFIG = {
  layout: {
    type: "select",
    options: ["DavidsonHarel","fm3","FastMultipoleEmbedder", "FastMultipoleMultilevelEmbedder","gem","NodeRespecter","PivotMDS","SpringEmbedderGridVariant","SpringEmbedderKK","StressMinimization","TutteLayout","sugi","Planarization","PlanarizationGrid"],
    default: "fm3",
  },
  parameters: {
    DavidsonHarel:defaultLayoutDavidsonHarel.configs().value.parameters,
    fm3:defaultLayoutFM3.configs().value.parameters,
    FastMultipoleEmbedder:defaultLayoutFastMultipoleEmbedder.configs().value.parameters,
    FastMultipoleMultilevelEmbedder:defaultLayoutFastMultipoleMultilevelEmbedder.configs().value.parameters,
    gem:defaultLayoutGem.configs().value.parameters,
    NodeRespecter:defaultLayoutNodeRespecter.configs().value.parameters,
    PivotMDS:defaultLayoutPivotMDS.configs().value.parameters,
    SpringEmbedderGridVariant:defaultLayoutSpringEmbedderGridVariant.configs().value.parameters,
    SpringEmbedderKK:defaultLayoutSpringEmbedderKK.configs().value.parameters,
    StressMinimization:defaultLayoutStressMinimization.configs().value.parameters,
    TutteLayout:defaultLayoutTutteLayout.configs().value.parameters,

    sugi:defaultLayoutSugi.configs().value.parameters,

    Planarization:defaultLayoutPlanarization.configs().value.parameters,
    PlanarizationGrid:defaultLayoutPlanarizationGrid.configs().value.parameters,
  },
};

//console.log(LAYOUT_CONFIG.parameters.fm3);
//console.log(LAYOUT_CONFIG.parameters.sugi);

export { LAYOUT_CONFIG };
