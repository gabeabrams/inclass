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
          assert(Array.isArray(app.tags[tag]), 'tags value is not array');
        }
      });
      appKeys.splice(appKeys.indexOf('tags'), 1);
    }
    // check that we have converted creator value to array
    if (appKeys.includes('creator')) {
      if (!Array.isArray(realApp.creator)) {
        assert(Array.isArray(app.creator), 'creator value is not array');
      }
      appKeys.splice(appKeys.indexOf('creator'), 1);
    }
    // check that each file ends with .png
    if (appKeys.includes('screenshots')) {
      app.screenshots.forEach((screenshot) => {
        assert(screenshot.filename.endsWith('.png'), 'screenshots filename does not end with .png');
      });
      appKeys.splice(appKeys.indexOf('screenshots'), 1);
    }
    // check that support email key is either from parent or from catalog
    if (appKeys.includes('supportEmail')) {
      assert(app.supportEmail === realApp.supportEmail
        || app.supportEmail === catalogMetadata.defaultSupportEmail, 'support Email is incorrect');
      appKeys.splice(appKeys.indexOf('supportEmail'), 1);
    }
    // check if app has mandatory keys such as credentials and installData
    if (appKeys.includes('installXML')) {
      assert(app.installXML, 'installXML data is not loaded');
      appKeys.splice(appKeys.indexOf('installXML'), 1);
    }
    // check if app has mandatory keys such as credentials and installData
    if (appKeys.includes('installationCredentials')) {
      assert(app.installationCredentials, 'credentials data is not loaded');
      appKeys.splice(appKeys.indexOf('installationCredentials'), 1);
    }
    // check that app has icon loaded
    if (appKeys.includes('icon')) {
      assert(app.icon.fullPath, 'app icon is not loaded correctly');
      appKeys.splice(appKeys.indexOf('icon'), 1);
    }
    // check for every other key we copied straight from metadata file
    appKeys.forEach((key) => {
      assert(JSON.stringify(app[key]) === JSON.stringify(realApp[key]), `the value of key: ${key} was not read in from metadata file correctly`);
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
    console.log('parent app is', parentMetadata);
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
    console.log('child app is ', childApp);
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
              assert(Array.isArray(childApp[key][tag]), 'tags value is not array');
            }
          });
        } else if (key === 'creator') {
          // check that we have converted creator value to array
          if (!Array.isArray(childAppMetadata.creator)) {
            assert(Array.isArray(childApp.creator), 'creator value is not array');
          }
        } else if (key === 'supportEmail') {
          // check that supportEmail field is either from parent or from catalog
          assert(childApp[key] === childAppMetadata[key]
            || childApp[key] === catalogMetadata.defaultSupportEmail, 'support Email is incorrect');
        } else if (key === 'screenshots') {
          // check that each file ends with .png
          childApp[key].forEach((screenshot) => {
            assert(screenshot.filename.endsWith('.png'), 'screenshots filename does not end with .png');
          });
        } else {
          assert(JSON.stringify(childApp[key])
          === JSON.stringify(childAppMetadata[key]), `the value of key: ${key} is not read in from metadata file correctly`);
        }
      } else {
        // check that child app extended the value of parent app
        if (key === 'installXML') {
          // check that app installData is loaded
          assert(childApp[key], 'installXML data is not loaded');
        } else if (key === 'installationCredentials') {
          // check that app credentials are loaded
          assert(childApp[key], 'credentials data is not loaded');
        } else if (key === 'icon') {
          assert.notEqual(childApp[key].fullPath, parentMetadata[key].fullPath, 'icon is not extended correctly');
        } else {
          assert(JSON.stringify(childApp[key])
           === JSON.stringify(parentAppMetadata[key]), `the value of key: ${key} did not extend from parent correctly`);
        }
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
    assert(error, 'did not throw error when loading app without metadata file');
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
    assert(error, 'did not throw error when loading app with badly formatted metadata file');
  });

  it('extends parent xml if has parent and file not found', async function () {
    // use proxiquire to redirect store path to testing folder
    const dummyPath = path.join(__dirname, '../../../dummy-data/store/missing-xml');
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
    const parentAppId = 'swipein';
    const parentParentAppMetadata = null;
    const parentMetadata = await loadApp({
      catalogId: parentCatalogId,
      catalogMetadata: parentCatalogMetadata,
      appId: parentAppId,
      parentAppMetadata: parentParentAppMetadata,
    });

    // try child app with missing xml file
    const catalogId = 'seas';
    const catalogMetadata = await loadCatalogMetadata(catalogId);
    const appId = 'swipein';
    const parentAppMetadata = parentMetadata;
    const appMetadata = await loadApp({
      catalogId,
      catalogMetadata,
      appId,
      parentAppMetadata,
    });

    assert(appMetadata.installXML === parentMetadata.installXML, 'child app missing installXMl file did not extend from parent correctly');
  });

  it('extends parent credentials if has parent and file not found', async function () {
    // use proxiquire to redirect store path to testing folder
    const dummyPath = path.join(__dirname, '../../../dummy-data/store/missing-credentials');
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
    const parentAppId = 'swipein';
    const parentParentAppMetadata = null;
    const parentMetadata = await loadApp({
      catalogId: parentCatalogId,
      catalogMetadata: parentCatalogMetadata,
      appId: parentAppId,
      parentAppMetadata: parentParentAppMetadata,
    });

    // try child app with missing xml file
    const catalogId = 'seas';
    const catalogMetadata = await loadCatalogMetadata(catalogId);
    const appId = 'swipein';
    const parentAppMetadata = parentMetadata;
    const appMetadata = await loadApp({
      catalogId,
      catalogMetadata,
      appId,
      parentAppMetadata,
    });

    assert(appMetadata.installationCredentials === parentMetadata.installationCredentials, 'child app missing credentials file did not extend from parent correctly');
  });
});
