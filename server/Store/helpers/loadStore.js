// Import helpers
const path = require('path');
const listAppsToLoad = require('./listAppsToLoad');
const loadApp = require('./loadApp');
const loadStoreMetadata = require('./loadStoreMetadata');
const getAppParent = require('./getAppParent');
const loadCatalogMetadata = require('./loadCatalogMetadata');
const fileExists = require('./fileExists');
const STORE_CONSTANTS = require('../STORE_CONSTANTS');

const STORE_PATH = STORE_CONSTANTS.path;

const ALLOWED_LOGO_EXTENSIONS = ['jpg', 'jpeg', 'png'];

/**
 * Reads the metadata of the store, reads each catalog, and returns a full
 *   catalog metadata object
 * @module /server/Store/helpers/loadStore
 * @return {object} { store: store metadata, catalogs: { catalogId: catalog }}
 * @see /server/Store/helpers/loadStore for description of Catalog object
 */
module.exports = async () => {
  const storeMetadata = await loadStoreMetadata();
  // load store logo
  const logoPathWithoutExt = path.join(STORE_PATH, 'logo');
  for (let i = 0; i < ALLOWED_LOGO_EXTENSIONS.length; i++) {
    const extension = ALLOWED_LOGO_EXTENSIONS[i];
    const potentialLogoFullPath = `${logoPathWithoutExt}.${extension}`;
    if (await fileExists(potentialLogoFullPath)) {
      storeMetadata.logoFullPath = potentialLogoFullPath;
      break;
    }
  }
  if (!storeMetadata.logoFullPath) {
    throw new Error('We cannot load store logo because the file does not exist');
  }

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
    if (catalogMap[catalogId].apps[appId]) {
      return;
    }
    // detect cycles and throw an error if they occur
    if (seen.includes(`${catalogId}=>${appId}`)) {
      throw new Error('Could not load apps because there was a circular dependency');
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
      parentAppMetadata: (
        parent === null
          ? null
          : catalogMap[parent.catalogId].apps[parent.appId]
      ),
    });
  };

  // init the "apps" field in catalogMap
  for (let i = 0; i < catalogIds.length; i++) {
    catalogMap[catalogIds[i]] = await loadCatalogMetadata(catalogIds[i]);
    const appIds = Object.keys(appsToLoad[catalogIds[i]]);
    // add apps => appId => null to every catalog
    if (!catalogMap[catalogIds[i]].apps) {
      catalogMap[catalogIds[i]].apps = {};
    }
    // insert null to each app's metadata, meaning the app is not loaded
    appIds.forEach((app) => {
      catalogMap[catalogIds[i]].apps[app] = null;
    });
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
