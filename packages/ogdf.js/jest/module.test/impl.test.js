// this test case to make sure all modules has been implemented in entry.
const initOGDF = require('../../src/entry/rawogdf').default
const ModuleList = require('../../src/module')
describe('Testing module implementation', () => {
    const OGDFModule = await initOGDF()
    for (let BaseModule in ModuleList) {
        test(`Testing ${BaseModule} implementation`, () => {
            ModuleList[BaseModule].SubModuleList.forEach((Module) => {
                expect(OGDFModule[`_${Module.BaseModuleName}_${Module.ModuleName}`])
            })
        })
    }
})
