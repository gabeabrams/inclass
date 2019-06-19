const proxyquire = require('proxyquire');
const assert = require('assert');

const ExpressApp = require('../dummy-objects/ExpressApp');
const API = require('../dummy-objects/API');
const genStore = require('../dummy-objects/genStore');

const initRoutesWithStore = (expressApp, storeOpts) => {
  const routesUninitialized = proxyquire(
    '../../server/routes',
    {
      './Store': genStore(storeOpts),
    }
  );
  return routesUninitialized(expressApp);
};

describe('server > routes', function () {
  // describe.skip('Gabe\'s example', function () {
  //   it('Does it', async function () {
  //     const fakeExpressApp = new ExpressApp();
  //     const fakeAPI = new API();
  //
  //     const routes = initRoutesWithStore(
  //       fakeExpressApp,
  //       {
  //         storeMetadata: {
  //           title: 'My Store',
  //         },
  //       }
  //     );
  //
  //
  //     let jsonCalled;
  //     let payload;
  //     const res = {
  //       json: (data) => {
  //         payload = data;
  //         jsonCalled = true;
  //       }
  //     };
  //
  //     const req = {
  //       api: fakeAPI,
  //       launchInfo: {
  //         courseId: <put something here>,
  //       },
  //     };
  //
  //   });
  // });

  describe.only('server > routes /store', async function () {
    it('Gets store metadata and sends back the metadata in json object', async function () {
      // We make a fake express app using the dummy ExpressApp we made
      const fakeExpressApp = new ExpressApp();
      // Use initRoutesWithStore to initialize the routes to use our fake data
      initRoutesWithStore(
        fakeExpressApp,
        {
          storeMetadata: {
            title: 'My Store',
          },
        }
      );

      const storeMetadata = {
        title: 'My Store',
      };

      // Variables to check that json was called and to get the data from the
      // json object
      let jsonCalled;
      let payload;
      const res = {
        json: (data) => {
          payload = data;
          jsonCalled = true;
        },
      };

      const req = {};
      await fakeExpressApp.simulateGETRequest('/store', req, res);
      assert.equal(jsonCalled, true, 'JSON object not called');
      assert.equal(payload.success, true, 'Payload success is not correct value');
      assert.deepEqual(payload.store, storeMetadata, 'Store metadata is not correct');
    });
    it('Will return an error message if it cannot get the store metadata', async function () {
      // We make a fake express app using the dummy ExpressApp we made
      const fakeExpressApp = new ExpressApp();
      // Use initRoutesWithStore to initialize the routes
      initRoutesWithStore(
        fakeExpressApp,
        {
          // without store metadata
        }
      );

      // Variables to check that json was called and to get the data from the
      // json object
      let jsonCalled;
      let payload;
      const res = {
        json: (data) => {
          payload = data;
          jsonCalled = true;
        },
      };

      const req = {};
      await fakeExpressApp.simulateGETRequest('/store', req, res);

      assert.equal(payload.success, false, 'Did not return correct value for success');
      console.log(payload.message);
      assert.equal(payload.message, !undefined, 'Message is undefined');
    });
  });
});
