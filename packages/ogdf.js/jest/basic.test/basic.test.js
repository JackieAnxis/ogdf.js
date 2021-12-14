/* eslint-disable no-undef */
const Basic = require('../../src/basic')
const fs = require('fs')
const path = require('path')
describe('Basic graph testing', () => {
    const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/miserables.json')))
    test('BaseGraph testing', () => {
        const graph = new Basic.Graph.BaseGraph(data)
        const json = graph.json()
        expect(json[0]).toEqual(77)
        expect(json[1]).toEqual(254)
        expect(json[2][0]).toEqual(1)
        expect(json[3][0]).toEqual(0)
        expect(json[4].length).toEqual(0)
    })
})
