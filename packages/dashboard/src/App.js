import React, { useEffect, useRef, useState } from "react";
import { Configs } from "./components/Configs";
import { MainCanvas } from "./components/MainCanvas";
import { DATASET } from "./datasets";

function App() {
  const [layoutType, setLayoutType] = useState("fm3");
  const [layoutParameters, setLayoutParameters] = useState({});
  const [graphData, setGraphData] = useState({
    name: "miserables",
    data: DATASET.miserables,
  });
  const [changeFlag,setChangeFlag]=useState(0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          margin: 10,
        }}
      >
        <Configs
          layoutType={layoutType}
          updateLayout={(type) => {
            setLayoutType(type);
          }}
          graphData={graphData}
          setGraphData={setGraphData}
          layoutParameters={layoutParameters}
          updateLayoutParameters={(layoutParams) => {
            setLayoutParameters(layoutParams);
          }}
          changeFlag={changeFlag}
          updateChangeFlag={(flag)=>{
            setChangeFlag(flag);
          }}
        />
      </div>
      <MainCanvas
        layoutType={layoutType}
        data={graphData.data}
        layoutParameters={layoutParameters}
        changeFlag={changeFlag}
      />
    </div>
  );
}

export default App;
