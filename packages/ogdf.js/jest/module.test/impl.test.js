/* eslint-disable no-undef */
// this test case to make sure all modules has been implemented in entry.
const initOGDF = require('../../src/entry/rawogdf').default
const ModuleList = require('../../src/module')
it('Testing module implementation', () => {
    let assertions = 0
    for (let BaseModule in ModuleList) {
        assertions += ModuleList[BaseModule].SubModuleList.length
    }
    expect.assertions(assertions)
    return initOGDF().then((OGDFModule) => {
        for (let BaseModule in ModuleList) {
            ModuleList[BaseModule].SubModuleList.forEach((Module) => {
                expect(
                    OGDFModule[`_${Module.BaseModuleName}_${Module.ModuleName}`]
                ).not.toBeUndefined()
            })
        }
    })
})
