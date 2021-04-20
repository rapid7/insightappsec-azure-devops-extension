import InsightAppSecApi from '../tasks/InsightAppSec/helpers/insightAppSecApi';
import { vulnScans } from '../tests/testdata'


let iasApi = new InsightAppSecApi("endpoint", "apiKey");

/** done is a function that can be used for testing async operations */
describe("InsightAppSecApi tests", () => {

    
    // it("async makeApiRequest test", async () => {

    // //     InsightAppSecApi.prototype.makeApiRequest = jest.fn().mockImplementationOnce(async () => 
    // //         await 'my name is dev'
    // //     );
    //     mockAxios.mockResolvedValue("hello")
    //     let promise = await iasApi.makeApiRequest("endpoint", "get");
    //     expect(promise).toEqual('my name is dev');
    // });

    it("async getScanVulns test", async () => {
        // mockedAxios.create.mockRejectedValue('Network error: Something went wrong');
        const spy = jest.spyOn(iasApi, "makeApiRequest");
        spy.mockImplementationOnce(() => Promise.resolve(vulnScans));
        let result = await iasApi.getScanVulns('blahblah');
        console.log(result);
        expect(result).toEqual([]);

    })

    /** no done here */
    it("sync InsightAppSecApi test", () => {
        //iasApi.makeApiRequest("endpoint", "get");
      });
  });