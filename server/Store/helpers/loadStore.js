// Import helpers
const listAppsToLoad = require('./listAppsToLoad');
const loadApp = require('./loadApp');
const loadStoreMetadata = require('./loadStoreMetadata');
const getAppParent = require('./getAppParent');
const loadCatalogMetadata = require('./loadCatalogMetadata');


/**
 * Reads the metadata of the store, reads each catalog, and returns a full
 *   catalog metadata object
 * @module /server/Store/helpers/loadStore
 * @return {object} { store: store metadata, catalogs: { catalogId: catalog }}
 * @see /server/Store/helpers/loadStore for description of Catalog object
 */
module.exports = async () => {
  const storeMetadata = await loadStoreMetadata();
  // initiate storeMap
  const storeMap = {}; // {store: storeMetadata, catalogIds: catalog}
  storeMap.store = storeMetadata;

  // list the apps to load
  const appsToLoad = await listAppsToLoad();
  // load catalogs
  const catalogIds = Object.keys(appsToLoad);
  const catalogMap = {}; // {catalogId : catalogMetadata}

  // If the apps have parents
  const loadParentsThenLoadApp = async (catalogId, appId, seen) => {
    if (catalogMap[catalogId].apps.appId) {
      return;
    }
    // detect cycles and throw an error if they occur
    if (seen.includes(`${catalogId}=>${appId}`)) {
      throw new Error('detected cycle');
    } else {
      seen.push(`${catalogId}=>${appId}`);
    }
    // check if this app has a parent
    const parent = await getAppParent(catalogId, appId);
    if (parent) {
      // Load parent
      const parentCatalogId = parent.catalogId;
      const parentAppId = parent.appId;
      if (!parentCatalogId || !parentAppId) {
        throw new Error(`We couldn't load the parent app metadata because the file ${parentCatalogId} or ${parentAppId} is not formatted properly`);
      }
      await loadParentsThenLoadApp(parentCatalogId, parentAppId, seen);
    }
    // Load self
    catalogMap[catalogId].apps[appId] = await loadApp({
      catalogId,
      catalogMetadata: catalogMap[catalogId],
      appId,
      parentAppMetadata:
      (parent === null ? null : catalogMap[parent.catalogId].apps[appId]),
    });
  };

  // init the "apps" field in catalogMap
  for (let i = 0; i < catalogIds.length; i++) {
    catalogMap[catalogIds[i]] = await loadCatalogMetadata(catalogIds[i]);
    const appIds = Object.keys(appsToLoad[catalogIds[i]]);
    // add apps => appId => null to every catalog
    for (let j = 0; j < appIds.length; j++) {
      // initiate the object
      if (!catalogMap[catalogIds[i]].apps) {
        catalogMap[catalogIds[i]].apps = {};
      }
      // insert null to each app's metadata, meaning the app is not loaded
      catalogMap[catalogIds[i]].apps[appIds[j]] = null;
    }
  }

  // load all the apps
  for (let i = 0; i < catalogIds.length; i++) {
    const appIds = Object.keys(appsToLoad[catalogIds[i]]);
    for (let j = 0; j < appIds.length; j++) {
      const seen = []; // array of 'catalogId'=>'appId' strings
      await loadParentsThenLoadApp(catalogIds[i], appIds[j], seen);
    }
  }
  // add catalogs metadata to storeMap
  storeMap.catalogs = catalogMap;
  return storeMap;
};
