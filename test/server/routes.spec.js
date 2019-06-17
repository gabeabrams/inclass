const proxyquire = require('proxyquire');

const ExpressApp = require('../dummy-objects/ExpressApp');
const API = require('../dummy-objects/API');
const genStore = require('../dummy-objects/genStore');

// thie imports routes and replaces all instances of store to our generated one
const initRoutesWithStore = (expressApp, storeOpts) => {
  const fakeStore = genStore(storeOpts);
  console.log('new fake store is ', fakeStore.getCatalogAndPermissions);
  
  // generate fake Store and replace all instances of Store in routes.js
  const routesUninitialized = proxyquire(
    '../../server/routes',
    {
      './Store': genStore(storeOpts),
      '@global': true,
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
    it.only('tests catalog route', async function () {
      const fakeExpressApp = new ExpressApp();
      const fakeAPI = new API();
      // init store with only metadata
      initRoutesWithStore(
        fakeExpressApp,
        {
          storeMetadata: {
            title: 'Harvard Store',
          },
        }
      );

      const req = {
        api: fakeAPI,
        session: {
          launchInfo: {
            courseId: 60,
          },
        },
      };
      let dataReturnedToClient;
      const res = {
        json: (data) => {
          dataReturnedToClient = data;
        },
      };
      await fakeExpressApp.simulateGETRequest('/catalog', req, res);
      console.log('data returned is ', dataReturnedToClient);
    });
  });
});
