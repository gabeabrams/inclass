const path = require('path');
const assert = require('assert');
const proxyquire = require('proxyquire');
const readJSON = require('../../../../server/Store/helpers/readJSON');

describe('server > Store > helpers > loadApp', function () {
  it('loads app with no parent correctly', async function () {
    // use proxiquire to redirect store path to testing folder
    const dummyPath = path.join(__dirname, '../../../dummy-data/store/medium');
    const loadCatalogMetadata = proxyquire('../../../../server/Store/helpers/loadCatalogMetadata', {
      '../STORE_CONSTANTS': {
        path: dummyPath,
      },
    });
    const loadApp = proxyquire('../../../../server/Store/helpers/loadApp', {
      '../STORE_CONSTANTS': {
        path: dummyPath,
      },
    });

    // loading app with no parent
    const catalogId = 'pe';
    const catalogMetadata = await loadCatalogMetadata(catalogId);
    const appId = 'condition';
    const parentAppMetadata = null;
    const app = await loadApp({
      catalogId,
      catalogMetadata,
      appId,
      parentAppMetadata,
    });
    const testPath = path.join(dummyPath, catalogId, appId, 'metadata');
    const realApp = await readJSON(testPath);
    const appKeys = Object.keys(app);
    // check that we have converted tag values to arrays
    if (appKeys.includes('tags')) {
      Object.keys(realApp.tags).forEach((tag) => {
        if (!Array.isArray(realApp.tags[tag])) {
          assert.equal(Array.isArray(app.tags[tag]), true);
        }
      });
      appKeys.splice(appKeys.indexOf('tags'), 1);
    }
    // check that each file ends with .png
    if (appKeys.includes('screenshots')) {
      app.screenshots.forEach((screenshot) => {
        assert.equal(screenshot.filename.endsWith('.png'), true);
      });
      appKeys.splice(appKeys.indexOf('screenshots'), 1);
    }
    // check that support email key is either from parent or from catalog
    if (appKeys.includes('supportEmail')) {
      assert(app.supportEmail === realApp.supportEmail
        || app.supportEmail === catalogMetadata.defaultSupportEmail);
      appKeys.splice(appKeys.indexOf('supportEmail'), 1);
    }
    // check if app has mandatory keys such as credentials and installData
    if (appKeys.includes('installXML')) {
      assert.notEqual(app.installXML, undefined);
      appKeys.splice(appKeys.indexOf('installXML'), 1);
    }
    // check if app has mandatory keys such as credentials and installData
    if (appKeys.includes('installationCredentials')) {
      assert.notEqual(app.installationCredentials, undefined);
      appKeys.splice(appKeys.indexOf('installationCredentials'), 1);
    }
    // check for every other key we copied straight from metadata file
    appKeys.forEach((key) => {
      assert(JSON.stringify(app[key]) === JSON.stringify(realApp[key]));
    });
  });

  it('loads app with parent correctly', async function () {
    // use proxiquire to redirect store path to testing folder
    const dummyPath = path.join(__dirname, '../../../dummy-data/store/medium');
    const loadCatalogMetadata = proxyquire('../../../../server/Store/helpers/loadCatalogMetadata', {
      '../STORE_CONSTANTS': {
        path: dummyPath,
      },
    });
    const loadApp = proxyquire('../../../../server/Store/helpers/loadApp', {
      '../STORE_CONSTANTS': {
        path: dummyPath,
      },
    });

    // load parent app
    const parentCatalogId = 'dce';
    const parentCatalogMetadata = await loadCatalogMetadata(parentCatalogId);
    const parentAppId = 'gradeup';
    const parentParentAppMetadata = null;
    const parentMetadata = await loadApp({
      catalogId: parentCatalogId,
      catalogMetadata: parentCatalogMetadata,
      appId: parentAppId,
      parentAppMetadata: parentParentAppMetadata,
    });
    // load child app
    const catalogId = 'pe';
    const catalogMetadata = await loadCatalogMetadata(catalogId);
    const appId = 'absence';
    const parentAppMetadata = parentMetadata;
    const childApp = await loadApp({
      catalogId,
      catalogMetadata,
      appId,
      parentAppMetadata,
    });
    // read in childApp metadata from store
    const testPath = path.join(dummyPath, catalogId, appId, 'metadata');
    const childAppMetadata = await readJSON(testPath);
    const changed = Object.keys(childAppMetadata).filter((key) => {
      return (key !== 'extends');
    });
    // check if each field in childApp is updated accordingly
    Object.keys(childApp).forEach((key) => {
      if (changed.includes(key)) {
        if (key === 'tags') {
          // check that tags are converted to arrays
          Object.keys(childAppMetadata[key]).forEach((tag) => {
            if (!Array.isArray(childAppMetadata[key][tag])) {
              assert(Array.isArray(childApp[key][tag]));
            }
          });
        } else if (key === 'supportEmail') {
          // check that supportEmail field is either from parent or from catalog
          assert(childApp[key] === childAppMetadata[key]
            || childApp[key] === catalogMetadata.defaultSupportEmail);
        } else if (key === 'screenshots') {
          // check that each file ends with .png
          childApp[key].forEach((screenshot) => {
            assert(screenshot.filename.endsWith('.png'));
          });
        } else if (key === 'installXML' || key === 'installationCredentials') {
          // app has mandatory fields such as credentials and installData
          assert(childApp[key]);
        } else {
          assert(JSON.stringify(childApp[key])
          === JSON.stringify(childAppMetadata[key]));
        }
      } else {
        // check that child app extended the value of parent app
        assert(JSON.stringify(childApp[key])
           === JSON.stringify(parentAppMetadata[key]));
      }
    });
  });

  it('throws an error loading app with missing metadata', async function () {
    // use proxiquire to redirect store path to testing folder
    const dummyPath = path.join(__dirname, '../../../dummy-data/store/missing-metadata');
    const loadCatalogMetadata = proxyquire('../../../../server/Store/helpers/loadCatalogMetadata', {
      '../STORE_CONSTANTS': {
        path: dummyPath,
      },
    });
    const loadApp = proxyquire('../../../../server/Store/helpers/loadApp', {
      '../STORE_CONSTANTS': {
        path: dummyPath,
      },
    });
    // try to load the app without metadata file
    const catalogId = 'dce';
    const catalogMetadata = await loadCatalogMetadata(catalogId);
    const appId = 'swipein';
    const parentAppMetadata = null;
    let error;
    try {
      await loadApp({
        catalogId,
        catalogMetadata,
        appId,
        parentAppMetadata,
      });
    } catch (err) {
      error = err;
    }
    // test that it will throw an error
    assert.notEqual(error, undefined);
  });

  it('throws an error if metadata is formatted incorrectly', async function () {
    // use proxiquire to redirect store path to testing folder
    const dummyPath = path.join(__dirname, '../../../dummy-data/store/invalid-metadata');
    const loadCatalogMetadata = proxyquire('../../../../server/Store/helpers/loadCatalogMetadata', {
      '../STORE_CONSTANTS': {
        path: dummyPath,
      },
    });
    const loadApp = proxyquire('../../../../server/Store/helpers/loadApp', {
      '../STORE_CONSTANTS': {
        path: dummyPath,
      },
    });
    // try to load the app without metadata file
    const catalogId = 'dce';
    const catalogMetadata = await loadCatalogMetadata(catalogId);
    const appId = 'swipein';
    const parentAppMetadata = null;
    let error;
    try {
      await loadApp({
        catalogId,
        catalogMetadata,
        appId,
        parentAppMetadata,
      });
    } catch (err) {
      error = err;
    }
    // test that it will throw an error
    assert.notEqual(error, undefined);
  });
});
