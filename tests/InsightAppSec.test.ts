import InsightAppSecApi from '../tasks/InsightAppSec/helpers/insightAppSecApi';
import * as testData from '../tests/testData';


let iasApi = new InsightAppSecApi("endpoint", "apiKey", false);

/** done is a function that can be used for testing async operations */
describe("InsightAppSecApi tests", () => {

    it("async getAppId test", async () => {
        const spy = jest.spyOn(iasApi, "makeApiRequest");
        spy.mockImplementationOnce(() => Promise.resolve(testData.getAppResponse));
        let result = await iasApi.getAppId('name');
        expect(result).toEqual(testData.getAppIdOutput);
    })

    it("async getScanConfigId test", async () => {
        const spy = jest.spyOn(iasApi, "makeApiRequest");
        spy.mockImplementationOnce(() => Promise.resolve(testData.getScanConfigResponse));
        let result = await iasApi.getScanConfigId('name', 'appId');
        expect(result).toEqual(testData.getScanConfigIdOutput);
    })

    it("async getAppName test", async () => {
        const spy = jest.spyOn(iasApi, "makeApiRequest");
        spy.mockImplementationOnce(() => Promise.resolve(testData.getAppResponse));
        let result = await iasApi.getAppName(testData.getAppIdOutput);
        expect(result).toEqual(testData.getAppNameOutput);
    })

    it("async getScanConfigName test", async () => {
        const spy = jest.spyOn(iasApi, "makeApiRequest");
        spy.mockImplementationOnce(() => Promise.resolve(testData.getScanConfigResponse));
        let result = await iasApi.getScanConfigName(testData.getScanConfigIdOutput, testData.appUUID);
        expect(result).toEqual(testData.getScanConfigNameOutput);
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
        let result = await iasApi.getNextPageUrl(testData.getNextPageUrlInput);
        expect(result).toEqual(testData.getNextPageUrlOutput);
    })

    it("async getApplicationData test 1", async () => {
        const spy = jest.spyOn(iasApi, "getAppName");
        spy.mockImplementationOnce(() => Promise.resolve(testData.appName));
        let result = await iasApi.getApplicationData(testData.appUUID);
        expect(result).toEqual([testData.appUUID, testData.appName]);
        expect(iasApi.getAppName).toHaveBeenCalledTimes(1);
    })

    it("async getApplicationData test 2", async () => {
        const spy = jest.spyOn(iasApi, "getAppId");
        spy.mockImplementationOnce(() => Promise.resolve(testData.appUUID));
        let result = await iasApi.getApplicationData(testData.appName);
        expect(result).toEqual([testData.appUUID, testData.appName]);
        expect(iasApi.getAppId).toHaveBeenCalledTimes(1);
    });

    it("async getScanConfigData test 1", async () => {
        const spy = jest.spyOn(iasApi, "getScanConfigName");
        spy.mockImplementationOnce(() => Promise.resolve(testData.appName));
        let result = await iasApi.getScanConfigData(testData.appUUID, testData.appUUID);
        expect(result).toEqual([testData.appUUID, testData.appName]);
        expect(iasApi.getScanConfigName).toHaveBeenCalledTimes(1);
    })

    it("async getScanConfigData test 2", async () => {
        const spy = jest.spyOn(iasApi, "getScanConfigId");
        spy.mockImplementationOnce(() => Promise.resolve(testData.appUUID));
        let result = await iasApi.getScanConfigData(testData.appName, testData.appUUID);
        expect(result).toEqual([testData.appUUID, testData.appName]);
        expect(iasApi.getScanConfigId).toHaveBeenCalledTimes(1);
    });

  });
  