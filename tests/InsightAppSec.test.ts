import InsightAppSecApi from '../tasks/InsightAppSec/helpers/insightAppSecApi';

let iasApi = new InsightAppSecApi("endpoint", "apiKey");

/** done is a function that can be used for testing async operations */
describe("InsightAppSecApi tests", () => {
    it("async makeApiRequest test", done => {
        let promise = iasApi.makeApiRequest("endpoint", "get")
        .then(result => {
            done();
        })
        .catch(error => {
            done();
        })
    });

    /** no done here */
    it("sync InsightAppSecApi test", () => {
        //iasApi.makeApiRequest("endpoint", "get");
      });
  });