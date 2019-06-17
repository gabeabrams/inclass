const proxyquire = require('proxyquire');

const ExpressApp = require('../dummy-objects/ExpressApp');
const API = require('../dummy-objects/API');
const genStore = require('../dummy-objects/genStore');

const initRoutesWithStore = (expressApp, storeOpts) => {
  // generate fake Store and replace all instances of Store in index.js
  const routesUninitialized = proxyquire(
    '../../server/routes',
    {
      './Store': genStore(storeOpts),
    }
  );
  // use the fake store for testing, return the fake Store routes export
  return routesUninitialized(expressApp);
};

describe('server > routes', function () {
  describe.skip('Gabe\'s example', function () {
    it('Does it', async function () {
      const fakeExpressApp = new ExpressApp();
      const fakeAPI = new API();

      const routes = initRoutesWithStore(
        fakeExpressApp,
        {
          storeMetadata: {
            title: 'My Store',
          },
        }
      );

      let jsonCalled;
      let payload;
      const res = {
        json: (data) => {
          payload = data;
          jsonCalled = true;
        },
      };
      const req = {
        api: fakeAPI,
        launchInfo: {
          courseId: 48,
        },
      };
      fakeExpressApp.simulateGETRequest('/store', req, res);
      // Call routes
      routes(fakeExpressApp);
    });
  });

  describe.skip('server > routes /store', function () {
    // Sam's tests
  });

  describe('server > routes /catalog', function () {
    // Henry's tests
    it('tests catalog', function () {
      console.log('hello');
    });
  });
});
