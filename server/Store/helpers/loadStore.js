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
  const apps = 'apps';
  const storeMetadata = await loadStoreMetadata();
  // console.log(storeMetadata);

  // list the apps to load
  const appsToLoad = await listAppsToLoad();
  // load catalogs
  const catalogIds = Object.keys(appsToLoad);
  const catalogMap = {}; // {catalogId : catalogMetadata}

  // If the apps have parents
  const loadParentsThenLoadApp = async (catalogId, appId) => {
    // if already loaded, just returnf
    if (catalogMap[catalogId][apps][appId]) {
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
    catalogMap[catalogId][apps][appId] = await loadApp({
      catalogId,
      catalogMetadata: catalogMap[catalogId],
      appId,
      parentAppMetadata:
      (parent === null ? null : catalogMap[parent.catalogId][apps][appId]),
    });
  };

  for (let i = 0; i < catalogIds.length; i++) {
    catalogMap[catalogIds[i]] = await loadCatalogMetadata(catalogIds[i]);
    // load the apps
    const appIds = Object.keys(appsToLoad[catalogIds[i]]);
    // add apps => appId => null to every catalog
    for (let j = 0; j < appIds.length; j++) {
      // initiate the object
      if (catalogMap[catalogIds[i]][apps] === undefined) {
        catalogMap[catalogIds[i]][apps] = {};
      }
      // insert null to each app's metadata, meaning the app is not loaded
      catalogMap[catalogIds[i]][apps][appIds[j]] = null;
    }
    for (let j = 0; j < appIds.length; j++) {
      await loadParentsThenLoadApp(catalogIds[i], appIds[j]);
    }
  }

  console.log(catalogMap['dce'][apps]['gradeup']);
  console.log("\n");
  console.log("\n");
  console.log(catalogMap['dce'][apps]['swipein']);
  console.log("\n");
  console.log("\n");
  console.log(catalogMap['seas'][apps]['swipein']);

  // TODO: load the individual apps in order,
  // detect cycles and throw an error if they occur
  return catalogMap;
};
