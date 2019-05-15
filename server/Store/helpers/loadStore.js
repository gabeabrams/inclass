// Import dependencies
const path = require('path');

// Import constants
const STORE_PATH = require('../STORE_PATH');

// Import helpers
const listAppsToLoad = require('./listAppsToLoad');
const readJSON = require('./readJSON');

/**
 * Reads the metadata of the store, reads each catalog, and returns a full
 *   catalog metadata object
 * @module /server/Store/helpers/loadStore
 * @return {object} { catalogId: Catalog } mapping
 * @see /server/Store/helpers/loadStore for description of Catalog object
 */
module.exports = async () => {
  // Load store metadata
  const storeMetadata = await readJSON(path.join(STORE_PATH, 'metadata'));

  // TODO: list the apps to load

  // TODO: load the individual apps in order, detect cycles and throw an error if they occur

  // TODO: load catalogs

  return {};
};
