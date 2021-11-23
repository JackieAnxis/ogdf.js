import NetV from "netv";

const netv = new NetV({
  container: document.createElement("div"),
});
export const DATASET = {
  miserables: netv.loadDataset("miserables"),
  patents: netv.loadDataset("patents"),
};
