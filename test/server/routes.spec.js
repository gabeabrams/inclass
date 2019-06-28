const proxyquire = require('proxyquire');
const assert = require('assert');
const path = require('path');

const ExpressApp = require('../dummy-objects/ExpressApp');
const API = require('../dummy-objects/API');
const genStore = require('../dummy-objects/genStore');
const InstallableStore = require('../dummy-objects/InstallableStore');

// this creates an installable store
const initRoutesWithInstallableStore = (expressApp) => {
  // generate fake Store and replace all instances of Store in routes.js
  const routesUninitialized = proxyquire(
    '../../server/routes',
    {
      './Store': InstallableStore,
    }
  );
  // use the fake store for testing, return the fake Store routes export
  return routesUninitialized(expressApp);
};

const dummyStorePath = path.join(__dirname, '..', 'dummy-data/store/installable');

// Import fake installed apps for testing
const appsInCourse = require('../dummy-objects/API/appsInCourse');

// init the routes with already loaded store
const initRoutesWithPathToStore = (expressApp, storePath) => {
  const routesUninitialized = proxyquire(
    '../../server/routes',
    {
      '/STORE_CONSTANTS': {
        path: storePath,
        '@global': true,
      },
    }
  );
  // use the fake store for testing, return the fake Store routes export
  return routesUninitialized(expressApp);
};

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
  describe('server > routes /installed-apps', function () {
    it('return matching apps and success if exists', async function () {
      const fakeExpressApp = new ExpressApp();
      const fakeAPI = new API();
      // replaces the store in routes with installable fake store
      initRoutesWithInstallableStore(fakeExpressApp);
      // fake req, res objects
      const req = {
        api: fakeAPI,
        session: {
          launchInfo: {
            courseId: 100,
          },
          catalogId: 'dce',
          save: (callback) => { callback(); },
        },
      };
      let dataReturnedToClient;
      const res = {
        json: (data) => {
          dataReturnedToClient = data;
        },
      };
      await fakeExpressApp.simulateRequest('/installed-apps', req, res);
      const expectedMatching = [
        {
          ltiIds: [46841],
          appId: 'gradeup',
        },
        {
          ltiIds: [46842],
          appId: 'swipein',
        },
      ];
      assert.equal(dataReturnedToClient.success, true, 'failed when should return matching');
      assert.deepEqual(dataReturnedToClient.apps, expectedMatching, 'did not return correct form of matching array');
    });
  });

  describe('server > routes /store', async function () {
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

      // Make store metadata const to use it in assertion test
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
      await fakeExpressApp.simulateRequest('/store', req, res);
      assert.equal(
        jsonCalled,
        true,
        'JSON object not called'
      );
      assert.equal(
        payload.success,
        true,
        'Payload success is not correct value'
      );
      assert.deepEqual(
        payload.store,
        storeMetadata,
        'Store metadata is not correct'
      );
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
      let payload;
      const res = {
        json: (data) => {
          payload = data;
        },
      };

      const req = {};
      await fakeExpressApp.simulateRequest('/store', req, res);

      assert.equal(
        payload.success,
        false,
        'Did not return correct value for success'
      );
      assert.equal(
        payload.message,
        'Store metadata is not ready. If this error continues after a few minutes, please contact an admin.',
        'Message is undefined'
      );
    });
  });

  describe('server > routes /uninstall', function () {
    it('Successfully uninstalls an app', async function () {
      // Create fake express app and api
      const fakeExpressApp = new ExpressApp();
      const fakeAPI = new API();

      // initialize the installable store
      initRoutesWithInstallableStore(fakeExpressApp);

      // Create fake request and response objects
      const req = {
        api: fakeAPI,
        body: {
          ltiIds: [appsInCourse[0].id],
        },
        session: {
          launchInfo: {
            courseId: 200,
          },
          catalogId: 'dce',
          save: (callback) => { callback(); },
        },
      };

      let payload;
      const res = {
        json: (data) => {
          payload = data;
        },
      };

      // Simulate request to DELETE route /uninstall
      await fakeExpressApp.simulateRequest('/uninstall', req, res);

      // Make sure response is correct
      assert.equal(
        payload.success,
        true,
        'Success attribute should equal true'
      );
    });

    it('Successfully uninstalls a list of apps', async function () {
      // Create fake express app and api
      const fakeExpressApp = new ExpressApp();
      const fakeAPI = new API();

      // initialize the installable store
      initRoutesWithInstallableStore(fakeExpressApp);

      // Create fake request and response objects
      const req = {
        api: fakeAPI,
        body: {
          ltiIds: [appsInCourse[0].id, appsInCourse[1].id],
        },
        session: {
          launchInfo: {
            courseId: 200,
          },
          catalogId: 'dce',
          save: (callback) => { callback(); },
        },
      };

      let payload;
      const res = {
        json: (data) => {
          payload = data;
        },
      };

      // Simulate request to DELETE route /uninstall
      await fakeExpressApp.simulateRequest('/uninstall', req, res);

      // Make sure response is correct
      assert.equal(
        payload.success,
        true,
        'Success attribute should equal true'
      );
    });

    it('Gives an error if there is no courseId in the request', async function () {
      // Make fake express app and fake api to pass in
      const fakeExpressApp = new ExpressApp();
      const fakeAPI = new API();

      // initialize the installable store
      initRoutesWithInstallableStore(fakeExpressApp);

      // Create fake request and response objects
      const req = {
        api: fakeAPI,
        body: {
          ltiIds: [appsInCourse[0].id],
        },
        session: {
          launchInfo: {
            // No courseId
          },
          catalogId: 'dce',
          save: (callback) => { callback(); },
        },
      };
      let payload;
      const res = {
        json: (data) => {
          payload = data;
        },
      };

      await fakeExpressApp.simulateRequest('/uninstall', req, res);

      assert.equal(
        payload.success,
        false,
        'Response success should be false'
      );
      assert.equal(
        payload.message,
        'We could not uninstall this app because we could not determine your launch course. Please contact an admin.',
        'Message is incorrect'
      );
    });
    it('Gives an error if there is no launchInfo object in the request', async function () {
      // Make fake express app and fake api to pass in
      const fakeExpressApp = new ExpressApp();
      const fakeAPI = new API();

      // initialize the installable store
      initRoutesWithInstallableStore(fakeExpressApp);

      // Create fake request and response objects
      const req = {
        api: fakeAPI,
        body: {
          ltiIds: [appsInCourse[0].id],
        },
        session: {
          // no launchInfo
          catalogId: 'dce',
          save: (callback) => { callback(); },
        },
      };
      let payload;
      const res = {
        json: (data) => {
          payload = data;
        },
      };

      await fakeExpressApp.simulateRequest('/uninstall', req, res);

      assert(!payload.success, 'Success attribute should be false');
      assert.equal(
        payload.message,
        'We could not uninstall this app because we could not determine your launch course. Please contact an admin.',
        'Incorrect error message'
      );
    });
    it('Returns an error message if any of the apps cannot be uninstalled', async function () {
      // Make fake express app and fake api to pass in
      const fakeExpressApp = new ExpressApp();
      const fakeAPI = new API();

      // initialize the installable store
      initRoutesWithInstallableStore(fakeExpressApp);

      // Create fake request and response objects
      const req = {
        api: fakeAPI,
        body: {
          ltiIds: [6739458760345],
        },
        session: {
          launchInfo: {
            courseId: 73429,
          },
          catalogId: 'dce',
          save: (callback) => { callback(); },
        },
      };
      let payload;
      const res = {
        json: (data) => {
          payload = data;
        },
      };

      await fakeExpressApp.simulateRequest('/uninstall', req, res);

      assert.equal(
        payload.success,
        false,
        'Response success should be false'
      );
      assert(
        payload.message.includes('error occurred while attempting to uninstall an app'),
        'Message is incorrect'
      );
    });
  });

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
        await fakeExpressApp.simulateRequest('/catalog', req, res);
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
        await fakeExpressApp.simulateRequest('/catalog', req, res);
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
      await fakeExpressApp.simulateRequest('/catalog', req, res);
      assert(!dataReturnedToClient.success, 'did not return correct success object');
      assert(dataReturnedToClient.message, 'did not populate message when success is false');
    });

    it('returns original object when GET /catalog successful', async function () {
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
          save: (callback) => { callback(); },
        },
      };
      let dataReturnedToClient;
      const res = {
        json: (data) => {
          dataReturnedToClient = data;
        },
      };
      await fakeExpressApp.simulateRequest('/catalog', req, res);
      assert(dataReturnedToClient.success, 'failed when it should return success');
      assert.deepEqual(dataReturnedToClient.catalog, fakeCatalog, 'did not return correct catalog');
      assert.equal(dataReturnedToClient.isAdmin, true, 'did not return correct isAdmin object');
    });
  });
  describe('server > routes /install', function () {
    it('Successfully installs an app', async function () {
      // Create a fake express app and api
      const fakeExpressApp = new ExpressApp();
      const fakeAPI = new API();

      // init installable store
      initRoutesWithInstallableStore(fakeExpressApp);

      // Create a request object
      const req = {
        api: fakeAPI,
        params: {
          appId: 'notinstalled',
        },
        session: {
          launchInfo: {
            courseId: 54,
          },
          catalogId: 'dce',
          save: (callback) => { callback(); },
        },
      };

      // create a fake response object
      let dataReturnedToClient;
      const res = {
        json: (data) => {
          dataReturnedToClient = data;
        },
      };

      // Simulate a request to the /install/:appId path
      // Asking to install the "notinstalled" app (the only app that hasn't been
      // installed yet)
      await fakeExpressApp.simulateRequest('/install/:appId', req, res);

      // Analyze the response sent to the user
      // > Make sure a response was sent
      assert(dataReturnedToClient !== undefined, 'No request sent to user');
      // > Make sure the response is correct
      assert.deepEqual(
        dataReturnedToClient,
        { success: true },
        'Response should have been a success message'
      );
    });

    it('throws an error when installData returns null', async function () {
      // Create a fake express app and api
      const fakeExpressApp = new ExpressApp();
      const fakeAPI = new API();

      // init installable store
      initRoutesWithInstallableStore(fakeExpressApp);

      // Create a request object
      const req = {
        api: fakeAPI,
        params: {
          appId: 'fakeApp',
        },
        session: {
          launchInfo: {
            courseId: 54,
          },
          catalogId: 'fakeCatalog',
          save: (callback) => { callback(); },
        },
      };

      // create a fake response object
      let dataReturnedToClient;
      const res = {
        json: (data) => {
          dataReturnedToClient = data;
        },
      };

      // Simulate a request to the /install/:appId path
      // Asking to install the "fakeApp" app (an app that does not exist)
      await fakeExpressApp.simulateRequest('/install/:appId', req, res);

      // Analyze the response sent to the user
      // > Make sure a response was sent
      assert(dataReturnedToClient !== undefined, 'No request sent to user');
      // > Make sure the response is correct
      assert.deepEqual(
        dataReturnedToClient,
        {
          success: false,
          message: 'We cannot find this app\'s installation details. Please contact an admin.',
        },
        'Response should have been a success message'
      );
    });

    it('Successfully installs an already installed app', async function () {
      // Create a fake express app and api
      const fakeExpressApp = new ExpressApp();
      const fakeAPI = new API();

      // init installable store
      initRoutesWithInstallableStore(fakeExpressApp);

      // Create a request object
      const req = {
        api: fakeAPI,
        params: {
          appId: 'gradeup',
        },
        session: {
          launchInfo: {
            courseId: 54,
          },
          catalogId: 'dce',
          save: (callback) => { callback(); },
        },
      };

      // create a fake response object
      let dataReturnedToClient;
      const res = {
        json: (data) => {
          dataReturnedToClient = data;
        },
      };

      // Simulate a request to the /install/:appId path
      // Asking to install the "gradeup" app (an already installed app)
      await fakeExpressApp.simulateRequest('/install/:appId', req, res);

      // Analyze the response sent to the user
      // > Make sure a response was sent
      assert(dataReturnedToClient !== undefined, 'No request sent to user');
      // > Make sure the response is correct
      assert.deepEqual(
        dataReturnedToClient,
        { success: true },
        'Response should have been a success message'
      );
    });
  });
});
