const LAYOUT_CONFIG = {
  layout: {
    type: "select",
    options: ["fm3", "sugi"],
    default: "fm3",
  },
  parameters: {
    fm3: {
      useHighLevelOptions: {
        type: "switch",
        default: false,
        children: {
          unitEdgeLength: {
            type: "float",
            default: 100,
            min: 1,
            max: 200,
          },
          newInitialPlacement: {
            type: "switch",
            default: false,
          },
        },
      },
      qualityVersusSpeed: {
        type: "select",
        options: [
          "GorgeousAndEfficient",
          "BeautifulAndFast",
          "NiceAndIncredibleSpeed",
        ],
        default: "BeautifulAndFast",
      },
    },
    sugi: {
      runs: {
        type: "integer",
        default: 15,
        min: 1,
        max: 30,
      },
      transpose: {
        type: "switch",
        default: true,
      },
      fails: {
        type: "integer",
        default: 4,
        min: 1,
        max: 10,
      },
      arrangeCCs: {
        type: "switch",
        default: true,
      },
      minDistCC: {
        type: "float",
        default: 20.0,
        min: 10.0,
        max: 50.0,
      },
    },
  },
};

export { LAYOUT_CONFIG };
