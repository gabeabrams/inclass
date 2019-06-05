const path = require('path');

const readJSON = require('./readJSON');
const STORE_CONSTANTS = require('../STORE_CONSTANTS');

const STORE_PATH = STORE_CONSTANTS.path;


/**
 * Loads catalog metadata
 * @module server/Store/helpers/loadCatalogMetadata
 * @param {string} catalogId - id of the catalog
 * @return {object} catalog metadata
 */
module.exports = async (catalogId) => {
  // read the corresponding metadata to the catalog
  const metadata = await readJSON(path.join(STORE_PATH, catalogId, 'metadata'));
  return metadata;
};
