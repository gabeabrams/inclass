const proxyquire = require('proxyquire');
const assert = require('assert');

const ExpressApp = require('../dummy-objects/ExpressApp');
const API = require('../dummy-objects/API');
const genStore = require('../dummy-objects/genStore');

// this imports routes and replaces all instances of store to our generated one
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
  describe('server > routes /catalog', function () {
    it('throws an error if API is missing', async function () {
      const fakeExpressApp = new ExpressApp();
      initRoutesWithStore(
        fakeExpressApp,
        {
          storeMetadata: {
            title: 'Harvard Store',
          },
        }
      );
      // req is missing api object
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
      assert(!dataReturnedToClient, 'falsely returned data when should throw error');
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
      // the session object inside req is missing the launchInfo object
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
      assert(!dataReturnedToClient, 'falsely returned data when should throw error');
    });

    it('throws an error if getCatalogAndPermissions failed', async function () {
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
      // req with courseId object replaced with wrong object inside req.session
      const req = {
        api: fakeAPI,
        session: {
          launchInfo: {
            coursework: 54,
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
      assert(!dataReturnedToClient.success, 'did not return correct success object');
      assert(dataReturnedToClient.message, 'did not populate message when success is false');
    });

    it('returns original object when getCatalog successful', async function () {
      const fakeExpressApp = new ExpressApp();
      const fakeAPI = new API();
      const fakeCatalog = {
        title: 'SEAS Catalog',
        accounts: [26, 30, 51],
        tagsToShow: [
          {
            tagName: 'cost',
            color: 'blue',
          },
        ],
        defaultSupportEmail: 'example@harvard.edu',
      };

      // init store with metadata, catalog, and isAdmin
      initRoutesWithStore(
        fakeExpressApp,
        {
          storeMetadata: {
            title: 'Harvard Store',
          },
          catalog: fakeCatalog,
          isAdmin: true,
        }
      );

      const req = {
        api: fakeAPI,
        session: {
          launchInfo: {
            courseId: 54,
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
      assert(dataReturnedToClient.success, 'failed when it should return success');
      assert.deepEqual(dataReturnedToClient.catalog, fakeCatalog, 'did not return correct catalog');
      assert.equal(dataReturnedToClient.isAdmin, true, 'did not return correct isAdmin object');
    });
  });
});
