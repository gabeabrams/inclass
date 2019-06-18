const proxyquire = require('proxyquire');
const assert = require('assert');

const ExpressApp = require('../dummy-objects/ExpressApp');
const API = require('../dummy-objects/API');
const genStore = require('../dummy-objects/genStore');

// thie imports routes and replaces all instances of store to our generated one
const initRoutesWithStore = (expressApp, storeOpts) => {
  // generate fake Store and replace all instances of Store in routes.js
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
  describe.only('server > routes /catalog', function () {
    it('throws an error if API is missing', async function () {
      const fakeExpressApp = new ExpressApp();
      const fakeAPI = new API();
      initRoutesWithStore(
        fakeExpressApp,
        {
          storeMetadata: {
            title: 'Harvard Store',
          },
        }
      );
      const req = {
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
      let error;
      try {
        await fakeExpressApp.simulateGETRequest('/catalog', req, res);
      } catch (err) {
        error = err;
      }
      assert(error, 'catalog route did not throw an error with incomplete launch information');
    });

    it('throws an error if launchInfo is in wrong format', async function () {
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
          courseId: 60,
        },
      };
      let dataReturnedToClient;
      const res = {
        json: (data) => {
          dataReturnedToClient = data;
        },
      };
      let error;
      try {
        await fakeExpressApp.simulateGETRequest('/catalog', req, res);
      } catch (err) {
        error = err;
      }
      assert(error, 'catalog route did not throw an error with incorrect launchInformation format');
    });

    it('returns success when ', async function () {
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
