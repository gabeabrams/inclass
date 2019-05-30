const path = require('path');
const assert = require('assert');
const proxyquire = require('proxyquire');
const readJSON = require('../../../../server/Store/helpers/readJSON');

describe('server > Store > helpers > loadApp', function () {
  it.only('loads app with no parent correctly', async function () {
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
    Object.keys(app).forEach((field) => {
      if (field !== 'tags' && field !== 'screenshots'
          && field !== 'supportEmail' && field !== 'installXML'
          && field !== 'installationCredentials') {
        assert(JSON.stringify(app[field]) === JSON.stringify(realApp[field]));
      } else if (field === 'tags') {
        // check that we have converted tag values to arrays
        Object.keys(realApp[field]).forEach((tag) => {
          if (!Array.isArray(realApp[field][tag])) {
            assert(Array.isArray(app[field][tag]));
          }
        });
      } else if (field === 'supportEmail') {
        // check that support email field is either from parent or from catalog
        assert(app[field] === realApp[field]
            || app[field] === catalogMetadata.defaultSupportEmail);
      } else if (field === 'screenshots') {
        // check that each file ends with .png
        app[field].forEach((screenshot) => {
          assert(screenshot.filename.endsWith('.png'));
        });
      } else {
        // check if app has mandatory fields such as credentials and installData
        assert(app[field]);
      }
    });
  });

  it.only('loads app with parent correctly', async function () {
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
    const realApp = await readJSON(testPath);
    const changed = Object.keys(realApp).filter((key) => {
      return (key !== 'extends');
    });
    // check if each field in childApp is updated accordingly
    Object.keys(childApp).forEach((key) => {
      if (changed.includes(key)) {
        if (key !== 'tags' && key !== 'screenshots' && key !== 'supportEmail'
        && key !== 'installXML' && key !== 'installationCredentials') {
          assert(JSON.stringify(childApp[key])
          === JSON.stringify(realApp[key]));
        } else if (key === 'tags') {
          // check that tags are converted to arrays
          Object.keys(realApp[key]).forEach((tag) => {
            if (!Array.isArray(realApp[key][tag])) {
              assert(Array.isArray(childApp[key][tag]));
            }
          });
        } else if (key === 'supportEmail') {
          // check that supportEmail field is either from parent or from catalog
          assert(childApp[key] === realApp[key]
            || childApp[key] === catalogMetadata.defaultSupportEmail);
        } else if (key === 'screenshots') {
          // check that each file ends with .png
          childApp[key].forEach((screenshot) => {
            assert(screenshot.filename.endsWith('.png'));
          });
        } else {
          // app has mandatory fields such as credentials and installData
          assert(childApp[key]);
        }
      } else {
        assert(JSON.stringify(childApp[key])
           === JSON.stringify(parentAppMetadata[key]));
      }
    });
  });

  it.only('throws an error loading app with missing metadata', async function () {
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
    assert(error);
  });

  it.only('throws an error if metadata is formatted incorrectly', async function () {
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
    assert(error);
  });
});
