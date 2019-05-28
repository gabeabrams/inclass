const path = require('path');
const assert = require('assert');
const loadApp = require('../../../../server/Store/helpers/loadApp');
const loadCatalogMetadata = require('..//../../../server/Store/helpers/loadCatalogMetadata');
const readJSON = require('../../../../server/Store/helpers/readJSON');
const STORE_PATH = require('../../../../server/Store/STORE_PATH');

describe('server > Store > helpers > loadApp', function () {
  it('loads app with no parent correctly', async function () {
    const catalogId = 'dce';
    const catalogMetadata = await loadCatalogMetadata(catalogId);
    const appId = 'swipein';
    const parentAppMetadata = null;
    const app = await loadApp({
      catalogId,
      catalogMetadata,
      appId,
      parentAppMetadata,
    });
    const testPath = path.join(STORE_PATH, 'dce', 'swipein', 'metadata');
    const realApp = await readJSON(testPath);
    Object.keys(app).forEach((field) => {
      if (field !== 'tags' && field !== 'screenshots'
          && field !== 'supportEmail') {
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
      } else {
        // field === screenshots
        // check that each file ends with .png
        app[field].forEach((screenshot) => {
          assert(screenshot.filename.endsWith('.png'));
        });
      }
    });
  });
});
