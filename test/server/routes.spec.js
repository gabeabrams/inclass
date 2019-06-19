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

  describe.only('server > routes /store', function () {
    it('Gets store metadata and sends it back in the expressApp response', async function () {
      // We make a fake express app using the dummy ExpressApp we made
      const fakeExpressApp = new ExpressApp();
      // Use initRoutesWithStore to initialize the routes
      initRoutesWithStore(
        fakeExpressApp,
        {
          storeMetadata: {
            title: 'My Store',
          },
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
      assert.equal(jsonCalled, true);
      assert.equal(payload.success, true);
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

      let error;
      try {
        await fakeExpressApp.simulateGETRequest('/store', req, res);
      } catch (err) {
        error = err;
      }

      assert(error);
      assert.equal(payload.success, false);
    });
  });
});
