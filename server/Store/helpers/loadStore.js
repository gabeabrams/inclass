// Import dependencies
const path = require('path');

// Import constants
const STORE_PATH = require('../STORE_PATH');

// Import helpers
const listAppsToLoad = require('./listAppsToLoad');
const readJSON = require('./readJSON');
const loadStoreMetadata = require('./loadStoreMetadata');


/**
 * Reads the metadata of the store, reads each catalog, and returns a full
 *   catalog metadata object
 * @module /server/Store/helpers/loadStore
 * @return {object} { catalogId: Catalog } mapping
 * @see /server/Store/helpers/loadStore for description of Catalog object
 */
module.exports = async () => {
  // TODO: Load store metadata
  // Should we handle the error or just let it crash?
  // try {
  //   const storeMetadata = await loadStoreMetadata();
  //   console.log("worked");
  // } catch (err) {
  //   console.log(err);
  // }
  const storeMetadata = await loadStoreMetadata();
  console.log(storeMetadata);

  // TODO: list the apps to load
  const appsToLoad = await listAppsToLoad();
  console.log(appsToLoad);


  // TODO: load the individual apps in order, detect cycles and throw an error if they occur

  // TODO: load catalogs

  return {};
};
