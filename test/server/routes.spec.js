const proxyquire = require('proxyquire');

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
        }
      };

      const req = {
        api: fakeAPI,
        launchInfo: {
          courseId: <put something here>,
        },
      };

    });
  });

  describe('server > routes /store', function () {
    it('Gets store metadata and sends it back in the expressApp response', async function() {
      // We make a fake express app using the dummy ExpressApp we made
      const fakeExpressApp = new ExpressApp();
      // Use initRoutesWithStore to initialize the routes
      const routes = initRoutesWithStore(
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
        }
      };

      await fakeExpressApp.simulateGETRequest('/store', req, res);





    });
    it('Will send back an error message if there is a problem getting the store metadata', async function () {
      try {

      }
    });
  });
});
