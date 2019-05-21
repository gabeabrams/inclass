// Import dependencies
const path = require('path');

// Import constants
const STORE_PATH = require('../STORE_PATH');

// Import helpers
const listAppsToLoad = require('./listAppsToLoad');
const readJSON = require('./readJSON');
const loadApp = require('./loadApp');
const loadStoreMetadata = require('./loadStoreMetadata');
const getAppParent = require('./getAppParent');
const loadCatalogMetadata = require('./loadCatalogMetadata');


/**
 * Reads the metadata of the store, reads each catalog, and returns a full
 *   catalog metadata object
 * @module /server/Store/helpers/loadStore
 * @return {object} { catalogId: Catalog } mapping
 * @see /server/Store/helpers/loadStore for description of Catalog object
 */
module.exports = async () => {
  const storeMetadata = await loadStoreMetadata();
  // console.log(storeMetadata);

  // list the apps to load
  const appsToLoad = await listAppsToLoad();
  console.log(appsToLoad);

  // load catalogs
  const catalogIds = Object.keys(appsToLoad);
  console.log(catalogIds);
  const catalogMap = {}; // {catalogId : catalogMetadata}

  // If the apps have parents
  const loadParentsThenLoadApp = async (catalogId, appId) => {
    // if already loaded, just returnf
    console.log('this is here');
    console.log(catalogMap[catalogId]);
    console.log(apps[appId]);
    if (catalogMap[catalogId].apps[appId]) {
      return;
    }
    // check if this app has a parent
    const parent = await getAppParent(catalogId, appId);
    if (parent) {
      // Load parent
      const parentCatalogId = parent.catalogId;
      const parentAppId = parent.appId;
      await loadParentsThenLoadApp(parentCatalogId, parentAppId);
    }
    // Load self
    catalogMap[catalogId].apps[appId] = await loadApp({
      catalogId,
      catalogMetadata: catalogMap[catalogId],
      appId,
      parentAppMetadata: catalogMap[parent.catalogId],
    });
  };

  for (let i = 0; i < catalogIds.length; i++) {
    catalogMap[catalogIds[i]] = await loadCatalogMetadata(catalogIds[i]);
    console.log('this is the first catalog information');
    console.log(catalogMap[catalogIds[i]]);
    // load the apps
    const appIds = Object.keys(appsToLoad[catalogIds[i]]);
    console.log(appIds);
    for (let j = 0; j < appIds.length; j++) {
      await loadParentsThenLoadApp(catalogIds[i], appIds[j]);
    }
  }
  console.log(catalogMap);

  // TODO: load the individual apps in order,
  // detect cycles and throw an error if they occur
  return {};
};
