/* eslint-disable no-undef */
const Basic = require('../../src/basic')
const fs = require('fs')
const path = require('path')
const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/miserables.json')))
const id2index = {}
for (let i = 0; i < data.nodes.length; ++i) {
    if (data.nodes[i]['id'] in id2index) {
        throw Error('Duplicated Node ID') // duplicated node id is not allowed
    } else id2index[data.nodes[i]['id']] = i
}
const sourceIndexArray = []
const targetIndexArray = []
for (let i = 0; i < data.links.length; ++i) {
    sourceIndexArray.push(id2index[data.links[i].source])
    targetIndexArray.push(id2index[data.links[i].target])
}
describe('Basic graph testing', () => {
    test('@BaseGraph', () => {
        const graph = new Basic.Graph.BaseGraph(data)
        const json = graph.json()
        expect(json[0]).toEqual(77)
        expect(json[1]).toEqual(254)
        expect(json[2]).toEqual(sourceIndexArray)
        expect(json[3]).toEqual(targetIndexArray)
        expect(json[4].length).toEqual(0)
    })
})
