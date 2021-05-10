import InsightAppSecApi from '../tasks/InsightAppSec/helpers/insightAppSecApi';
import * as testData from '../tests/testData';


let iasApi = new InsightAppSecApi("endpoint", "apiKey");

/** done is a function that can be used for testing async operations */
describe("InsightAppSecApi tests", () => {

    it("async getAppId test", async () => {
        const spy = jest.spyOn(iasApi, "makeApiRequest");
        spy.mockImplementationOnce(() => Promise.resolve(testData.getAppIdResponse));
        let result = await iasApi.getAppId('name');
        expect(result).toEqual(testData.getAppIdOutput);
    })

    it("async getScanConfigId test", async () => {
        const spy = jest.spyOn(iasApi, "makeApiRequest");
        spy.mockImplementationOnce(() => Promise.resolve(testData.getScanConfigResponse));
        let result = await iasApi.getScanConfigId('name', 'appId');
        expect(result).toEqual(testData.getScanConfigIdOutput);
    })

    it("async submitScan test", async () => {
        const spy = jest.spyOn(iasApi, "makeApiRequest");
        spy.mockImplementationOnce(() => Promise.resolve(testData.submitScanResponse));
        let result = await iasApi.submitScan('config');
        expect(result).toEqual(testData.submitScanOutput);
    })

    it("async getScan test", async () => {
        const spy = jest.spyOn(iasApi, "makeApiRequest");
        spy.mockImplementationOnce(() => Promise.resolve(testData.getScanResponse));
        let result = await iasApi.getScan('test');
        expect(result).toEqual(testData.getScanOutput);
    })

    it("async getScanVulns test", async () => {
        const spy = jest.spyOn(iasApi, "makeApiRequest");
        spy.mockImplementationOnce(() => Promise.resolve(testData.vulnScansResponse));
        let result = await iasApi.getScanVulns('test');
        expect(result).toEqual(testData.vulnScansOutput);
    })

    it("async getVulnSeverities test", async () => {
        let result = await iasApi.getVulnSeverities(testData.getVulnSeveritiesInput);
        expect(result).toEqual(testData.getVulnSeveritiesOutput);
    })

    it("async getAttackModules test", async () => {
        jest.restoreAllMocks();
        const spy = jest.spyOn(iasApi, "makeApiRequest");
        for(let i=0; i < 4; i++){
            spy.mockImplementationOnce(() => Promise.resolve(testData.getAttackModulesNames["8399fa8e-df5c-41bc-9d3c-f85dc23dc26b"]));
        }
        for (let i=0; i < 1; i++){
            spy.mockImplementationOnce(() => Promise.resolve(testData.getAttackModulesNames["615d72f4-01bc-447a-b4a2-139654bc9945"]));
        }
        let result = await iasApi.getAttackModules(testData.getAttackModulesInput);
        expect(result).toEqual(testData.getAttackModulesOutput);
        expect(iasApi.makeApiRequest).toHaveBeenCalledTimes(5);
    })

    it("async getNextPageUrl test", async () => {
        let result = await iasApi.getNextPageUrl(testData.getNextPageUrlInput)
        expect(result).toEqual(testData.getNextPageUrlOutput);
    })

  });
  